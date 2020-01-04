import React, { useState, useMemo, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Content, Commands, Lista, Pagination } from './styles';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

export default function Plans() {
  let [page, setPage] = useState(1);
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState('');

  const pageFormatted = useMemo(() => page, [page]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', { params: { page, title } });
      // console.log(response.data);

      setPlans(response.data);
    }

    loadPlans();
  }, [page, title]);

  function handleNextPage() {
    setPage((page += 1));
  }

  function handlePreviousPage() {
    if (page > 1) setPage((page -= 1));
  }

  async function handleDelete(event, id) {
    const { title } = plans.find(p => p.id === parseInt(id));
    const resp = window.confirm(`Deseja excluir o código ${title}`);
    if (resp === true) {
      try {
        await api.delete(`/plans/${id}`);
        toast.success('Excluiu o cadastrato com sucesso');
      } catch (err) {
        toast.error('Erro ao excluir o cadastrato com sucesso');
      }
    }
  }

  return (
    <Container>
      <Content>
        <nav>
          <h1>Gerenciando planos</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <form>
                <Link to="/plans/create">
                  <FiPlus />
                  CADASTRAR
                </Link>
                <div>
                  <IoIosSearch color="#999" />
                  <input
                    type="text"
                    placeholder="Buscar plano"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
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
                <td>TÍTULO</td>
                <td>DURAÇÃO (meses)</td>
                <td>VALOR MÊS</td>
                <td> </td>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.duration}</td>
                  <td>{formatPrice(plan.price)}</td>
                  <td>
                    <Link to={`/plans/${plan.id}`}>editar</Link>{' '}
                    <button
                      type="button"
                      onClick={event => handleDelete(event, plan.id)}
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
