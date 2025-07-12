'use client';
import { useState } from "react";
import { Navbar, Footer, Profile } from "@/components";

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  return (
    <>
      <Navbar onGalleryClick={() => setShowGallery(true)} onLogoClick={() => setShowGallery(false)} />
      <main className="pt-16">
        <Profile showGallery={showGallery} />
      </main>
      <Footer />
    </>
  );
}
