import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY as string | undefined;
const PRODUCT_IMAGES_FOLDER_ID = '1ANcRjrjKOhB3iPjE7EmhpR7nS-MSpDzt';
const lookupCache = new Map<string, Record<string, string>>();

export function useProductImageLookup(): (name: string, fallback: string) => string {
  const [nameMap, setNameMap] = useState<Record<string, string>>(() => lookupCache.get(PRODUCT_IMAGES_FOLDER_ID) ?? {});

  useEffect(() => {
    if (lookupCache.has(PRODUCT_IMAGES_FOLDER_ID)) return;
    if (!API_KEY) {
      lookupCache.set(PRODUCT_IMAGES_FOLDER_ID, {});
      setNameMap({});
      return;
    }

    let cancelled = false;

    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${PRODUCT_IMAGES_FOLDER_ID}'+in+parents&fields=files(id,name,mimeType)&key=${API_KEY}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const map: Record<string, string> = {};
        (data.files ?? [])
          .filter((f: { mimeType: string }) => f.mimeType.startsWith('image/'))
          .forEach((f: { id: string; name: string }) => {
            const key = f.name.replace(/\.[^.]+$/, '').toLowerCase().trim();
            map[key] = `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`;
          });
        lookupCache.set(PRODUCT_IMAGES_FOLDER_ID, map);
        if (!cancelled) setNameMap(map);
      })
      .catch(() => {
        if (!cancelled) setNameMap({});
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (name: string, fallback: string) => {
    const key = name.toLowerCase().trim();
    return nameMap[key] || fallback;
  };
}
