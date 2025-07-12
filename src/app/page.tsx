'use client';
import { useState, useEffect } from 'react';
import { Navbar, Footer, Profile } from "@/components";

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(setFiles);
  }, []);

  return (
    <>
      <Navbar onGalleryClick={() => setShowGallery(true)} onLogoClick={() => setShowGallery(false)} />
      <main className="pt-16">
        <Profile showGallery={showGallery} onCloseGallery={() => setShowGallery(false)} files={files} />
      </main>
      <Footer />
    </>
  );
}
