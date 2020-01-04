import { Model, Sequelize } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        /* student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER, */
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    console.log('====================================');
    console.log(models.Students);
    console.log('====================================');
    console.log(models.Plans);
    console.log('====================================');
    this.belongsTo(models.Students, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsTo(models.Plans, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
