import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  const files = fs.readdirSync(galleryDir);
  const mediaFiles = files.filter(file =>
    /\.(png|jpe?g|gif|svg|mp4|webm|ogg)$/i.test(file)
  );
  return NextResponse.json(mediaFiles);
} 