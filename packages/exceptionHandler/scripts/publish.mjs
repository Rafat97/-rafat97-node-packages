await $`npm run build`;
await $`npm version patch`;
await $`sleep 5`;
await $`npm publish`;
