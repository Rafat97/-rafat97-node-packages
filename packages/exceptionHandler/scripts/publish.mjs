await $`npm run build`;
await $`npm version patch`;
await $`npm publish`;
