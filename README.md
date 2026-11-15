# simnao

Portfolio and print sales for simnao (Simão), a Portuguese painter working in the space
between yes and no. This repo holds the site and eight design concepts for it.

This file is for Jamie. It says what is here and how to work on it.

## What the site is

- A Next.js app (App Router) with React, Tailwind and Motion. No database and no API.
- The works are data in `src/lib/artworks.ts`: title, Portuguese title, year, medium, size,
  price, and status (`available`, `sold`, `reserved`).
- The paintings on screen are generated from each work's `seed`, `palette` and `motif`
  (`src/components/generative-art.tsx`). There are no image files for the works.

## The pages and their routes

| Route | Page |
|---|---|
| `/` | The home page |
| `/designs` | The index of the design concepts. It links to the eight pages below |
| `/duality` | 01 Duality. Editorial split-screen, strict black and white |
| `/gallery` | 02 The Room. Cinematic dark, a horizontal walk past each painting |
| `/kinetic` | 03 Kinetic. Neo-brutalist, thick borders, a tilting collage grid |
| `/inkwell` | 04 Inkwell. Comic book, black ink and pop colour |
| `/storyboard` | 05 Storyboard. Noir graphic novel, panels that ink in on scroll |
| `/sketchbook` | 06 The Sketchbook. Ruled paper over a pen-doodle background |
| `/gutter` | 07 The Gutter. The panel grid and the gutter, ink on newsprint |
| `/marginalia` | 08 Marginalia. The used notebook, titles struck and written again |

Each page is one file: `src/app/<route>/page.tsx`.

## How to run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

Other commands: `pnpm build`, `pnpm start`, `pnpm lint`. In a Claude session, do not run
the build or the lint: CI and the Vercel preview are the source of truth.

## How it deploys

Vercel builds the repo. A push to `main` is a production deploy. Each pull request gets
its own preview deploy, and the link is on the pull request.

The addresses belong in `.icm/environments.md`. That file is empty today.

## The ticket pipeline in .icm

The repo uses the BAXTER blueprint. `.icm/_system/` belongs to the blueprint: do not
edit it here. The rest of `.icm/` belongs to this repo.

- A ticket is a markdown stub in `.icm/intake/`. Say `ticket <what is wanted>` to write one.
- Start a ticket with `bug`, `tweak` or `chore` and its path, or with `new` for work that
  needs a spec. Example: `chore triage/replace-boilerplate-readme`.
- Questions and the Ready to merge gate are in the pull request. Answer and tick them on
  the BAXTER HUD.
- The router with all commands is `.icm/_system/ROUTER.md`.
