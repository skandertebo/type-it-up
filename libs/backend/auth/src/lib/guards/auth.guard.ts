import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // This is needed for subscriptions and JWT authentication
    if (req.connectionParams?.authorization) {
      req.headers = { authorization: req.connectionParams.authorization };
    }
    return req;
  }
}
