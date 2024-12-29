import { Injectable } from '@nestjs/common';
import { WorkOS } from '@workos-inc/node';
@Injectable()
export class WorkosService {
  private readonly workos: WorkOS;

  private clientId: string;
  private redirectUri: string;
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
    this.redirectUri = process.env['WORKOS_REDIRECT_URI'];
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

  // async authenticateWithAccessToken(accessToken: string) {
  //   try {
  //     const payload = jwt.decode(accessToken);
  //     if (!payload) {
  //       throw new UnauthorizedException();
  //     }
  //     const user = await this.workos.userManagement.getUser(payload.sub);
  //     return user;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new UnauthorizedException(error.message);
  //     }
  //     throw new UnauthorizedException('Invalid access token');
  //   }
  // }
}
