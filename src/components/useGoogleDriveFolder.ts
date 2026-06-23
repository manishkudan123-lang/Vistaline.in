import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY as string | undefined;
const imageCache = new Map<string, Array<{ url: string; name: string }>>();

export function useGoogleDriveFolder(folderId: string): Array<{ url: string; name: string }> {
  const [images, setImages] = useState<Array<{ url: string; name: string }>>(() => imageCache.get(folderId) ?? []);

  useEffect(() => {
    if (imageCache.has(folderId)) return;
    if (!API_KEY) {
      imageCache.set(folderId, []);
      setImages([]);
      return;
    }

    let cancelled = false;

    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${API_KEY}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const items: Array<{ url: string; name: string }> = (data.files ?? [])
          .filter((f: { mimeType: string }) => f.mimeType.startsWith('image/'))
          .map((f: { id: string; name: string }) => ({
            url: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`,
            name: f.name,
          }));
        imageCache.set(folderId, items);
        if (!cancelled) setImages(items);
      })
      .catch(() => {
        if (!cancelled) setImages([]);
      });

    return () => {
      cancelled = true;
    };
  }, [folderId]);

  return images;
}
