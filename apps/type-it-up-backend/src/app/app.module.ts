import { AuthModule, User } from '@/backend/auth';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      entities: [User],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
