import validator from 'validator'

export class CustomJoi {
  static escapeHtml = (value: any) => validator.escape(value)
}
