"use client";

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { UserService, Transaction } from '@/services/api/users';

export default function Page(): React.JSX.Element {
  const [balance, setBalance] = React.useState<number | null>(null);
  const [orders, setOrders] = React.useState<
    { id: string; pagador: string; beneficiario: string; valor: number; data: Date }[]
  >([]);

  React.useEffect(() => {
    async function fetchBalance(): Promise<void> {
      try {
        const userId = 6; // TODO: Substituir pelo ID real do usuário autenticado
        const response = await UserService.getBalance(userId);
        setBalance(response.balance);
      } catch (error) {
        setBalance(null);
      }
    }

    async function fetchOrders(): Promise<void> {
      try {
        const userId = 6; // TODO: Substituir pelo ID real do usuário autenticado
        const transactions: Transaction[] = await UserService.getUserTransactions(userId);

        const formattedOrders = transactions.map((transaction) => ({
          id: transaction.id.toString(),
          pagador: transaction.pagador.nome,
          beneficiario: transaction.beneficiario.nome,
          valor: transaction.valor,
          data: new Date(transaction.createdAt),
        }));

        setOrders(formattedOrders);
      } catch (error) {
        setOrders([]);
      }
    }

    void fetchBalance();
    void fetchOrders();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget sx={{ height: '100%' }} value={balance !== null ? balance.toString() : '---'} />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestOrders orders={orders} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
