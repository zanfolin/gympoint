import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(3),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const { id, name, email, provider } = await userExists.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { q } = req.query;
    const users = await User.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
      offset: (page - 1) * 20,
      limit: 20,
      where: q ? { name: { [Op.like]: `%${q}%` } } : null,
    });
    return res.json(users);
  }
}

export default new UserController();
