import { MAX_ZOOM, cam, overview, spotBox } from './camera';

describe('cam', () => {
  const view = { w: 1000, h: 625 };
  const shot = { w: 2560, h: 1600 };
  const fit = view.w / shot.w;

  it('fits the whole width for the overview', () => {
    const c = cam(view, shot, overview(shot), 1);
    expect(c.scale).toBeCloseTo(fit);
    expect(c.x).toBeCloseTo(0);
    expect(c.y).toBeCloseTo(0);
  });

  it('centres a small region and stops at the deepest zoom', () => {
    const c = cam(view, shot, [1200, 700, 100, 50]);
    expect(c.scale).toBeCloseTo(fit * MAX_ZOOM);
    expect(c.x + 1250 * c.scale).toBeCloseTo(500);
    expect(c.y + 725 * c.scale).toBeCloseTo(312.5);
  });

  it('never shows past the edges of the shot', () => {
    const top = cam(view, shot, [0, 0, 200, 100]);
    expect(top.x).toBe(0);
    expect(top.y).toBe(0);

    const bottom = cam(view, shot, [2400, 1500, 160, 100]);
    expect(bottom.x).toBeCloseTo(view.w - shot.w * bottom.scale);
    expect(bottom.y).toBeCloseTo(view.h - shot.h * bottom.scale);
  });

  it('pads the spotlight 20 px on every side', () => {
    expect(spotBox([100, 200, 300, 400])).toEqual({ left: 80, top: 180, width: 340, height: 440 });
  });
});
