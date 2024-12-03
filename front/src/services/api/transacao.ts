/* eslint-disable @typescript-eslint/no-extraneous-class */
import config from "@/lib/config";

export class TransacaoService {
  private static apiUrl = config.transacaoUrl;

  static async transfer(payload: {
    pagador: number;
    beneficiario: number;
    valor: number;
    motivo: string;
  }): Promise<void> {
    const authToken = localStorage.getItem('custom-auth-token');
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : '',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to transfer');
    }
  }
}
