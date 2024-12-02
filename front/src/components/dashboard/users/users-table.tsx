'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';
import { User } from '@/services/api/users';

function noop(): void {
  // do nothing
}

interface UsersTableProps {
  count?: number;
  page?: number;
  rows?: User[];
  rowsPerPage?: number;
}

export function UsersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: UsersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((user) => user.id.toString());
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Cadastro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id.toString());

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id.toString());
                        } else {
                          deselectOne(row.id.toString());
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.curso}</TableCell>
                  <TableCell>{row.saldo}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('DD/MM/YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
