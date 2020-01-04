import React, { useState, useMemo, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight, MdCheckCircle } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Container, Content, Commands, Lista, Pagination } from './styles';

import api from '~/services/api';

export default function Plans() {
  let [page, setPage] = useState(1);
  const [registrations, setRegistrations] = useState([]);
  const [name, setName] = useState('');

  const pageFormatted = useMemo(() => page, [page]);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registrations', {
        params: { page, name },
      });
      // console.log(response.data);

      setRegistrations(response.data);
      console.tron.log(response.data);
    }

    loadRegistrations();
  }, [page, name]);

  function handleNextPage() {
    setPage((page += 1));
  }

  function handlePreviousPage() {
    if (page > 1) setPage((page -= 1));
  }

  async function handleDelete(event, id) {
    const { title } = registrations.find(p => p.id === parseInt(id));
    const resp = window.confirm(`Deseja excluir a Matrícula ${title}`);
    if (resp === true) {
      try {
        await api.delete(`/registrations/${id}`);
        toast.success('Excluiu a Matrícula com sucesso');
      } catch (err) {
        toast.error('Erro ao excluir a Matrícula com sucesso');
      }
    }
  }

  return (
    <Container>
      <Content>
        <nav>
          <h1>Gerenciando matrículas</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <form>
                <Link to="/registrations/create">
                  <FiPlus />
                  CADASTRAR
                </Link>
                <div>
                  <IoIosSearch color="#999" />
                  <input
                    type="text"
                    placeholder="Buscar aluno"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </Commands>
        </aside>
        <Lista>
          <table>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td>PLANO</td>
                <td>INÍCIO</td>
                <td>TÉRMINO</td>
                <td>ATIVA</td>
                <td> </td>
              </tr>
            </thead>
            <tbody>
              {registrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.student.name}</td>
                  <td>{registration.plan.title}</td>
                  <td>
                    {format(
                      parseISO(registration.start_date),
                      "dd 'de' MMMM 'de' YYY",
                      { locale: pt }
                    )}
                  </td>
                  <td>
                    {format(
                      parseISO(registration.end_date),
                      "dd 'de' MMMM 'de' YYY",
                      { locale: pt }
                    )}
                  </td>
                  <td>
                    <MdCheckCircle
                      size={24}
                      color={registration.active ? '#42cb59' : '#dddddd'}
                    />
                  </td>
                  <td>
                    <Link to={`/registrations/${registration.id}`}>editar</Link>{' '}
                    <button
                      type="button"
                      onClick={event => handleDelete(event, registration.id)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Lista>
        <Pagination>
          <MdChevronLeft onClick={handlePreviousPage} />
          <span>{pageFormatted}</span>
          <MdChevronRight onClick={handleNextPage} />
        </Pagination>
      </Content>
    </Container>
  );
}
