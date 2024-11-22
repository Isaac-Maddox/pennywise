# Pennywise

![Pennywise Logo](/public/logo_with_lettermark.jpg)

## Get set up

```bash
npm i
npx prisma generate
npx next dev
```

## Build a Production version and run it

```bash
npx next build
npx next start
```

## Migrate changes to the Prisma schema

```bash
npx prisma migrate dev --name <name>
```

## Git commands

### Pull latest

```bash
git checkout main
git pull
```

### Commit your changes

```bash
git add -A # Only if you created or deleted files
git commit -a -m '<commit message>'
git push
```

### After creating a new branch in the Project

```bash
git fetch origin
git checkout 1-some-branch # Type the number of your branch and press tab
```
