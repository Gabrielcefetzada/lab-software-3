import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Transfer } from '@/components/dashboard/transactions/transfer';


export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Transferir</Typography>
      </div>
      <Transfer />
    </Stack>
  );
}
