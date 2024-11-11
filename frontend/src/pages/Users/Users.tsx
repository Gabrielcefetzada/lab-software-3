import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import UserService from '../../service/UserService';
import { format } from 'date-fns';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  curso: string;
  saldo: number;
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

const UsuarioListagem: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await UserService.listarUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError('Erro ao carregar usuários');
        console.error(err);
      }
    };

    fetchUsuarios();
  }, []);

  const isProfessor = (email: string) => email.includes('@professor.com');

  return (
    <Box p={3}>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {usuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {usuario.nome}
                </Typography>
                <Typography color="textSecondary">
                  Tipo: {isProfessor(usuario.email) ? 'Professor' : 'Aluno'}
                </Typography>
                <Typography color="textSecondary">
                  Email: {usuario.email}
                </Typography>
                <Typography color="textSecondary">
                  Curso: {usuario.curso}
                </Typography>
                <Typography color="textSecondary">
                  Saldo: R$ {usuario.saldo.toLocaleString('pt-BR')}
                </Typography>
                <Typography color="textSecondary">
                  Data de criação: {format(new Date(usuario.createdAt), 'dd/MM/yyyy')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsuarioListagem;
