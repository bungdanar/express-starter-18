export type QueryOperator<TDataType> = {
  eq?: TDataType
  lt?: TDataType
  lte?: TDataType
  gt?: TDataType
  gte?: TDataType
  ne?: TDataType
  in?: TDataType[]
  nin?: TDataType[]
  contains?: TDataType
  startsWith?: TDataType
}

export type QueryPagination = {
  limit?: number
  offset?: number
  sort?: string | string[]
}

export type ModelQuery<TModelAttributes> = {
  [key in keyof Partial<TModelAttributes>]: QueryOperator<TModelAttributes[key]>
}

export type ModelQueryWithPagination<TModelAttributes> =
  ModelQuery<TModelAttributes> & QueryPagination
