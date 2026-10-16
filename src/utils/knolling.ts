import type { AtlasPart } from '../types/atlas';

export interface KnollingCell {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface KnollingLayout {
  cells: Map<string, KnollingCell>;
  width: number;
  height: number;
}

/**
 * 2D bin-packing algorithm that neatly arranges anatomical meshes in rows
 * by bounding box height, centered at (0, 0) on the Z=0 plane.
 */
export function calculateKnollingLayout(
  parts: AtlasPart[],
  aspect: number = 1
): KnollingLayout {
  const items = parts.map(p => ({
    id: p.id,
    system: p.system,
    width: Math.max(0.035, p.bounds[1][0] - p.bounds[0][0]) + 0.04,
    height: Math.max(0.035, p.bounds[1][1] - p.bounds[0][1]) + 0.04,
  }));

  const totalArea = items.reduce((sum, item) => sum + item.width * item.height, 0);
  const maxWidth = Math.max(0.3, ...items.map(item => item.width));
  const rowTargetWidth = Math.max(
    maxWidth,
    Math.sqrt(totalArea * Math.max(0.5, Math.min(1.5, aspect))) * 1.18
  );

  // Sort descending by height, then by ID for deterministic packing
  items.sort((a, b) => b.height - a.height || a.id.localeCompare(b.id));

  const cells = new Map<string, KnollingCell>();
  let currentX = 0;
  let currentY = 0;
  let rowMaxHeight = 0;
  let layoutWidth = 0;

  for (const item of items) {
    if (currentX > 0 && currentX + item.width > rowTargetWidth) {
      currentX = 0;
      currentY += rowMaxHeight;
      rowMaxHeight = 0;
    }

    cells.set(item.id, {
      x: currentX + item.width / 2,
      y: -currentY - item.height / 2,
      width: item.width,
      height: item.height,
    });

    currentX += item.width;
    layoutWidth = Math.max(layoutWidth, currentX);
    rowMaxHeight = Math.max(rowMaxHeight, item.height);
  }

  const layoutHeight = currentY + rowMaxHeight;

  // Center around (0, 0)
  cells.forEach(cell => {
    cell.x -= layoutWidth / 2;
    cell.y += layoutHeight / 2;
  });

  return { cells, width: layoutWidth, height: layoutHeight };
}
