/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { type Instituicao, InstituicaoService } from '@/services/api/instituicao';
import {UserService} from '@/services/api/users';

export default function CreateUserPage(): React.JSX.Element {
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    rg: '',
    endereco: '',
    curso: '',
    institution: '',
  });

  const [institutions, setInstitutions] = React.useState<Instituicao[]>([]); // Estado para armazenar as instituições
  const [loading, setLoading] = React.useState<boolean>(true); // Estado para controlar o loading
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  // Chama o serviço para buscar as instituições
  React.useEffect(() => {
    async function fetchInstitutions(): Promise<void> {
      try {
        const data = await InstituicaoService.list();
        setInstitutions(data);
      } catch (error) {
        // console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    }

    void fetchInstitutions();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setSubmitting(true);

    try {
      const userData = {
        nome: formValues.name,
        email: formValues.email,
        password: formValues.password,
        cpf: formValues.cpf,
        rg: formValues.rg,
        endereco: formValues.endereco,
        curso: formValues.curso,
        instituicao: { id: formValues.institution }, // Associa o ID da instituição
      };

      await UserService.create(userData); // Chama o serviço para criar o usuário
      alert('Usuário criado com sucesso!');
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        cpf: '',
        rg: '',
        endereco: '',
        curso: '',
        institution: '',
      });
    } catch (error) {
      alert('Erro ao criar usuário. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Criar Usuário</Typography>
          <Typography variant="body2" color="textSecondary">
            Preencha os dados abaixo para criar um novo usuário.
          </Typography>
        </Stack>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nome"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            fullWidth
          />

          <TextField
            label="CPF"
            name="cpf"
            value={formValues.cpf}
            onChange={handleInputChange}
            required
            fullWidth
          />

          <TextField
            label="RG"
            name="rg"
            value={formValues.rg}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Endereço"
            name="endereco"
            value={formValues.endereco}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Curso"
            name="curso"
            value={formValues.curso}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
            fullWidth
          />

          <TextField
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            required
            fullWidth
          />

          {loading ? (
            <Typography>Carregando Instituições...</Typography>
          ) : (
            <TextField
              select
              label="Instituição"
              name="institution"
              value={formValues.institution}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {institutions.map((institution) => (
                <MenuItem key={institution.id} value={institution.id}>
                  {institution.nome}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Button
            type="submit"
            variant="contained"
            startIcon={<PlusIcon size={20} />}
            disabled={submitting}
          >
            {submitting ? 'Criando...' : 'Criar Usuário'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
