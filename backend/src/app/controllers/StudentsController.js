import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Students from '../models/Students';

class StudentsController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string('O Nome deve ser um texto').required('Entre com o nome'),
      email: Yup.string('O email deve ser um texto')
        .email('E-mail inválido')
        .required('Entre com o e-mail'),
      age: Yup.date('Entre com uma data na Idade').required(
        'Entre com a Idade'
      ),
      weight: Yup.number('O peso deve ser um número').required(
        'Entre com o Peso'
      ),
      height: Yup.number('A altura deve ser um número').required(
        'Entre com a altura'
      ),
    });

    let isValidSchema;
    try {
      isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      // console.log(e.message);
      return res.status(400).json({ error: e.message });
    }

    const { name, email, age, weight, height } = req.body;

    const student = await Students.create({
      name,
      email,
      age,
      weight,
      height,
    });

    return res.json(student);
    // return res.json();
  }

  async index(req, res) {
    const { page = 1, name = '' } = req.query;
    const { id } = req.params;

    if (id && id !== 'undefined') {
      console.log(`Pesquisando por estudante: ${id}`);
      const students = await Students.findByPk(id);
      return res.json(students);
    }

    if (name) {
      console.log(`Pesquisando por estudante: ${name}`);
      const students = await Students.findAll({
        attributes: [
          'id',
          'name',
          'email',
          'age',
          'weight',
          'height',
          'age_number',
        ],
        order: ['name'],
        offset: (page - 1) * 5,
        limit: 5,
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      // console.tron.log(students);
      // console.log(students);
      return res.json(students);
    }
    console.log(`Pesquisando por estudante`);
    const students = await Students.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'age',
        'weight',
        'height',
        'age_number',
      ],
      order: ['name'],
      offset: (page - 1) * 5,
      limit: 5,
    });
    return res.json(students);
  }

  async delete(req, res) {
    // const plan = await Plans.findByPk(req.params.id);
    try {
      await Students.destroy({
        where: { id: req.params.id },
      });
      return res.json();
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string('O Nome deve ser um texto').required('Entre com o nome'),

      age: Yup.date('Entre com uma data na Idade').required(
        'Entre com a Idade'
      ),
      weight: Yup.number('O peso deve ser um número').required(
        'Entre com o Peso'
      ),
      height: Yup.number('A altura deve ser um número').required(
        'Entre com a altura'
      ),
    });

    try {
      const isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const { age } = req.body;

    const newAge = parseISO(age);
    if (newAge === 'Invalid Date') {
      return res
        .status(400)
        .json({ error: 'Idade Inválida - Entre com uma data válida' });
    }

    const studentExist = await Students.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!studentExist) {
      return res.status(400).json({ error: 'Usuário não localizado' });
    }

    await studentExist.update(req.body);

    return res.json(studentExist);
  }
}

export default new StudentsController();
