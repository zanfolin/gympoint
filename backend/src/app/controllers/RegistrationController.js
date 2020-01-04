import * as Yup from 'yup';
import { parseISO, addMonths, isPast, isBefore, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Registration from '../models/Registration';
import Student from '../models/Students';
import Plan from '../models/Plans';
import Mail from '../../lib/Mail';

class RegistrationController {
  async store(req, res) {
    // console.log('Chegou na função');
    const schema = Yup.object().shape({
      student_id: Yup.number().required('Indique o Estudante'),
      plan_id: Yup.number().required('Indique o Plano'),
      start_date: Yup.date().required('Indique o Início das aulas'),
    });

    try {
      const isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    console.log(req.body);

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({
        error: 'Plano não encontrado',
      });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({
        error: 'Aluno não encontrado',
      });
    }

    if (isBefore(parseISO(start_date), subDays(new Date(), 1))) {
      return res.status(400).json({
        error: 'Início antes da data atual',
      });
    }

    const activeRegistration = await Registration.findOne({
      where: {
        student_id,
        end_date: { [Op.gte]: new Date() },
      },
    });

    if (activeRegistration) {
      if (isBefore(parseISO(start_date), activeRegistration.end_date)) {
        return res.status(400).json({
          error: 'Aluno com Matrícula Ativa e com início antes do término',
          activeRegistration,
        });
      }
    }

    try {
      const registration = await Registration.create({
        student_id,
        plan_id,
        start_date,
        end_date: subDays(addMonths(parseISO(start_date), plan.duration), 1),
        price: plan.price * plan.duration,
      });

      await Mail.sendMail({
        to: `${student.name} <${student.email}>`,
        subject: 'Detalhes da Matrícula',
        text: `Plano: ${plan.title} \r\n\r\n Data de Início: ${registration.start_date} \r\n\r\n Data Final: ${registration.end_date} \r\n\r\n Valor pelo Período: ${registration.price}`,
      });

      return res.json(registration);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async index(req, res) {
    const { page = 1, name = '' } = req.query;
    const { id } = req.params;
    // console.log(`Buscando por ${id}`);
    if (id) {
      const registrations = await Registration.findAll({
        attributes: [
          'id',
          'student_id',
          'plan_id',
          'start_date',
          'end_date',
          'price',
        ],
        where: { id },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name'],
          },
          {
            model: Plan,
            as: 'plan',

            attributes: ['title'],
          },
        ],
      });
      // console.log(registrations);
      return res.json(registrations);
    }

    if (name) {
      const registrations = await Registration.findAll({
        attributes: [
          'id',
          'student_id',
          'plan_id',
          'start_date',
          'end_date',
          'price',
          'active',
        ],
        order: [['created_at', 'DESC']],
        offset: (page - 1) * 20,
        limit: 20,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name'],
            where: {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
          },
          {
            model: Plan,
            as: 'plan',

            attributes: ['title'],
          },
        ],
      });
      return res.json(registrations);
    }
    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      order: [['created_at', 'DESC']],
      offset: (page - 1) * 20,
      limit: 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',

          attributes: ['title'],
        },
      ],
    });
    return res.json(registrations);
  }

  async update(req, res) {
    console.log('Chegou na função de atualizar Matrículas');
    const schema = Yup.object().shape({
      student_id: Yup.number().required('Indique o Estudante'),
      plan_id: Yup.number().required('Indique o Plano'),
      start_date: Yup.date().required('Indique o Início das aulas'),
    });

    try {
      const isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    console.log({ id, student_id, plan_id, start_date });

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({
        error: 'Plano não encontrado',
      });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({
        error: 'Aluno não encontrado',
      });
    }

    if (isBefore(parseISO(start_date), subDays(new Date(), 1))) {
      return res.status(400).json({
        error: 'Início antes da data atual',
      });
    }

    const activeRegistration = await Registration.findOne({
      where: {
        student_id,
        end_date: { [Op.gte]: new Date() },
        id: { [Op.ne]: id },
      },
    });

    if (activeRegistration) {
      if (isBefore(parseISO(start_date), activeRegistration.end_date)) {
        return res.status(400).json({
          error: 'Aluno com Matrícula Ativa e com início antes do término',
          activeRegistration,
        });
      }
    }

    const registrationExists = await Registration.findOne({
      where: {
        id,
      },
    });

    if (!registrationExists) {
      res.status(400).json({ error: 'Não existe Matrícula' });
    }

    try {
      const { end_date, price } = await registrationExists.update({
        id,
        student_id,
        plan_id,
        start_date,
        end_date: subDays(addMonths(parseISO(start_date), plan.duration), 1),
        price: plan.price * plan.duration,
      });

      await Mail.sendMail({
        to: `${student.name} <${student.email}>`,
        subject: 'Atualização do Plano',
        text: `Plano: ${plan.title} \r\n\r\n Data de Início: ${start_date} \r\n\r\n Data Final: ${end_date} \r\n\r\n Valor pelo Período: ${price}`,
      });

      return res.json({
        id,
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async delete(req, res) {
    try {
      await Registration.destroy({
        where: { id: req.params.id },
      });
      return res.json();
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}

export default new RegistrationController();
