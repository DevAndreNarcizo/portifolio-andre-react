// Run after `npm run build`: proves recruiters and crawlers get the full page without JavaScript.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../dist/portfolio-andre/browser/index.html', import.meta.url), 'utf8');
const plain = (fragment) => fragment.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

test('is Portuguese by default', () => {
  assert.match(html, /<html lang="pt-BR"/);
});

test('contains the hero headline as readable text', () => {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  assert.ok(h1, 'no <h1> in the prerendered page');
  assert.equal(plain(h1[1]), 'Eu construo o produto inteiro.');
});

test('contains every section', () => {
  const ids = ['inicio', 'apps', 'case-myfinance', 'case-agenda-facil', 'case-foco-vida', 'case-laravel'];
  for (const id of [...ids, 'por-dentro', 'projetos', 'trajetoria', 'stack', 'contato']) {
    assert.ok(html.includes(`id="${id}"`), `missing section #${id}`);
  }
});

test('contains every card with its code, readable without JavaScript', () => {
  assert.equal(html.match(/<article[^>]*class="eng[ "]/g)?.length, 30);
  assert.ok(plain(html).includes('lockForUpdate'), 'Laravel excerpt missing');
  assert.ok(plain(html).includes('FOR UPDATE SKIP LOCKED'), 'Agenda Fácil excerpt missing');
  for (const name of ['MyFinance', 'Agenda Fácil', 'Foco Vida', 'Laravel API']) {
    assert.ok(html.includes(`>${name}</h3>`), `missing case ${name}`);
  }
});

test('gives the hero images their size up front', () => {
  for (const src of ['hero-mf', 'hero-af', 'hero-fv', 'hero-phone']) {
    assert.match(html, new RegExp(`<img[^>]*src="/apps/${src}\\.webp" width="\\d+" height="\\d+"`), `${src} without size`);
  }
});

test('keeps the SEO and social meta tags', () => {
  assert.match(html, /<meta name="description" content="Desenvolvedor full-stack/);
  assert.match(html, /<meta property="og:title" content="André Narcizo — Desenvolvedor Full-Stack">/);
  assert.match(html, /<meta name="theme-color" content="#0a0c0f">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/dev-andrenarcizo.netlify.app">/);
});
