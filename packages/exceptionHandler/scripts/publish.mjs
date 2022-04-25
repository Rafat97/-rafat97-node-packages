await $`npm run build`;
await $`npm version patch --no-git-tag-version`;
await $`sleep 5`;
await $`npm publish`;
