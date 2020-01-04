import React, { useState, useMemo, useEffect } from 'react';

import { MdCheckCircle, MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { useDispatch } from 'react-redux';
import { Container, Content, Lista } from './styles';

import api from '~/services/api';

import { addAnswerRequest } from '~/store/modules/helporder/actions';

import ReactModal from '~/pages/help_orders/reactModal';

export default function HelpOrders() {
  let [page, setPage] = useState(1);
  const [helporders, setHelpOrders] = useState([]);
  const [helpSelected, setHelpSelected] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const pageFormatted = useMemo(() => page, [page]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help_orders', { params: { page } });
      // console.log(response.data);

      setHelpOrders(response.data.rows);
    }

    loadHelpOrders();
  }, [page]);

  function handleNextPage() {
    setPage((page += 1));
  }

  function handlePreviousPage() {
    if (page > 1) setPage((page -= 1));
  }

  function handleSubmit(data) {
    dispatch(addAnswerRequest({ ...data, id: helpSelected.id }));
  }
  /* async function handleDelete(event, id) {
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
  } */
  /* function handleCadastrar() {
    // console.log('redirecionar');
    // history.push('/addstudents');
    // return <Redirect to="/addstudents" />;
  } */
  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal(id) {
    const { question, student, answer, answer_at } = helporders.find(
      item => item.id === id
    );

    setHelpSelected({
      id,
      question,
      student: student.name,
      answer,
      answer_at,
    });

    setModalIsOpen(true);
  }

  // https://www.npmjs.com/package/react-modal#examples
  // https://www.google.com/search?client=firefox-b-d&ei=b6MIXpTrGOKj5OUPv5iWoAU&q=css+button+disabled&oq=css+button+disabled&gs_l=psy-ab.3..0l2j0i22i30l2j0i22i10i30j0i22i30l2j0i22i10i30j0i22i30l2.235941.241977..242096...6.2..0.135.2363.9j14......0....1..gws-wiz.......0i71j0i13j0i13i30j0i67.BTzMvIjTBYo&ved=0ahUKEwjU3sr-9NrmAhXiEbkGHT-MBVQQ4dUDCAo&uact=5

  return (
    <Container>
      <Content>
        <nav>
          <h1>Pedidos de Auxílio</h1>
        </nav>
        <aside />
        <ReactModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          help={helpSelected}
          handleSubmit={handleSubmit}
        />
        <Lista>
          <table>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td>RESPONDIDO</td>
                <td> </td>
              </tr>
            </thead>
            <tbody>
              {helporders.map(helporder => (
                <tr key={helporder.id}>
                  <td>{helporder.student.name}</td>
                  <td>
                    <MdCheckCircle
                      size={24}
                      color={helporder.answer_at ? '#42cb59' : '#dddddd'}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      color={helporder.answer_at == null ? '#000' : '#999'}
                      onClick={() => openModal(helporder.id)}
                    >
                      {helporder.answer_at ? 'ler resposta' : 'responder'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Lista>
        <MdChevronLeft onClick={handlePreviousPage} />
        <span>{pageFormatted}</span>
        <MdChevronRight onClick={handleNextPage} />
      </Content>
    </Container>
  );
}
