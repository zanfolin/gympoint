import React, { useState, useMemo, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Content, Commands, Lista, Pagination } from './styles';

import api from '~/services/api';

export default function Students() {
  let [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  const pageFormatted = useMemo(() => page, [page]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', { params: { page, name } });
      // console.log(response.data);

      setStudents(response.data);
    }

    loadStudents();
  }, [page, name]);

  function handleNextPage() {
    setPage((page += 1));
  }

  function handlePreviousPage() {
    if (page > 1) setPage((page -= 1));
  }

  async function handleDelete(event, id) {
    const { name } = students.find(p => p.id === parseInt(id));
    const resp = window.confirm(`Deseja excluir o código ${name}`);
    if (resp === true) {
      try {
        await api.delete(`/students/${id}`);
        toast.success('Excluiu o cadastrato com sucesso');
      } catch (err) {
        toast.error('Erro ao excluir o cadastrato com sucesso');
      }
    }
  }
  /* function handleCadastrar() {
    // console.log('redirecionar');
    // history.push('/addstudents');
    // return <Redirect to="/addstudents" />;
  } */

  return (
    <Container>
      <Content>
        <nav>
          <h1>Gerenciando alunos</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <form>
                <Link to="/students/create">
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
                <td>NOME</td>
                <td>E-MAIL</td>
                <td>IDADE</td>
                <td> </td>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age_number}</td>
                  <td>
                    <Link to={`/students/${student.id}`}>editar</Link>{' '}
                    <button
                      type="button"
                      onClick={event => handleDelete(event, student.id)}
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
        <span>{name}</span>
      </Content>
    </Container>
  );
}
