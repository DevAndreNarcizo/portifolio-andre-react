import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'pt-BR';
  });

  async function render() {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  const headline = (el: HTMLElement) => el.querySelector('h1')!.textContent!.replace(/\s+/g, ' ').trim();

  it('renders the seven sections in order', async () => {
    const { el } = await render();
    expect(Array.from(el.querySelectorAll('main section')).map((s) => s.id)).toEqual([
      'inicio',
      'requisicao',
      'sobre',
      'trajetoria',
      'stack',
      'projetos',
      'contato',
    ]);
  });

  it('keeps the split headline readable as one sentence', async () => {
    const { el } = await render();
    expect(headline(el)).toBe('Do banco de dados à interface, web e mobile.');
    expect(el.querySelectorAll('h1 .w').length).toBe(9);
    expect(el.querySelectorAll('h1 .em').length).toBe(2);
  });

  it('switches the whole page to English from the header button', async () => {
    const { fixture, el } = await render();
    const button = el.querySelector<HTMLButtonElement>('.lang')!;
    expect(button.getAttribute('aria-label')).toBe('Mudar idioma para English');

    button.click();
    await fixture.whenStable();
    expect(headline(el)).toBe('From database to interface, web and mobile.');
    expect(button.getAttribute('aria-label')).toBe('Switch language to Português');
    expect(document.documentElement.lang).toBe('en');
  });

  it('applies the language saved on a previous visit after the first render', async () => {
    localStorage.setItem('portfolio-lang', 'en');
    const { fixture, el } = await render();
    await fixture.whenStable();
    expect(headline(el)).toBe('From database to interface, web and mobile.');
  });
});
