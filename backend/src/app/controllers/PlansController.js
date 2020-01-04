import * as Yup from 'yup';
import { Op } from 'sequelize';
import Plans from '../models/Plans';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Entre com o Título do Plano'),
      duration: Yup.number('A Duração deve ser um número').required(
        'Entre com a Duração do Plano em Meses'
      ),
      price: Yup.number('O Preço deve ser um valor numérico').required(
        'Entre com o valor do Plano'
      ),
    });

    try {
      const isValidSchema = schema.validateSync(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    const { title, duration, price } = req.body;

    try {
      const plan = await Plans.create({
        title,
        duration,
        price,
      });
      return res.json(plan);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async index(req, res) {
    const { page = 1, title = '' } = req.query;
    const { id } = req.params;

    if (id && id !== 'undefined') {
      // console.log(`Pesquisando por estudante: ${id}`);
      const plans = await Plans.findByPk(id);
      return res.json(plans);
    }

    if (title) {
      // console.log(`Pesquisando por estudante: ${name}`);
      const plans = await Plans.findAll({
        attributes: ['id', 'title', 'duration', 'price'],
        order: ['title'],
        offset: (page - 1) * 5,
        limit: 5,
        where: {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        },
      });
      // console.tron.log(students);
      // console.log(students);
      return res.json(plans);
    }
    // console.log(`Pesquisando por estudante`);
    const plans = await Plans.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['title'],
      offset: (page - 1) * 5,
      limit: 5,
    });
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Entre com o Título do Plano'),
      duration: Yup.number('A Duração deve ser um número').required(
        'Entre com a Duração do Plano em Meses'
      ),
      price: Yup.number('O Preço deve ser um valor numérico').required(
        'Entre com o valor do Plano'
      ),
    });

    const planExists = await Plans.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!planExists) {
      res.status(400).json({ error: 'Não existe o Plano' });
    }

    const { id, title, duration, price } = await planExists.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    // const plan = await Plans.findByPk(req.params.id);
    try {
      await Plans.destroy({
        where: { id: req.params.id },
      });
      return res.json();
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}

export default new PlansController();
