import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let projectCardLinks;
let viteServer;

before(async () => {
  viteServer = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  });

  const componentModule = await viteServer.ssrLoadModule(
    '/src/components/ProjectCardLinks.tsx',
  );
  projectCardLinks = componentModule.default;
});

after(async () => {
  await viteServer?.close();
});

/**
 * Renders the real project-action component through React SSR.
 * @author André Narcizo - andre.narcizo@sysout.com.br
 */
function renderProjectCardLinks(props) {
  return renderToStaticMarkup(
    projectCardLinks({
      githubLabel: 'Ver no GitHub',
      viewSystemLabel: 'Ver projeto',
      ...props,
    }),
  );
}

test('renders live and GitHub actions when both links are available', () => {
  const markup = renderProjectCardLinks({
    liveLink: 'https://example.com/live',
    githubLink: 'https://github.com/example/project',
  });

  assert.equal((markup.match(/<a\b/g) ?? []).length, 2);
  assert.match(markup, /href="https:\/\/example\.com\/live"/);
  assert.match(markup, /href="https:\/\/github\.com\/example\/project"/);
  assert.match(markup, />Ver projeto<\/span>/);
  assert.match(markup, />Ver no GitHub<\/span>/);
});

test('renders only the live action when only a live link is available', () => {
  const markup = renderProjectCardLinks({
    liveLink: 'https://example.com/live',
  });

  assert.equal((markup.match(/<a\b/g) ?? []).length, 1);
  assert.match(markup, /href="https:\/\/example\.com\/live"/);
  assert.doesNotMatch(markup, />Ver no GitHub<\/span>/);
});

test('renders only the GitHub action when only a GitHub link is available', () => {
  const markup = renderProjectCardLinks({
    githubLink: 'https://github.com/example/project',
  });

  assert.equal((markup.match(/<a\b/g) ?? []).length, 1);
  assert.match(markup, /href="https:\/\/github\.com\/example\/project"/);
  assert.doesNotMatch(markup, />Ver projeto<\/span>/);
});
