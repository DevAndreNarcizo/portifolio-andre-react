# Case Study Project Covers — Design Specification

## Status

- Visual direction approved by André Narcizo on 2026-08-02.
- Implementation remains pending until this written specification is reviewed.

## Objective

Replace the empty visual placeholders for the MyFinance Platform and HunterAI Platform case studies with recruiter-ready project covers that are visually consistent, technically honest, and optimized for the existing portfolio cards.

## Scope

The change includes:

1. A privacy-safe dashboard cover derived from the real MyFinance interface.
2. A product-concept cover for HunterAI based on its documented B2B SaaS scope and architecture.
3. The public MyFinance URL in the project card.
4. Optimized local WebP assets referenced from the existing project data.
5. Automated and visual validation of both images in desktop and mobile layouts.

The change does not include redesigning the project card component, changing unrelated projects, creating a public HunterAI deployment, or representing the HunterAI concept as a production screenshot.

## Visual Direction

### MyFinance Platform

The cover uses the authenticated dashboard from:

`https://my-finance-ebon-one.vercel.app/`

The source screenshot contains private household and financial information and must never be committed or published. The final cover preserves the real dashboard structure, dark interface, charts, sidebar, green product accent, and original MyFinance branding while replacing all names and values with coherent demonstration data.

The public cover must identify the workspace as `DEMO WORKSPACE`, the user as `Portfolio Demo`, and use internally consistent fictional totals. It must not contain credentials, real names, real financial values, browser chrome, overlays, or private data.

The project card will identify the image as a real product interface through its existing project context. The card will also expose the public application link.

### HunterAI Platform

The cover presents an approved product-and-engineering concept titled `Acquisition Command Center`.

The product layer contains:

- Lead capture, qualification, and approval metrics.
- A four-stage qualification pipeline: Captured, Enriched, Qualified, and Approved.
- AI lead-scoring indicators.
- Consent and message-approval status.
- A governance-active status indicator.

The engineering layer appears as a restrained technical rail:

`Next.js → Node API → Redis Queue → Python Worker → PostgreSQL`

The image must visibly include the label `Product concept`. This protects recruiter trust by making it clear that the image is a visual representation of the documented case study, not a screenshot of a deployed application.

## Asset Requirements

| Project | Asset | Source | Format | Target ratio |
|---|---|---|---|---|
| MyFinance | `myfinance-platform.webp` | Sanitized edit of the authenticated dashboard | WebP | 16:9 |
| HunterAI | `hunter-ai-platform.webp` | Approved concept rendering | WebP | 16:9 |

Both assets will be stored under `public/Imagens/` and compressed to balance visual clarity with portfolio performance. Each image should be no larger than 250 KB unless compression at that size causes visible text degradation.

## Portfolio Integration

The existing `Project` structure and `ProjectCard` rendering path already support image and live-link fields. Implementation will update only the corresponding entries in `src/data.ts`:

- MyFinance `image` points to `/Imagens/myfinance-platform.webp`.
- MyFinance `liveLink` points to `https://my-finance-ebon-one.vercel.app/`.
- HunterAI `image` points to `/Imagens/hunter-ai-platform.webp`.
- HunterAI keeps only its GitHub case-study link because no public deployment exists.

No new runtime data flow or component state is required. Vite serves the assets from the public directory, the project data passes their paths to `ProjectCard`, and the card renders them through its existing responsive image element.

## Failure Handling

- Image paths must be verified against the production build output to prevent silent placeholders or broken assets.
- The card's existing placeholder remains the runtime fallback if a future data entry intentionally omits an image.
- Asset generation must fail visibly if the screenshot or render is empty, unreadable, or has unexpected dimensions.
- The HunterAI image must not be published without the `Product concept` label.
- The MyFinance cover must be rejected if it contains any source-account name, household name, real financial value, or internally inconsistent demonstration value.

## Testing Strategy

### Automated checks

1. Expose a `test` package script using the Node.js built-in test runner and the TypeScript compiler already installed in the project, avoiding a new dependency or package-lock drift.
2. Add a focused data test that fails while either case study has an empty image path, the MyFinance live link is missing, or the HunterAI public live link is incorrectly present.
3. Verify both WebP files exist and have non-zero dimensions.
4. Run the full test suite, TypeScript build, ESLint, and Vite production build.
5. Confirm the generated `dist/Imagens/` directory contains both assets.

### Visual checks

1. Render the portfolio at desktop width and confirm both images fill their cards without distortion.
2. Render at mobile width and confirm the image content remains legible and does not overflow.
3. Confirm the MyFinance card exposes both the live system and GitHub links and that its cover contains demonstration data only.
4. Confirm the HunterAI card exposes GitHub only and visibly communicates `Product concept` inside its cover.
5. Validate the deployed Netlify page after publishing.

## Acceptance Criteria

- Neither case-study card displays the architecture placeholder.
- MyFinance shows a privacy-safe dashboard derived from the real published interface and links to the provided Vercel URL.
- HunterAI shows the approved B2B command-center concept with product and engineering information.
- The HunterAI visual cannot reasonably be mistaken for a production screenshot.
- Both images are sharp, responsive, locally hosted, and included in the production build.
- Existing Portuguese and English project content remains unchanged.
- Lint, TypeScript, build, data tests, desktop validation, mobile validation, and public deployment validation all pass.
