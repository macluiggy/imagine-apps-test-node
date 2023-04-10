import Sequelize from 'sequelize'
import { sequelize } from '../db'

const Clientes = sequelize.define('clientes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ncedula: {
    type: Sequelize.BIGINT
  },
  nombre: {
    type: Sequelize.TEXT,
  },
  apellido: {
    type: Sequelize.TEXT,
  },
  id_departamento: {
    type: Sequelize.INTEGER
  },
}, {
  timestamps: false,
})

export default Clientes