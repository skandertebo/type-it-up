import { Injectable } from '@nestjs/common';
import { WorkOS } from '@workos-inc/node';
@Injectable()
export class WorkosService {
  private readonly workos: WorkOS;

  private clientId: string;
  public jwksUrl: string;

  constructor() {
    if (!process.env['WORKOS_API_KEY']) {
      throw new Error('WORKOS_API_KEY is not set');
    }
    this.workos = new WorkOS(process.env['WORKOS_API_KEY']);
    if (!process.env['WORKOS_CLIENT_ID']) {
      throw new Error('WORKOS_CLIENT_ID is not set');
    }
    this.clientId = process.env['WORKOS_CLIENT_ID'];
    if (!process.env['WORKOS_REDIRECT_URI']) {
      throw new Error('WORKOS_REDIRECT_URI is not set');
    }
    this.jwksUrl = this.workos.userManagement.getJwksUrl(this.clientId);
  }

  async authenticateWithCode(code: string) {
    const { accessToken, refreshToken, user } =
      await this.workos.userManagement.authenticateWithCode({
        code,
        clientId: this.clientId,
      });
    return { accessToken, refreshToken, user };
  }

  async authenticateWithRefreshToken(refreshToken: string) {
    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await this.workos.userManagement.authenticateWithRefreshToken({
      refreshToken,
      clientId: this.clientId,
    });
    return { accessToken, refreshToken: newRefreshToken, user };
  }

  async authenticateWithUserPassword(email: string, password: string) {
    const { accessToken, refreshToken, user } =
      await this.workos.userManagement.authenticateWithPassword({
        email,
        password,
        clientId: this.clientId
      });
    return { accessToken, refreshToken, user };
  }

  async registerUser(email: string, password: string, firstName: string, lastName: string) {
    const res =
      await this.workos.userManagement.createUser({
        email,
        password,
        firstName,
        lastName,
      });
    return res;
  }

  async verifyEmail(userId: string) {
    await this.workos.userManagement.updateUser({
     "userId": userId,
     emailVerified: true,
    });
   }
}

