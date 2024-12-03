/* eslint-disable no-alert */
'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { UserService } from '@/services/api/users';
import { TransacaoService } from '@/services/api/transacao';

export function Transfer(): React.JSX.Element {
  const [recipients, setRecipients] = React.useState<{ id: number; name: string }[]>([]);
  const [recipient, setRecipient] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchRecipients(): Promise<void> {
        const users = await UserService.list();
        setRecipients(users.map((user) => ({ id: user.id, name: user.nome })));

    }

    void fetchRecipients();
  }, []);

  const handleRecipientChange = (event: SelectChangeEvent): void => {
    setRecipient(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = {
        pagador: 6, // TODO: Substituir pelo ID do usuário autenticado
        beneficiario: parseInt(recipient, 10),
        valor: parseFloat(value),
        motivo: message,
      };

      await TransacaoService.transfer(payload);

      // Resetar os campos após o sucesso
      setRecipient('');
      setValue('');
      setMessage('');
      alert('Transferência realizada com sucesso!');
    } catch (error) {
      alert('Erro ao realizar transferência.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Transferir" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            {/* Campo de mensagem */}
            <FormControl fullWidth>
              <InputLabel>Mensagem</InputLabel>
              <OutlinedInput
                label="Transfer"
                name="transfer"
                value={message}
                onChange={handleMessageChange}
              />
            </FormControl>

            {/* Campo de seleção de destinatário */}
            <FormControl fullWidth>
              <InputLabel>Aluno</InputLabel>
              <Select
                value={recipient}
                onChange={handleRecipientChange}
                label="Recipient"
                name="recipient"
              >
                {recipients.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Campo de valor */}
            <FormControl fullWidth>
              <InputLabel>Quantidade de moedas</InputLabel>
              <OutlinedInput
                label="Amount"
                name="amount"
                type="number"
                value={value}
                onChange={handleValueChange}
              />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
