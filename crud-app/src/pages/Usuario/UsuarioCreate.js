import React, { useState } from 'react';
import { createAluno } from '../../services/api';
import { useHistory } from 'react-router-dom';

const AlunoCreate = () => {
    const [aluno, setAluno] = useState({
        nome: '',
        email: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        setAluno({ ...aluno, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAluno(aluno);
        history.push('/alunos');
    };

    return (
        <div>
            <h2>Criar Novo Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input 
                        type="text" 
                        name="nome" 
                        value={aluno.nome} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={aluno.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default AlunoCreate;
