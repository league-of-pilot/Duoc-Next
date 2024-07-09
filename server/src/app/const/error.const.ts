export const ERR_CODE = {
  ZOD: 422,
  UNHANDLED: 555
} as const

export const PRISMA_ERR_CODE = {
  UNIQUE_CONSTRAINT_VIOLATION: 'P2002',
  RECORD_NOT_FOUND: 'P2025'
} as const
