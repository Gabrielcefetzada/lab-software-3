import React, { useEffect, useState } from 'react';
import { getAlunos } from '../../services/api';

const AlunoList = () => {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        loadAlunos();
    }, []);

    const loadAlunos = async () => {
        const response = await getAlunos();
        setAlunos(response.data);
    };

    return (
        <div>
            <h2>Lista de Alunos</h2>
            <ul>
                {alunos.map((aluno) => (
                    <li key={aluno.id}>{aluno.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default AlunoList;
