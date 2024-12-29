import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken';

export const CurrentUser = createParamDecorator(
  (property: keyof JwtPayload, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: JwtPayload = ctx.getContext().req.user;
    return user && property ? user[property] : user;
  }
);
