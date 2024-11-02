import axios from 'axios';

const API_URL_ALUNOS = 'http://localhost:8080/api/alunos';
const API_URL_INSTITUICOES = 'http://localhost:8080/api/instituicoes';


export const getAlunos = async () => {
    return await axios.get(API_URL_ALUNOS);
};

export const createAluno = async (aluno) => {
    return await axios.post(API_URL_ALUNOS, aluno);
};

export const editAluno = async (id, aluno) => {
    return await axios.put(`${API_URL_ALUNOS}/${id}`, aluno);
};

// Funções relacionadas a Instituições
export const getInstituicoes = async () => {
    return await axios.get(API_URL_INSTITUICOES);
};

export const createInstituicao = async (instituicao) => {
    return await axios.post(API_URL_INSTITUICOES, instituicao);
};

export const editInstituicao = async (id, instituicao) => {
    return await axios.put(`${API_URL_INSTITUICOES}/${id}`, instituicao);
};
