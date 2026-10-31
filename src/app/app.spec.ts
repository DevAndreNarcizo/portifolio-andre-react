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

  const headline = (el: HTMLElement) => el.querySelector('h1')!.textContent!.trim();

  it('renders the sections in order', async () => {
    const { el } = await render();
    expect(Array.from(el.querySelectorAll('main section')).map((s) => s.id)).toEqual([
      'inicio',
      'apps',
      'case-myfinance',
      'case-agenda-facil',
      'case-foco-vida',
      'case-laravel',
      'por-dentro',
      'projetos',
      'trajetoria',
      'stack',
      'contato',
    ]);
  });

  it('shows every case card in the static layout, with its code', async () => {
    const { el } = await render();
    expect(el.querySelectorAll('.case .eng').length).toBe(27);
    expect(el.querySelectorAll('#por-dentro .eng').length).toBe(3);
    expect(el.querySelector('#case-laravel .eng .row')).not.toBeNull();
  });

  it('switches the whole page to English from the header button', async () => {
    const { fixture, el } = await render();
    const button = el.querySelector<HTMLButtonElement>('.lang')!;
    expect(headline(el)).toBe('Eu construo o produto inteiro.');
    expect(button.getAttribute('aria-label')).toBe('Mudar idioma para English');

    button.click();
    await fixture.whenStable();
    expect(headline(el)).toBe('I build the whole product.');
    expect(el.querySelector('#case-myfinance .pitch')!.textContent).toContain('Household finances');
    expect(button.getAttribute('aria-label')).toBe('Switch language to Português');
    expect(document.documentElement.lang).toBe('en');
  });

  it('applies the language saved on a previous visit after the first render', async () => {
    localStorage.setItem('portfolio-lang', 'en');
    const { fixture, el } = await render();
    await fixture.whenStable();
    expect(headline(el)).toBe('I build the whole product.');
  });

  it('hides the header while scrolling down and shows it again scrolling up', async () => {
    const { fixture, el } = await render();
    const header = el.querySelector('.header')!;
    const scrollTo = async (y: number) => {
      Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      await fixture.whenStable();
    };

    await scrollTo(600);
    expect(header.classList).toContain('hidden');
    await scrollTo(500);
    expect(header.classList).not.toContain('hidden');
    await scrollTo(0);
  });
});
