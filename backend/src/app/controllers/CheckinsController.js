// import * as Yup from 'yup';
import { subDays } from 'date-fns';
import sequelize, { Op } from 'sequelize';
import Checkin from '../models/Checkins';
import Student from '../models/Students';
import Registration from '../models/Registration';

class CheckinsController {
  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({
      where: {
        id,
      },
    });
    if (!student) {
      return res.status(400).json({
        error: 'Student not found',
      });
    }

    const registration = await Registration.findOne({
      where: {
        student_id: id,
        start_date: { [Op.lte]: new Date() },
        end_date: { [Op.gte]: new Date() },
      },
    });
    if (!registration) {
      return res.status(400).json({
        error: 'Student without registration',
      });
    }

    const listCheckins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (listCheckins.length > 5) {
      return res.status(400).json({
        error: 'Excess Checkin',
      });
    }

    try {
      const checkins = await Checkin.create({
        student_id: id,
      });
      return res.json(checkins);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    // console.log(`Consultando: ${id}`, new Date());

    // console.log('Página:', page);

    const checkins = await Checkin.findAndCountAll({
      attributes: ['id', 'created_at'],
      where: {
        student_id: id,
      },
      order: sequelize.literal('created_at DESC'), // ['created_at', 'DESC'],
      offset: (page - 1) * 6,
      limit: 6,
    });

    // console.log(checkins.count);

    return res.json(checkins);
    // return res.json();
  }

  async update(req, res) {
    return res.status(401).json({ error: 'Função não implementada' });
  }

  async delete(req, res) {
    return res.status(401).json({ error: 'Função não implementada' });
  }
}

export default new CheckinsController();
