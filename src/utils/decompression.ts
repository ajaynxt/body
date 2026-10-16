import { gunzipSync } from 'fflate';

/**
 * Decompresses gzip binary ArrayBuffer with native DecompressionStream if available,
 * with automatic fallback to fflate.
 */
export async function decompressGzip(
  buffer: ArrayBuffer,
  expectedBytes: number
): Promise<ArrayBuffer> {
  const bytes = new Uint8Array(buffer);
  
  // Check if buffer is actually gzip (magic bytes 0x1F, 0x8B)
  const isGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
  if (!isGzip) {
    return buffer;
  }

  // 1. Try native browser DecompressionStream (ultra-fast hardware stream)
  if (typeof window !== 'undefined' && 'DecompressionStream' in window) {
    try {
      const stream = new Response(new Blob([buffer])).body?.pipeThrough(
        new (window as any).DecompressionStream('gzip')
      );
      if (stream) {
        const decompressed = await new Response(stream).arrayBuffer();
        if (decompressed.byteLength === expectedBytes || expectedBytes === 0) {
          return decompressed;
        }
      }
    } catch {
      // Fallback to pure JS gunzipSync below
    }
  }

  // 2. Fallback to fflate pure JS decompression
  try {
    const decompressedBytes = gunzipSync(bytes);
    return decompressedBytes.buffer as ArrayBuffer;
  } catch (err) {
    throw new Error(`Failed to decompress model chunk: ${(err as Error).message}`);
  }
}
