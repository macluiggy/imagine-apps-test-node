import Sequelize from 'sequelize'
import { sequelize } from '../db'

const Usuarios = sequelize.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.TEXT,
  },
  username: {
    type: Sequelize.TEXT,
  },
  password: {
    type: Sequelize.TEXT,
  },
  email: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
})

export default Usuarios