import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/alunos">Alunos</Link></li>
                <li><Link to="/aluno/create">Criar Aluno</Link></li>
                <li><Link to="/instituicoes">Instituições</Link></li>
                <li><Link to="/instituicao/create">Criar Instituição</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
