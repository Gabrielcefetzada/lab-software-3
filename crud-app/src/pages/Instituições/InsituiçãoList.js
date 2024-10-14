import React, { useState, useEffect } from 'react';
import { getInstituicoes } from '../../services/api';

const InstituicaoList = () => {
    const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        loadInstituicoes();
    }, []);

    const loadInstituicoes = async () => {
        const response = await getInstituicoes();
        setInstituicoes(response.data);
    };

    return (
        <div>
            <h2>Lista de Instituições</h2>
            <ul>
                {instituicoes.map((instituicao) => (
                    <li key={instituicao.id}>{instituicao.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default InstituicaoList;
