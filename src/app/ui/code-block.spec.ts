import { TestBed } from '@angular/core/testing';
import { CodeBlock } from './code-block';
import { Rich } from './rich';

describe('CodeBlock', () => {
  it('numbers the rows from the excerpt start, highlights lines and keeps the text verbatim', async () => {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('excerpt', {
      file: 'src/a.ts',
      lang: 'ts',
      start: 9,
      hl: [10],
      code: 'if (a) {\n  return 1;\n}',
    });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('figcaption')!.textContent).toBe('src/a.ts9–11');
    expect(Array.from(el.querySelectorAll('.ln')).map((n) => n.textContent)).toEqual(['9', '10', '11']);
    expect(Array.from(el.querySelectorAll('.row')).map((r) => r.classList.contains('hl'))).toEqual([false, true, false]);
    expect(Array.from(el.querySelectorAll('.tx')).map((t) => t.textContent)).toEqual(['if (a) {', '  return 1;', '}']);
    expect(el.querySelector('.tx .t-k')!.textContent).toBe('if');
  });

  it('shows a single line number for a one-line excerpt', async () => {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('excerpt', { file: 'x.dart', lang: 'dart', start: 83, code: 'final a = 1;' });
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('figcaption')!.textContent).toBe('x.dart83');
  });
});

describe('Rich', () => {
  it('renders text between backticks as inline code', async () => {
    const fixture = TestBed.createComponent(Rich);
    fixture.componentRef.setInput('text', 'gera o `openapi.json` dos schemas');
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toBe('gera o openapi.json dos schemas');
    expect(el.querySelector('code')!.textContent).toBe('openapi.json');
  });
});
