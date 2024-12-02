/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import config from "@/lib/config";

export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  curso: string;
  saldo: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  instituicao: {
    id: number;
    nome: string;
    cnpj: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Balance {
  balance: number;
}

export interface Transaction {
  id: number;
  valor: number;
  motivo: string;
  createdAt: string;
  updatedAt: string;
  pagador: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    endereco: string;
    curso: string;
    saldo: number;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  beneficiario: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    endereco: string;
    curso: string;
    saldo: number;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserService {
  private static apiUrl = config.userUrl

  static async list(): Promise<User[]> {
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
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  }

  static async create(userData: Omit<User, 'id' | 'saldo' | 'createdAt' | 'updatedAt'>): Promise<User> {
      const authToken = localStorage.getItem('custom-auth-token');
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return await response.json();

  }


  static async getBalance(userId: number): Promise<Balance> {
      const authToken = localStorage.getItem('custom-auth-token');
      const response = await fetch(`${this.apiUrl}/balance/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }

      const data = await response.json();
      return data;

  }

  static async getUserTransactions(userId: number): Promise<Transaction[]> {
    const authToken = localStorage.getItem('custom-auth-token');

    try {
      const response = await fetch(`${this.apiUrl}/extrato/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : '',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }

      const data: Transaction[] = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  }
}

