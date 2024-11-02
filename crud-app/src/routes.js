import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AlunoList from './pages/Alunos/AlunoList';
import AlunoCreate from './pages/Alunos/AlunoCreate';
import InstituicaoList from './pages/Instituicoes/InstituicaoList';
import InstituicaoCreate from './pages/Instituicoes/InstituicaoCreate';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/alunos" component={AlunoList} />
                <Route path="/aluno/create" component={AlunoCreate} />
                <Route path="/instituicoes" component={InstituicaoList} />
                <Route path="/instituicao/create" component={InstituicaoCreate} />
            </Switch>
        </Router>
    );
};

export default Routes;
