/**
 * Browser CacheStorage Utility for 3D Anatomy Models & Binary Chunks
 * Stores heavy .bin.gz chunks and .glb models in disk cache for instant (<200ms) reloads.
 */

const CACHE_NAME = 'anatomy-models-v2';

export async function fetchWithCache(url: string): Promise<ArrayBuffer> {
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        return await cached.arrayBuffer();
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url} (${response.status})`);
      }
      // Store clone in background cache
      cache.put(url, response.clone()).catch(() => {});
      return await response.arrayBuffer();
    } catch {
      // Fallback to direct network fetch
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url} (${response.status})`);
  }
  return await response.arrayBuffer();
}

export async function fetchJsonWithCache<T = any>(url: string): Promise<T> {
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        return (await cached.json()) as T;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url} (${response.status})`);
      }
      cache.put(url, response.clone()).catch(() => {});
      return (await response.json()) as T;
    } catch {
      // Fallback
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url} (${response.status})`);
  }
  return (await response.json()) as T;
}
