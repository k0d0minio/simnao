# Findings replace-boilerplate-readme

The operator files these later. One entry for each finding.

## The environments file is empty

- where: `.icm/environments.md`
- what: The production address of the site is not written in the repo. The README cannot name it.
- proposed: chore

## The public folder holds the create-next-app icons

- where: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- what: These icons came with create-next-app. This run did not check if a page uses them.
- proposed: chore
