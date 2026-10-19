import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { PrismaClient } from "@mms/db";
import type Redis from "ioredis";

import { PRISMA_CLIENT } from "../prisma/prisma.constants";
import { REDIS_CLIENT } from "../redis/redis.constants";

interface HealthResponse {
  status: "ok" | "degraded";
  database: "up" | "down";
  redis: "up" | "down";
  timestamp: string;
}

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  @Get()
  @ApiOkResponse({ description: "Service health status" })
  async getHealth(): Promise<HealthResponse> {
    let database: "up" | "down" = "down";
    let redis: "up" | "down" = "down";

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      database = "up";
    } catch {
      database = "down";
    }

    try {
      if (this.redis.status !== "ready") {
        await this.redis.connect();
      }
      await this.redis.ping();
      redis = "up";
    } catch {
      redis = "down";
    }

    const status = database === "up" && redis === "up" ? "ok" : "degraded";

    return {
      status,
      database,
      redis,
      timestamp: new Date().toISOString(),
    };
  }
}
