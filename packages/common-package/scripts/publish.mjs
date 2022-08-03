await $`npm run build`;
await $`npm version prerelease --preid beta --no-git-tag-version`;
await $`sleep 5`;
await $`npm publish`
