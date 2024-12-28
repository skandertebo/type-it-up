import { Query, Resolver } from '@nestjs/graphql';
import { HelloWorldSchema } from './schemas/hello-world.schema';

@Resolver()
export class HelloWorldResolver {
  @Query(() => HelloWorldSchema)
  async sayHello() {
    return {
      message: 'hello world!',
    };
  }
}
