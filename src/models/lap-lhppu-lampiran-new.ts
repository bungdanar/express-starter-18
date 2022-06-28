import * as Sequelize from 'sequelize'
import { Association, DataTypes, Model, Optional } from 'sequelize'
import type { LapLhppu } from './lap-lhppu'

export interface LapLhppuLampiranNewAttributes {
  id: number
  temuan: string
  sebab: string | null
  akibat: string | null
  rekomendasi: string
  kode_satker_uki: string
  tahun: number
  createdAt: Date
  updatedAt: Date
  id_lhppu: number
}

export type LapLhppuLampiranNewPk = 'id'
export type LapLhppuLampiranNewId = LapLhppuLampiranNew[LapLhppuLampiranNewPk]
export type LapLhppuLampiranNewOptionalAttributes = 'id' | 'sebab' | 'akibat'

export type LapLhppuLampiranNewCreationAttributes = Optional<
  LapLhppuLampiranNewAttributes,
  LapLhppuLampiranNewOptionalAttributes
>

export class LapLhppuLampiranNew
  extends Model<
    LapLhppuLampiranNewAttributes,
    LapLhppuLampiranNewCreationAttributes
  >
  implements LapLhppuLampiranNewAttributes
{
  id!: number
  temuan!: string
  sebab!: string | null
  akibat!: string | null
  rekomendasi!: string
  kode_satker_uki!: string
  tahun!: number
  createdAt!: Date
  updatedAt!: Date
  id_lhppu!: number

  lhppu?: LapLhppu

  static associations: {
    lhppu: Association<LapLhppuLampiranNew, LapLhppu>
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof LapLhppuLampiranNew {
    return LapLhppuLampiranNew.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        temuan: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        sebab: {
          type: DataTypes.STRING(3000),
          allowNull: true,
        },
        akibat: {
          type: DataTypes.STRING(3000),
          allowNull: true,
        },
        rekomendasi: {
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        kode_satker_uki: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        tahun: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_lhppu: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'lap_lhppu',
            key: 'id',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'lap_lhppu_lampiran_new',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'lap_lhppu_lampiran_new_ibfk_1',
            using: 'BTREE',
            fields: [{ name: 'id_lhppu' }],
          },
        ],
      }
    )
  }
}
