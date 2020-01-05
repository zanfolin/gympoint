import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';
import logo from '~/images/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link to="/students">ALUNOS</Link>
          <Link to="/plans">PLANOS</Link>
          <Link to="/registrations">MATRÍCULAS</Link>
          <Link to="/help_orders">PEDIDOS DE AUXÍLIO</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile ? profile.name : 'Não logado'}</strong>
              <span onClick={handleSignOut}>Sair do Sistema</span>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
