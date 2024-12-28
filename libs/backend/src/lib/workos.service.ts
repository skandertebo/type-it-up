import { Injectable } from '@nestjs/common';
import { WorkOS } from '@workos-inc/node';

@Injectable()
export class WorkosService {
  private readonly workos: WorkOS;

  private clientId: string;
  private redirectUri: string;

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
  }

  getSSOUrl(organizationId: string): string {
    return this.workos.sso.getAuthorizationUrl({
      clientId: this.clientId,
      organization: organizationId,
      redirectUri: this.redirectUri,
    });
  }

  async authenticate(code: string) {
    const { profile } = await this.workos.sso.getProfileAndToken({
      code,
      clientId: this.clientId,
    });
    return profile;
  }
}
