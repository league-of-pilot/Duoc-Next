export class EntityError extends Error {
  fields: { message: string; field: string }[]
  status = 422
  constructor(fields: { message: string; field: string }[]) {
    super('Lỗi xác thực dữ liệu')
    this.fields = fields
  }
}
