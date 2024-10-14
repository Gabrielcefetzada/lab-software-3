import React, { useState } from 'react';
import { createInstituicao } from '../../services/api';
import { useHistory } from 'react-router-dom';

const InstituicaoCreate = () => {
    const [instituicao, setInstituicao] = useState({
        nome: '',
        endereco: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        setInstituicao({ ...instituicao, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createInstituicao(instituicao);
        history.push('/instituicoes');
    };

    return (
        <div>
            <h2>Criar Nova Instituição</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input 
                        type="text" 
                        name="nome" 
                        value={instituicao.nome} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Endereço</label>
                    <input 
                        type="text" 
                        name="endereco" 
                        value={instituicao.endereco} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default InstituicaoCreate;
