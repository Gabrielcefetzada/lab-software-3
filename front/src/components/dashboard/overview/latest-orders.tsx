import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

export interface Order {
  id: string;
  pagador: string;
  beneficiario: string ;
  valor: number;
  data: Date;
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Últimas transações" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Pagador</TableCell>
              <TableCell>Beneficiário</TableCell>
              <TableCell sortDirection="desc">Data</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {

              return (
                <TableRow hover key={order.id}>
                  <TableCell>{order.pagador}</TableCell>
                  <TableCell>{order.beneficiario}</TableCell>
                  <TableCell>{dayjs(order.data).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{order.valor}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
