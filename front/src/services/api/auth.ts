/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import config from '@/lib/config';

export interface SignInParams {
  email: string;
  password: string;
}

export async function signIn(params: SignInParams): Promise<{ token?: string; error?: string }> {
  try {
    const response = await fetch(config.authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return { error: 'Não autorizado' };
    }

    const data = await response.json();
    return { token: data.access_token };
  } catch (error) {
    return { error: 'Network error or server unreachable' };
  }
}
