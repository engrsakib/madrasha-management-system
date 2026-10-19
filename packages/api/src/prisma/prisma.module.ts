import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createPrismaClient, type PrismaClient } from "@mms/db";

import type { EnvConfig } from "../config/env.schema";
import { PRISMA_CLIENT } from "./prisma.constants";

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig, true>): PrismaClient => {
        const databaseUrl = config.get("DATABASE_URL", { infer: true });
        return createPrismaClient(databaseUrl);
      },
    },
  ],
  exports: [PRISMA_CLIENT],
})
export class PrismaModule {}
