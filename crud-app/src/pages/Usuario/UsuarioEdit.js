import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { editAluno, getAlunos } from '../../services/api';

const AlunoEdit = () => {
    const { id } = useParams();
    const [aluno, setAluno] = useState({
        nome: '',
        email: ''
    });
    const history = useHistory();

    useEffect(() => {
        const fetchAluno = async () => {
            const response = await getAlunos(id);
            setAluno(response.data);
        };
        fetchAluno();
    }, [id]);

    const handleChange = (e) => {
        setAluno({ ...aluno, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editAluno(id, aluno);
        history.push('/alunos');
    };

    return (
        <div>
            <h2>Editar Aluno</h2>
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
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default AlunoEdit;
