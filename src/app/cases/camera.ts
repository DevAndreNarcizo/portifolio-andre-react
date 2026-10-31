import type { Rect } from '../data/types';

export interface Size {
  w: number;
  h: number;
}

export interface Camera {
  x: number;
  y: number;
  scale: number;
}

/** Deepest zoom, relative to fitting the shot's width. */
export const MAX_ZOOM = 2.2;

/** The whole width of a shot, at the window's 16:10 ratio. */
export function overview(shot: Size): Rect {
  return [0, 0, shot.w, shot.w / 1.6];
}

/** Places a shot (scaled from its top-left corner) so the region sits centred, never past its edges. */
export function cam(view: Size, shot: Size, r: Rect, pad = 1.1): Camera {
  const fit = view.w / shot.w;
  const scale = Math.max(fit, Math.min(view.w / (r[2] * pad), view.h / (r[3] * pad), fit * MAX_ZOOM));
  const x = view.w / 2 - (r[0] + r[2] / 2) * scale;
  const y = view.h / 2 - (r[1] + r[3] / 2) * scale;
  return {
    scale,
    x: shot.w * scale > view.w ? Math.min(0, Math.max(view.w - shot.w * scale, x)) : (view.w - shot.w * scale) / 2,
    y: shot.h * scale > view.h ? Math.min(0, Math.max(view.h - shot.h * scale, y)) : (view.h - shot.h * scale) / 2,
  };
}

/** Spotlight box around a region, with 20 px of air on each side. */
export function spotBox(r: Rect): { left: number; top: number; width: number; height: number } {
  return { left: r[0] - 20, top: r[1] - 20, width: r[2] + 40, height: r[3] + 40 };
}
