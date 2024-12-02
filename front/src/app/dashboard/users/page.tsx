'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation'; // Importa o hook useRouter
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UsersTable } from '@/components/dashboard/users/users-table';
import {UserService, User } from '@/services/api/users';

export default function Page(): React.JSX.Element {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const page = 0;
  const rowsPerPage = 5;

  const router = useRouter();

  React.useEffect(() => {
    async function fetchUsers(): Promise<void> {
      try {
        const data = await UserService.list();
        setUsers(data);
      } catch (error) {
        // console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    void fetchUsers();
  }, []);

  const paginatedUsers = applyPagination(users, page, rowsPerPage);

  const handleAddUser = () => {
    router.push('/dashboard/users/create');
    };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Usuários</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleAddUser}
          >
            Adicionar
          </Button>
        </div>
      </Stack>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <UsersTable
          count={paginatedUsers.length}
          page={page}
          rows={paginatedUsers}
          rowsPerPage={rowsPerPage}
        />
      )}
    </Stack>
  );
}

function applyPagination(rows: User[], page: number, rowsPerPage: number): User[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
