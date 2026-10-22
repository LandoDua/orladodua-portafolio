import { cacheLife, cacheTag } from "next/cache";

const GITHUB_USER = "LandoDua";
const API = "https://api.github.com";

export interface GithubStats {
  publicRepos: number;
  followers: number;
  location: string | null;
  bio: string | null;
}

export interface GithubEvent {
  id: string;
  /** push | create | release | pullrequest | … */
  action: string;
  /** Nombre del repo sin el dueño (`tone-breath`). */
  repo: string;
  /** Fecha corta `YYYY-MM-DD`. */
  date: string;
}

export interface GithubActivity {
  /** `null` cuando la API no responde (rate limit 60/h sin token). */
  stats: GithubStats | null;
  events: GithubEvent[];
}

interface ApiEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

const INTERESTING = new Set([
  "PushEvent",
  "CreateEvent",
  "ReleaseEvent",
  "PullRequestEvent",
  "IssuesEvent",
]);

/**
 * Actividad pública de GitHub con caché de 1 hora (tag `github`).
 * Límite sin token: 60 req/h por IP — con `cacheLife("hours")` solo se
 * consume 1–2 por hora. Si la API falla, devuelve datos vacíos (fallback
 * en la UI) en lugar de romper el build.
 */
export async function getGithubActivity(): Promise<GithubActivity> {
  "use cache";
  cacheTag("github");
  cacheLife("hours");

  try {
    const headers = { Accept: "application/vnd.github+json" };
    const [userRes, eventsRes] = await Promise.all([
      fetch(`${API}/users/${GITHUB_USER}`, { headers }),
      fetch(`${API}/users/${GITHUB_USER}/events/public?per_page=30`, {
        headers,
      }),
    ]);

    if (!userRes.ok || !eventsRes.ok) {
      return { stats: null, events: [] };
    }

    const user = (await userRes.json()) as {
      public_repos: number;
      followers: number;
      location: string | null;
      bio: string | null;
    };
    const events = (await eventsRes.json()) as ApiEvent[];

    return {
      stats: {
        publicRepos: user.public_repos,
        followers: user.followers,
        location: user.location,
        bio: user.bio,
      },
      events: events
        .filter((event) => INTERESTING.has(event.type))
        .slice(0, 6)
        .map((event) => ({
          id: event.id,
          action: event.type.replace(/Event$/, "").toLowerCase(),
          repo: event.repo.name.replace(`${GITHUB_USER}/`, ""),
          date: event.created_at.slice(0, 10),
        })),
    };
  } catch {
    return { stats: null, events: [] };
  }
}
