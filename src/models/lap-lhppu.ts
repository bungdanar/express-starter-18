import * as Sequelize from 'sequelize'
import { Association, DataTypes, Model, Optional } from 'sequelize'
import type { LapLhppuLampiranNew } from './lap-lhppu-lampiran-new'

export interface LapLhppuAttributes {
  id: number
  bln_akhir: number
  kode_satker_uki: string
  status: string
  info_tambahan: string | null
  tahun: number
  createdAt: Date
  updatedAt: Date
}

export type LapLhppuPk = 'id'
export type LapLhppuId = LapLhppu[LapLhppuPk]
export type LapLhppuOptionalAttributes = 'id' | 'info_tambahan'

export type LapLhppuCreationAttributes = Optional<
  LapLhppuAttributes,
  LapLhppuOptionalAttributes
>

export class LapLhppu
  extends Model<LapLhppuAttributes, LapLhppuCreationAttributes>
  implements LapLhppuAttributes
{
  id!: number
  bln_akhir!: number
  kode_satker_uki!: string
  status!: string
  info_tambahan!: string | null
  tahun!: number
  createdAt!: Date
  updatedAt!: Date

  lampiran?: LapLhppuLampiranNew[]

  static associations: {
    lampiran: Association<LapLhppu, LapLhppuLampiranNew>
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof LapLhppu {
    return LapLhppu.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        bln_akhir: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kode_satker_uki: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        info_tambahan: {
          type: DataTypes.STRING(10000),
          allowNull: true,
        },
        tahun: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        tableName: 'lap_lhppu',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'query_lap_lhppu',
            using: 'BTREE',
            fields: [
              { name: 'kode_satker_uki' },
              { name: 'bln_akhir' },
              { name: 'tahun' },
            ],
          },
        ],
      }
    )
  }
}
