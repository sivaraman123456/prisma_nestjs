import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Marks the PrismaModule as globally available
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
