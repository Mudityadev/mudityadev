'use client';
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';

interface GalleryProps {
  files: string[];
}

const isImage = (file: string) => /\.(png|jpe?g|gif|svg)$/i.test(file);
const isVideo = (file: string) => /\.(mp4|webm|ogg)$/i.test(file);

const Gallery: React.FC<GalleryProps> = ({ files }) => {
  const images = files.filter(isImage);
  const videos = files.filter(isVideo);
  const slides = [
    ...images.map((file) => ({
      type: 'image' as const,
      src: `/gallery/${file}`,
      alt: file,
    })),
    ...videos.map((file) => ({
      type: 'video' as const,
      poster: '/gallery/' + file.replace(/\.(mp4|webm|ogg)$/i, '.jpg'),
      sources: [
        { src: `/gallery/${file}`, type: `video/${file.split('.').pop()}` },
      ],
      alt: file,
    })),
  ];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-12">
      {/* Images Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Images</h2>
        {/* Masonry layout */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 [column-fill:_balance]">
          {images.map((file, idx) => (
            <button
              key={file}
              className="mb-2 w-full break-inside-avoid rounded-xl overflow-hidden shadow-sm bg-muted group hover:shadow-lg transition-shadow duration-200"
              onClick={() => { setOpen(true); setIndex(idx); }}
              style={{ cursor: 'zoom-in' }}
            >
              <img
                src={`/gallery/${file}`}
                alt={file}
                className="w-full h-auto object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                style={{ display: 'block' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videos.map((file, vIdx) => (
              <button
                key={file}
                className="w-full rounded-xl bg-muted shadow overflow-hidden flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
                onClick={() => { setOpen(true); setIndex(images.length + vIdx); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
                  <video
                    src={`/gallery/${file}`}
                    controls
                    className="w-full h-full rounded-xl"
                    preload="metadata"
                    style={{ background: '#000' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2 px-2 pb-2 truncate w-full text-center">{file}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Zoom, Video]}
        on={{ view: ({ index: i }) => setIndex(i) }}
        animation={{ fade: 300, swipe: 300 }}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        render={{
          buttonPrev: undefined,
          buttonNext: undefined,
        }}
      />
    </div>
  );
};

export default Gallery; 