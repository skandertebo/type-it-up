import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private secret: string;

  constructor() {
    if (!process.env['JWT_SECRET']) {
      throw new Error('JWT_SECRET is not set');
    }
    this.secret = process.env['JWT_SECRET'];
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.getArgs()[2]; // Apollo context
    const authHeader = ctx.req.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, this.secret);
      ctx.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
