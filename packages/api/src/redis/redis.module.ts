import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

import type { EnvConfig } from "../config/env.schema";
import { REDIS_CLIENT } from "./redis.constants";

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig, true>): Redis => {
        const redisUrl = config.get("REDIS_URL", { infer: true });
        return new Redis(redisUrl, { maxRetriesPerRequest: 1, lazyConnect: true });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
