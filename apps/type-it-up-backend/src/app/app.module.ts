import { AuthModule, Game, User, UserStats } from '@/backend/auth';
import { GameModule } from '@/backend/game';
import { GameGenerationModule } from '@/backend/game-generation';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import HelloWorldModule from './hello-world/hello-world.module';

@Module({
  imports: [
    HelloWorldModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'skandertebourbi',
      password: '',
      database: 'type-it-up',
      synchronize: true,
      entities: [User, Game, UserStats],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
    GameModule,
    GameGenerationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
