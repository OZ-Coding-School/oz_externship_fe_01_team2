export const getFullDate = (createdAt: string) => {
  const date = new Date(createdAt)

  const formatted = `${date.getFullYear()}년 ${String(
    date.getMonth() + 1
  ).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`

  return formatted
}
