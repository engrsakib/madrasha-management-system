/** @param {string} file */
function packageNameFromFile(file) {
  const normalized = file.replace(/\\/g, "/");
  const match = normalized.match(/\/packages\/([^/]+)\//);
  return match?.[1] ?? null;
}

export default {
  "**/packages/**/*.{ts,tsx,js,mjs}": (files) =>
    files.map((file) => {
      const pkg = packageNameFromFile(file);
      if (!pkg) {
        return `pnpm exec prettier --write "${file}"`;
      }
      return `pnpm exec eslint --max-warnings=0 --fix --config packages/${pkg}/eslint.config.mjs "${file}"`;
    }),
  "*.{json,md,yml,yaml,css}": ["pnpm exec prettier --write"],
  "**/packages/db/prisma/schema.prisma": () => "pnpm --filter @mms/db exec prisma format",
};
