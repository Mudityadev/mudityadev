'use client';
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import { Skeleton } from '@/components/ui/Skeleton';

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
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  return (
    <div className="space-y-12">
      {/* Images Section */}
      <div>
        <div className="mb-2 text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 drop-shadow-sm">Gallery Images</h2>
          <p className="text-base text-muted-foreground">A curated collection of my latest photos, graphics, and creative visuals.</p>
        </div>
        {/* Masonry layout */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 [column-fill:_balance]">
          {images.map((file, idx) => (
            <button
              key={file}
              className="mb-2 w-full break-inside-avoid rounded-xl overflow-hidden shadow-sm bg-muted group hover:shadow-lg transition-shadow duration-200"
              onClick={() => { setOpen(true); setIndex(idx); }}
              style={{ cursor: 'zoom-in' }}
            >
              <div className="relative w-full">
                {!imageLoaded[file] && (
                  <Skeleton className="w-full aspect-[4/3] h-auto min-h-[120px]" />
                )}
                <img
                  src={`/gallery/${file}`}
                  alt={file}
                  className={`w-full h-auto object-cover transition-transform duration-200 group-hover:scale-105 ${!imageLoaded[file] ? 'hidden' : ''}`}
                  loading="lazy"
                  style={{ display: 'block' }}
                  onLoad={() => setImageLoaded(l => ({ ...l, [file]: true }))}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* YouTube Playlist Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Latest YouTube Playlist</h2>
        <div className="w-full max-w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-black flex items-center justify-center mx-auto">
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLjdtd3kR8j1wulmJ3ni5mCng4m1v8CZri"
            title="Muditya Raghav YouTube Playlist"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px]"
            style={{ aspectRatio: '16/9', maxWidth: '100%' }}
          />
        </div>
      </div>
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
