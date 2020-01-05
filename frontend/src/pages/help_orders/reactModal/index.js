import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Container, Lista, Content } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    minWidth: '500px',
    maxHeight: '500px',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
};

const schema = Yup.object().shape({
  answer: Yup.string()
    .max(255, 'Entre com no máximo 255 caracteres')
    .required('Insira uma resposta para o aluno.'),
});

export default function HelpModal({
  modalIsOpen,
  closeModal,
  help,
  handleSubmit,
}) {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Container>
      <Content>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <Lista>
            <Form onSubmit={handleSubmit} schema={schema}>
              <table>
                <thead>
                  <tr>
                    <td>
                      <span>
                        <strong>ALUNO</strong>
                      </span>
                      <br /> {help.student}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span>
                        <strong>PERGUNTA</strong>
                      </span>
                      <br />
                      {help.question}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        <strong>SUA RESPOSTA</strong>
                      </span>
                      <br />
                      <Input
                        name="answer"
                        multiline
                        value={help.answer}
                        disabled={help.answer_at}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button type="submit" disabled={help.answer_at}>
                        Responder aluno
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </Lista>
        </Modal>
      </Content>
    </Container>
  );
}

HelpModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  help: PropTypes.object.isRequired,
};
