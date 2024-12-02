import config from '@/lib/config';

export interface Instituicao {
  id: number;
  nome: string;
  cnpj: string;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class InstituicaoService {
  private static apiUrl = config.instituicaoUrl;

  static async list(): Promise<Instituicao[]> {
    try {
      const authToken = localStorage.getItem('custom-auth-token');

      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch instituicao');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  }
}

