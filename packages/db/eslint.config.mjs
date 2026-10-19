import base from "@mms/eslint-config/base";

export default [
  {
    ignores: ["dist/**", "prisma.config.ts", "prisma/seed.ts", "**/*.js", "**/*.d.ts"],
  },
  ...base,
];
