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
  assert.equal(plain(h1[1]), 'Do banco de dados à interface, web e mobile.');
});

test('contains the seven sections', () => {
  for (const id of ['inicio', 'requisicao', 'sobre', 'trajetoria', 'stack', 'projetos', 'contato']) {
    assert.ok(html.includes(`id="${id}"`), `missing section #${id}`);
  }
});

test('contains every project title', () => {
  const titles = [
    'MyFinance Platform',
    'HunterAI Platform',
    'Agenda-Fácil',
    'Fin-Assist',
    'Ecommerce Luz da Aurora',
    'laravel-clean-architecture-api',
    'node-microservices-event-driven',
    'saas-task-manager',
    'php-code-analyzer',
    'Clinica Thaysa Medeiros',
    'Thais Sousa - Nail Designer',
    'Karen Bianca - Lash Designer',
  ];
  for (const title of titles) assert.ok(html.includes(`>${title}<`), `missing project ${title}`);
});

test('keeps the SEO and social meta tags', () => {
  assert.match(html, /<meta name="description" content="Full-Stack Developer at Sysout Tecnologia/);
  assert.match(html, /<meta property="og:title" content="André Narcizo — Full-Stack Developer">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/dev-andrenarcizo.netlify.app">/);
});
