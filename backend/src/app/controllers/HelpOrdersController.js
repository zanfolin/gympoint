import * as Yup from 'yup';
import Student from '../models/Students';
import HelpOrder from '../models/HelpOrders';
import Mail from '../../lib/Mail';

class HelpOrdersController {
  async store(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      question: Yup.string('A Resposta deve ser um Texto')
        .required('Entre com o Texto')
        .min(20)
        .max(255, 'A resposta deve ter no máximo 255 caracteres'),
    });

    try {
      const isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const student = await Student.findOne({
      where: {
        id,
      },
    });
    if (!student) {
      return res.status(400).json({
        error: 'Aluno não encontrado',
      });
    }

    const { question } = req.body;
    try {
      const help_orders = await HelpOrder.create({
        student_id: id,
        question,
      });
      return res.json(help_orders);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;
    const list = req.url.indexOf('list') > -1;
    console.log('====================================');
    console.log(req.url);
    console.log('====================================');
    console.log(list);
    console.log('====================================');
    if (id && !list) {
      console.log('Pesquisando apenas por ID');
      const help_orders = await HelpOrder.findOne({
        attributes: [
          'id',
          'student_id',
          'question',
          'answer',
          'answer_at',
          'created_at',
        ],
        where: {
          student_id: id,
        },
        order: [
          ['answer_at', 'DESC'],
          ['created_at', 'DESC'],
        ],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name'],
          },
        ],
      });
      return res.json(help_orders);
    }

    if (id && list) {
      console.log('Pesquisando apenas por Lista de IDs');
      const help_orders = await HelpOrder.findAndCountAll({
        attributes: [
          'id',
          'student_id',
          'question',
          'answer',
          'answer_at',
          'created_at',
        ],
        where: {
          student_id: id,
        },
        order: [
          ['answer_at', 'DESC'],
          ['created_at', 'DESC'],
        ],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name'],
          },
        ],
        offset: (page - 1) * 2,
        limit: 2,
      });
      return res.json(help_orders);
    }
    console.log('Todos os outros casos');
    const help_orders = await HelpOrder.findAndCountAll({
      attributes: [
        'id',
        'student_id',
        'question',
        'answer',
        'answer_at',
        'created_at',
      ],
      order: [
        ['answer_at', 'DESC'],
        ['created_at', 'DESC'],
      ],
      offset: (page - 1) * 20,
      limit: 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });
    return res.json(help_orders);
    // return res.status(401).json({ error: 'Função não implementada' });
  }

  async update(req, res) {
    const { id } = req.params;
    // console.log(`===============>>> Entrou na função para o PA ${id}`);

    const schema = Yup.object().shape({
      answer: Yup.string('A Resposta deve ser um Texto')
        .required('Entre com o Texto')
        .min(20)
        .max(255, 'A resposta deve ter no máximo 255 caracteres'),
    });

    try {
      schema.validateSync(req.body);
    } catch (e) {
      console.log('validateSync() errored', e.errors || e);
      return res.status(400).json({ error: e.errors || e });
    }

    const helpOrderExists = await HelpOrder.findByPk(id);

    if (!helpOrderExists) {
      res.status(400).json({ error: 'Não existe o Pedido de Auxílio' });
    }

    const { answer } = req.body;

    await helpOrderExists.update({
      answer,
      answer_at: new Date(),
    });

    return res.json(helpOrderExists);
  }

  async delete(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      answer: Yup.string('O Nome deve ser um texto')
        .required('Entre com o nome')
        .min(20),
    });

    try {
      const isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const question = await HelpOrder.findByPk(id);
    if (!question) {
      return res.status(400).json({ error: 'Pedido de Ajuda não encontrado' });
    }

    const student = await Student.findByPk(question.student_id);
    if (!student) {
      return res.status(400).json({
        error: 'Aluno não encontrado',
      });
    }

    if (question.answer_at) {
      return res.status(400).json({
        error: 'Pergunta já respondida anteriormente',
      });
    }

    const { answer } = req.body;

    question.answer = answer;
    question.answer_at = new Date();

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta da Pergunta',
      text: `Pergunta: ${question.question} \r\n\r\n Resposta: ${question.answer}`,
    });

    await question.save();

    res.json(question);
  }
}

export default new HelpOrdersController();
