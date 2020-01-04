import { Model, Sequelize } from 'sequelize';
import { differenceInYears } from 'date-fns';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.DATE,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        age_number: {
          type: Sequelize.VIRTUAL(Sequelize.INTEGER, ['age']),
          get() {
            return differenceInYears(new Date(), this.get('age'));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {}
}

export default Students;
