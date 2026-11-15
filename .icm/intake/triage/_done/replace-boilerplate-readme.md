# Replace the boilerplate README

- complexity: trivial
- lane: chore

## Problem

`README.md` is the text that `create-next-app` wrote. It says nothing about this site. A
person who opens the repo cannot tell what the site is, which pages it has, or how to run
it.

## Acceptance criteria

- [ ] `README.md` says in its first lines what the site is and who it is for.
- [ ] `README.md` lists the pages of the site with their routes.
- [ ] `README.md` gives the commands to run the site on a computer, with pnpm.
- [ ] No line of the `create-next-app` text is left in `README.md`.
- [ ] No file other than `README.md` and the files of the run changes.

## Questions

### Q1. Which sections must the README have?
- type: multi
- options: What the site is | The pages and their routes | How to run it | How it deploys | The ticket pipeline in .icm
- default: What the site is | The pages and their routes | How to run it | How it deploys
- answer: _waiting_

### Q2. Who is the README for?
- type: single
- options: Jamie only | A new developer | Jamie and the client
- default: A new developer
- answer: _waiting_

### Q3. Is there something that the README must not say?
- type: text
- default: none
- answer: _waiting_
