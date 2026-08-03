# Project Case Study Covers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish recruiter-ready images for the MyFinance and HunterAI case studies, link the public MyFinance application, and verify the result locally and on Netlify.

**Architecture:** Keep the existing `Project` and `ProjectCard` contracts unchanged. Store two optimized 16:9 WebP assets in `public/Imagens/`, reference them from `caseStudyProjects`, and protect the integration with a Node.js built-in test that inspects the TypeScript data contract and validates the WebP files.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Node.js built-in test runner, TypeScript compiler API, Python Pillow for binary asset normalization, browser-based visual validation.

## Global Constraints

- The MyFinance source screenshot is private and must never be committed or copied into `public/`.
- The public MyFinance cover must contain only `DEMO WORKSPACE`, `Portfolio Demo`, and internally consistent fictional values.
- The HunterAI cover must visibly include `Product concept` and must not be presented as a production screenshot.
- Final assets are `public/Imagens/myfinance-platform.webp` and `public/Imagens/hunter-ai-platform.webp`.
- Each asset uses a 16:9 ratio and should remain at or below 250 KB unless that limit makes text visibly unreadable.
- MyFinance links to `https://my-finance-ebon-one.vercel.app/`; HunterAI has no public live link.
- Existing Portuguese and English project copy remains unchanged.
- New relevant functions use the required André Narcizo JSDoc author block.
- Do not commit `.superpowers/`, private screenshots, credentials, generated-image working files, or build output.

---

## File Structure

- `package.json` — exposes the repository test command without adding a dependency.
- `tests/case-study-projects.test.mjs` — owns the case-study data and WebP asset contract.
- `src/data.ts` — points the two case studies to their assets and adds the MyFinance live URL.
- `public/Imagens/myfinance-platform.webp` — sanitized dashboard cover derived from the approved MyFinance edit.
- `public/Imagens/hunter-ai-platform.webp` — approved HunterAI product-and-engineering concept.
- `docs/superpowers/specs/2026-08-02-project-case-study-covers-design.md` — approved design source of truth; no further content changes expected.

---

### Task 1: Add the failing case-study cover contract

**Files:**
- Modify: `package.json`
- Create: `tests/case-study-projects.test.mjs`

**Interfaces:**
- Consumes: `caseStudyProjects` source declaration from `src/data.ts` and binary assets under `public/Imagens/`.
- Produces: `pnpm run test`, which fails when data paths, links, dimensions, ratio, or asset sizes violate the approved contract.

- [ ] **Step 1: Add the repository test command**

Add this script to `package.json` without changing dependencies or the lockfile:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 2: Write the failing data and asset test**

Create `tests/case-study-projects.test.mjs` with the following implementation:

```js
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(testDirectory, '..');
const dataPath = resolve(repositoryRoot, 'src/data.ts');

/**
 * Reads a string property from a TypeScript object literal.
 * @author André Narcizo - andre.narcizo@sysout.com.br
 */
function readStringProperty(objectNode, propertyName) {
  const property = objectNode.properties.find(
    (candidate) =>
      ts.isPropertyAssignment(candidate) &&
      candidate.name.getText() === propertyName,
  );

  if (!property || !ts.isStringLiteral(property.initializer)) {
    return undefined;
  }

  return property.initializer.text;
}

/**
 * Extracts the case-study object literals from the portfolio data source.
 * @author André Narcizo - andre.narcizo@sysout.com.br
 */
function readCaseStudyProjects() {
  const sourceText = readFileSync(dataPath, 'utf8');
  const sourceFile = ts.createSourceFile(
    dataPath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  let projectsArray;

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;

    for (const declaration of node.declarationList.declarations) {
      if (
        declaration.name.getText() === 'caseStudyProjects' &&
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      ) {
        projectsArray = declaration.initializer;
      }
    }
  });

  assert.ok(projectsArray, 'caseStudyProjects must remain an array literal');

  return new Map(
    projectsArray.elements
      .filter(ts.isObjectLiteralExpression)
      .map((project) => [
        readStringProperty(project, 'title'),
        {
          image: readStringProperty(project, 'image'),
          liveLink: readStringProperty(project, 'liveLink'),
          githubLink: readStringProperty(project, 'githubLink'),
        },
      ]),
  );
}

/**
 * Reads dimensions from VP8X, VP8, or VP8L WebP containers.
 * @author André Narcizo - andre.narcizo@sysout.com.br
 */
function readWebpDimensions(buffer) {
  assert.equal(buffer.toString('ascii', 0, 4), 'RIFF');
  assert.equal(buffer.toString('ascii', 8, 12), 'WEBP');

  const chunkType = buffer.toString('ascii', 12, 16);

  if (chunkType === 'VP8X') {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }

  if (chunkType === 'VP8 ') {
    assert.equal(buffer.toString('hex', 23, 26), '9d012a');
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunkType === 'VP8L') {
    assert.equal(buffer[20], 0x2f);
    const dimensions = buffer.readUInt32LE(21);
    return {
      width: 1 + (dimensions & 0x3fff),
      height: 1 + ((dimensions >> 14) & 0x3fff),
    };
  }

  throw new Error(`Unsupported WebP chunk: ${chunkType}`);
}

test('case studies expose the approved images and links', () => {
  const projects = readCaseStudyProjects();
  const myFinance = projects.get('MyFinance Platform');
  const hunter = projects.get('HunterAI Platform');

  assert.ok(myFinance);
  assert.equal(myFinance.image, '/Imagens/myfinance-platform.webp');
  assert.equal(
    myFinance.liveLink,
    'https://my-finance-ebon-one.vercel.app/',
  );
  assert.equal(
    myFinance.githubLink,
    'https://github.com/DevAndreNarcizo/myfinance-platform',
  );

  assert.ok(hunter);
  assert.equal(hunter.image, '/Imagens/hunter-ai-platform.webp');
  assert.equal(hunter.liveLink, undefined);
  assert.equal(
    hunter.githubLink,
    'https://github.com/DevAndreNarcizo/hunter-ai-platform',
  );
});

test('case-study covers are readable 16:9 WebP assets within budget', () => {
  for (const filename of [
    'myfinance-platform.webp',
    'hunter-ai-platform.webp',
  ]) {
    const assetPath = resolve(repositoryRoot, 'public/Imagens', filename);
    const buffer = readFileSync(assetPath);
    const { width, height } = readWebpDimensions(buffer);

    assert.ok(width > 0 && height > 0, `${filename} must have dimensions`);
    assert.ok(
      Math.abs(width / height - 16 / 9) < 0.01,
      `${filename} must use a 16:9 ratio`,
    );
    assert.ok(
      statSync(assetPath).size <= 250 * 1024,
      `${filename} must remain at or below 250 KB`,
    );
  }
});
```

- [ ] **Step 3: Run the test and verify the expected failure**

Run:

```powershell
pnpm run test
```

Expected: FAIL in `case studies expose the approved images and links` because both `image` fields are empty and the MyFinance `liveLink` is missing. The asset test may also report `ENOENT`; this is expected before Task 2.

- [ ] **Step 4: Confirm no production file has changed yet**

Run:

```powershell
git status --short
```

Expected: only `package.json` and `tests/case-study-projects.test.mjs` are modified/untracked. Do not commit while the feature contract is red.

---

### Task 2: Generate, normalize, and integrate the approved covers

**Files:**
- Create: `public/Imagens/myfinance-platform.webp`
- Create: `public/Imagens/hunter-ai-platform.webp`
- Modify: `src/data.ts:84-142`
- Test: `tests/case-study-projects.test.mjs`

**Interfaces:**
- Consumes: approved sanitized MyFinance PNG at `C:/Users/junio/.codex/generated_images/019fc4d7-16be-7ae3-94f2-e47c102ae56d/exec-59e42a6e-43b5-4e07-8292-087ed4115f24.png`; approved `.hunter-ui` concept in the brainstorming companion.
- Produces: two optimized local WebP covers and data entries consumed by `ProjectCard` without component changes.

- [ ] **Step 1: Export the approved HunterAI visual**

Start or reconnect the brainstorming companion for this project. Before export, add the approved transparency label inside the visual itself so it remains visible when the image is separated from the comparison card:

```html
<span class="concept-stamp">Product concept</span>
```

```css
.concept-stamp {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  padding: 6px 9px;
  border: 1px solid rgba(56, 189, 248, 0.24);
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.82);
  color: #7dd3fc;
  font: 700 10px/1 ui-monospace, monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Keep `.hunter-ui` as the positioned 16:9 container. Open the approved cover screen, locate `.hunter-ui` using the latest DOM state, read its `getBoundingClientRect()` in a bounded read-only evaluation, and capture exactly that rectangle using `tab.screenshot({ clip })`. Save the result as an intermediate PNG under the Codex task `work/` directory, not in the repository.

Required checks before continuing:

```text
- The capture contains “Acquisition Command Center”.
- The capture contains the visible “Product concept” label.
- The pipeline, scoring panel, governance status, and technical rail are legible.
- No browser frame or brainstorming-companion header is present.
```

- [ ] **Step 2: Normalize both approved sources to WebP**

Use the bundled Python runtime and Pillow. The MyFinance source is the approved sanitized image; the Hunter source is the exact cover capture from Step 1.

```python
from pathlib import Path
from PIL import Image, ImageOps

MYFINANCE_SOURCE = Path(
    r"C:\Users\junio\.codex\generated_images\019fc4d7-16be-7ae3-94f2-e47c102ae56d\exec-59e42a6e-43b5-4e07-8292-087ed4115f24.png"
)
HUNTER_SOURCE = Path(
    r"C:\Users\junio\Documents\Codex\2026-08-02\quero-que-busque-vagas-de-desenvolvedor\work\hunter-ai-approved.png"
)
OUTPUT_DIRECTORY = Path(r"C:\var\www\portifolio-andre-react\public\Imagens")


def save_cover(source: Path, output_name: str) -> None:
    """
    Normalizes an approved project cover to a recruiter-ready 16:9 WebP.
    @author André Narcizo - andre.narcizo@sysout.com.br
    """
    with Image.open(source).convert("RGB") as image:
        normalized = ImageOps.pad(
            image,
            (1600, 900),
            method=Image.Resampling.LANCZOS,
            color=(7, 16, 30),
            centering=(0.5, 0.5),
        )
        normalized.save(
            OUTPUT_DIRECTORY / output_name,
            "WEBP",
            quality=88,
            method=6,
        )


save_cover(MYFINANCE_SOURCE, "myfinance-platform.webp")
save_cover(HUNTER_SOURCE, "hunter-ai-platform.webp")
```

If either file exceeds 250 KB, retry only that asset at quality `84`, then `80`. Stop lowering quality if dashboard or pipeline text becomes visibly unreadable; document the justified size exception instead of publishing a blurred image.

- [ ] **Step 3: Update the project data with the minimal implementation**

Change only these properties in `src/data.ts`:

```ts
{
  id: 201,
  title: 'MyFinance Platform',
  image: '/Imagens/myfinance-platform.webp',
  liveLink: 'https://my-finance-ebon-one.vercel.app/',
  githubLink: 'https://github.com/DevAndreNarcizo/myfinance-platform',
  // Existing copy and tags remain unchanged.
},
{
  id: 202,
  title: 'HunterAI Platform',
  image: '/Imagens/hunter-ai-platform.webp',
  githubLink: 'https://github.com/DevAndreNarcizo/hunter-ai-platform',
  // Do not add liveLink. Existing copy and tags remain unchanged.
}
```

- [ ] **Step 4: Run the focused contract test and verify green**

Run:

```powershell
pnpm run test
```

Expected: 2 tests pass, 0 fail. Confirm the output reports both the data/link contract and the 16:9 WebP budget contract.

- [ ] **Step 5: Inspect the staged scope for private or temporary files**

Run:

```powershell
git status --short
git diff --check
git diff -- src/data.ts package.json tests/case-study-projects.test.mjs
```

Expected tracked scope:

```text
package.json
tests/case-study-projects.test.mjs
src/data.ts
public/Imagens/myfinance-platform.webp
public/Imagens/hunter-ai-platform.webp
```

Reject the scope if it contains `.superpowers/`, a PNG source, `work/`, credentials, `dist/`, or private screenshots.

- [ ] **Step 6: Commit the tested feature**

```powershell
git add package.json tests/case-study-projects.test.mjs src/data.ts public/Imagens/myfinance-platform.webp public/Imagens/hunter-ai-platform.webp
git commit -m "feat: add case study project covers"
```

---

### Task 3: Verify the production build and responsive presentation

**Files:**
- Verify: `src/components/ProjectCard.tsx:119-138`
- Verify: `src/components/ProjectCard.css:212-258`
- Verify: `dist/Imagens/myfinance-platform.webp`
- Verify: `dist/Imagens/hunter-ai-platform.webp`

**Interfaces:**
- Consumes: case-study data and WebP assets from Task 2.
- Produces: evidence that the existing card image path, responsive CSS, links, and production build satisfy the approved specification.

- [ ] **Step 1: Run all fresh automated checks**

```powershell
pnpm run test
pnpm run lint
pnpm run build
```

Expected: every command exits `0`; the test runner reports 2 passing tests; ESLint reports no errors; TypeScript and Vite complete successfully.

- [ ] **Step 2: Verify production assets exist**

```powershell
Get-Item dist\Imagens\myfinance-platform.webp, dist\Imagens\hunter-ai-platform.webp |
  Select-Object Name, Length
```

Expected: both files exist and each is non-empty and at or below 256000 bytes.

- [ ] **Step 3: Start the production preview**

Run the existing Vite preview command on `127.0.0.1:4173`. Keep it scoped to this repository and do not commit preview output.

```powershell
.\node_modules\.bin\vite.cmd preview --host 127.0.0.1 --port 4173
```

- [ ] **Step 4: Validate desktop behavior in the browser**

At `1440 × 900`, verify:

```text
- MyFinance shows the sanitized dashboard cover, not the architecture placeholder.
- HunterAI shows the approved command-center cover, not the architecture placeholder.
- Neither image is stretched or broken.
- MyFinance exposes “Ver projeto” and GitHub actions.
- HunterAI exposes GitHub only.
- “Product concept” remains legible inside the HunterAI image.
```

Capture one desktop screenshot as validation evidence under the task `work/` directory.

- [ ] **Step 5: Validate mobile behavior in the browser**

At `390 × 844`, verify both cards stack correctly, the covers stay inside the card boundary, the dashboard and Hunter pipeline remain recognizable, and project actions stay reachable. Capture one mobile screenshot under `work/`, then reset the temporary viewport override.

If a real visual defect appears, stop and use `superpowers:systematic-debugging` before changing CSS. Do not make speculative `ProjectCard` changes when the current component already renders correctly.

- [ ] **Step 6: Confirm the worktree is clean and the feature commit is present**

```powershell
git status --short
git log -3 --oneline
```

Expected: clean status and a `feat: add case study project covers` commit after the two specification commits.

---

### Task 4: Publish and verify Netlify

**Files:**
- Publish: branch `main`
- Verify: `https://dev-andrenarcizo.netlify.app/`

**Interfaces:**
- Consumes: verified feature commit from Task 3.
- Produces: public recruiter-facing portfolio with both approved covers and the MyFinance live link.

- [ ] **Step 1: Push the verified commits**

```powershell
git push origin main
```

Expected: remote `main` advances to the local feature commit without force-push.

- [ ] **Step 2: Wait for the deployed HTML to reference the new build**

Poll the public page with cache-busting query parameters until the response is `200` and the new deployment is visible. Do not treat an older cached portfolio response as success.

- [ ] **Step 3: Validate the public portfolio**

Open `https://dev-andrenarcizo.netlify.app/` and verify at the live site:

```text
- Both case-study covers load with non-zero natural dimensions.
- MyFinance opens https://my-finance-ebon-one.vercel.app/ from its live action.
- Both GitHub actions retain their correct repository URLs.
- HunterAI has no live-system action.
- Portuguese and English modes preserve the same images and link behavior.
```

- [ ] **Step 4: Finalize browser tabs and report evidence**

Keep only the public portfolio tab as a deliverable. Report the feature commit hash, test count, lint/build status, asset sizes, live URL, and the fact that the MyFinance source account data was not committed.
