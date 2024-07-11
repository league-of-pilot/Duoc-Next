// Có thể dùng thư viện ms để truyền diff thoải mái hơn
export const diffNowHour = (expiresAt: Date, hour: number) => {
  const now = new Date()

  const differenceInMilliseconds = expiresAt.getTime() - now.getTime()
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

  return differenceInHours < hour
}
