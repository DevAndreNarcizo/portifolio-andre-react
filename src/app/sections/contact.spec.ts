import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let el: HTMLElement;
  const copyButton = () => el.querySelector<HTMLButtonElement>('.copy')!;

  function mockClipboard(writeText: () => Promise<void>) {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn(writeText) }, configurable: true });
    return navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
  }

  beforeEach(async () => {
    localStorage.clear();
    getSelection()?.removeAllRanges();
    fixture = TestBed.createComponent(Contact);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('copies the email and confirms', async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    expect(writeText).toHaveBeenCalledWith('dev.andrenarcizo@outlook.com');
    expect(copyButton().textContent!.trim()).toBe('Copiado!');
  });

  it('selects the address instead when the clipboard is unavailable', async () => {
    mockClipboard(() => Promise.reject(new Error('denied')));
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    expect(copyButton().textContent!.trim()).toBe('Copiar');
    expect(getSelection()!.toString()).toBe('dev.andrenarcizo@outlook.com');
  });

  it('lists the four contact channels', () => {
    const hrefs = Array.from(el.querySelectorAll<HTMLAnchorElement>('.channel a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      'mailto:dev.andrenarcizo@outlook.com',
      'https://www.linkedin.com/in/andrenarcizo/',
      'https://github.com/DevAndreNarcizo',
      'https://wa.me/5562985579319',
    ]);
  });
});
