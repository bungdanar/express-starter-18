import { Op, Order, WhereOptions } from 'sequelize'
import { ModelQuery, QueryOperator } from '../data-types/model-query'

export class QueryBuilder {
  private static generateOrderColumn(value: string): [string, string] {
    const splittedValue = value.replace(/ +/g, '').split(':')
    return [splittedValue[0], splittedValue[1]]
  }

  private static generateMultiSortQuery(sortValues: string | string[]): Order {
    let order: Order = []
    if (Array.isArray(sortValues)) {
      order = sortValues.map(this.generateOrderColumn)
    } else {
      order.push(this.generateOrderColumn(sortValues))
    }

    return order
  }

  static buildWhereQuery<T>(value: QueryOperator<T>) {
    if (value.eq !== undefined) {
      return {
        [Op.eq]: value.eq,
      }
    }

    if (value.lt !== undefined) {
      return {
        [Op.lt]: value.lt,
      }
    }

    if (value.lte !== undefined) {
      return {
        [Op.lte]: value.lte,
      }
    }

    if (value.gt !== undefined) {
      return {
        [Op.gt]: value.gt,
      }
    }

    if (value.gte !== undefined) {
      return {
        [Op.gte]: value.gte,
      }
    }

    if (value.ne !== undefined) {
      return {
        [Op.ne]: value.ne,
      }
    }

    if (value.in !== undefined) {
      return {
        [Op.in]: value.in,
      }
    }

    if (value.nin !== undefined) {
      return {
        [Op.notIn]: value.nin,
      }
    }

    if (value.contains !== undefined) {
      return {
        [Op.substring]: value.contains,
      }
    }

    if (value.startsWith !== undefined) {
      return {
        [Op.startsWith]: value.startsWith,
      }
    }
  }

  static buildOrderQuery(
    sort: string | string[] | undefined
  ): Order | undefined {
    let order: Order | undefined = undefined

    if (sort !== undefined) {
      order = this.generateMultiSortQuery(sort)
    }

    return order
  }

  static buildLimitQuery(limit: number = 1000) {
    return limit
  }

  static buildOffsetQuery(offset: number = 0) {
    return offset
  }

  static buildWhereQueryAuto<TModelAttributes>(
    query: ModelQuery<TModelAttributes>
  ): WhereOptions<TModelAttributes> {
    let where: WhereOptions<TModelAttributes> = {}

    for (let key in query) {
      if (query[key] !== undefined) {
        where = {
          ...where,
          [key]: this.buildWhereQuery(query[key]),
        }
      }
    }

    return where
  }
}
