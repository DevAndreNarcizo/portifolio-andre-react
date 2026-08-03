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
