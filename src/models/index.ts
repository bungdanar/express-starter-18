import { Sequelize } from 'sequelize'
import {
  LapLhppu,
  LapLhppuAttributes,
  LapLhppuCreationAttributes,
} from './lap-lhppu'
import {
  LapLhppuLampiranNew,
  LapLhppuLampiranNewAttributes,
  LapLhppuLampiranNewCreationAttributes,
} from './lap-lhppu-lampiran-new'

export {
  LapLhppu,
  LapLhppuAttributes,
  LapLhppuCreationAttributes,
  LapLhppuLampiranNew,
  LapLhppuLampiranNewAttributes,
  LapLhppuLampiranNewCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
  LapLhppu.initModel(sequelize)
  LapLhppuLampiranNew.initModel(sequelize)

  LapLhppu.hasMany(LapLhppuLampiranNew, {
    sourceKey: 'id',
    foreignKey: 'id_lhppu',
    as: 'lampiran',
  })
  LapLhppuLampiranNew.belongsTo(LapLhppu, {
    targetKey: 'id',
    foreignKey: 'id_lhppu',
    as: 'lhppu',
  })
}
