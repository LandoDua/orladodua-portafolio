import { getGalleryData } from "@/lib/gallery";
import { Hero } from "@/components/foto/hero";
import { Gallery } from "@/components/foto/gallery";
import { Packages } from "@/components/foto/packages";
import { Contact } from "@/components/foto/contact";

export default async function FotoPage() {
  const { hero, photos, categories } = await getGalleryData();

  return (
    <>
      <Hero photo={hero} />
      <Gallery photos={photos} categories={categories} />
      <Packages />
      <Contact />
    </>
  );
}
