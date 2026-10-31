import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangService } from '../lang';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let el: HTMLElement;

  const sheets = () => Array.from(el.querySelectorAll<HTMLElement>('.sheet'));
  const sheet = (title: string) => sheets().find((s) => s.querySelector('h3')?.textContent?.trim() === title)!;
  const chip = (label: string) =>
    Array.from(el.querySelectorAll<HTMLButtonElement>('.chip')).find((b) => b.textContent!.trim().startsWith(label))!;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(Projects);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('shows all 12 projects by default', () => {
    expect(sheets().length).toBe(12);
    expect(chip('Todos').getAttribute('aria-pressed')).toBe('true');
  });

  it('shows the project count of each filter', () => {
    const labels = Array.from(el.querySelectorAll('.chip')).map((b) => b.textContent!.replace(/\s+/g, ' ').trim());
    expect(labels).toEqual(['Todos 12', 'Enterprise 5', 'SaaS 2', 'Web 2', 'Landing 3']);
  });

  it('filters by tier and back', async () => {
    chip('Landing').click();
    await fixture.whenStable();
    expect(sheets().map((s) => s.querySelector('h3')!.textContent!.trim())).toEqual([
      'Clinica Thaysa Medeiros',
      'Thais Sousa - Nail Designer',
      'Karen Bianca - Lash Designer',
    ]);
    expect(chip('Landing').getAttribute('aria-pressed')).toBe('true');
    expect(chip('Todos').getAttribute('aria-pressed')).toBe('false');
    expect(el.querySelector('[aria-live]')!.textContent!.trim()).toBe('3 projetos');

    chip('Todos').click();
    await fixture.whenStable();
    expect(sheets().length).toBe(12);
  });

  it('renders only the links a project has', () => {
    const finAssist = sheet('Fin-Assist');
    expect(finAssist.querySelector('.links')!.textContent).not.toContain('Ver projeto');
    expect(finAssist.querySelector('.links')!.textContent).toContain('GitHub');

    const aurora = sheet('Ecommerce Luz da Aurora');
    expect(aurora.querySelector('.links')!.textContent).toContain('Ver projeto');
    expect(aurora.querySelector('.links')!.textContent).not.toContain('GitHub');
  });

  it('draws a placeholder for projects without an image', () => {
    expect(sheet('saas-task-manager').querySelector('.hatch')).not.toBeNull();
    expect(sheet('saas-task-manager').querySelector('img')).toBeNull();
    expect(sheet('MyFinance Platform').querySelector('img')).not.toBeNull();
  });

  it('switches the project texts with the language', async () => {
    TestBed.inject(LangService).set('en');
    await fixture.whenStable();
    expect(sheet('Fin-Assist').querySelector('.summary')!.textContent).toContain('Personal finance application');
    expect(chip('All').getAttribute('aria-pressed')).toBe('true');
  });
});
