// utils/transformQnaData.ts
export const transformQnaData = (results: any[]) => {
  const formatRelativeTime = (isoTime: string) => {
    const diffMs = new Date().getTime() - new Date(isoTime).getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    return diffHours < 1 ? '방금 전' : `${diffHours}시간 전`
  }

  return results.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    category: item.category.depth_1,
    subCategory: item.category.depth_2,
    language: item.category.depth_3,
    answerCount: item.answer_count,
    viewCount: item.view_count,
    nickname: item.author.nickname,
    time: formatRelativeTime(item.created_at),
    thumbnail: item.thumbnail,
  }))
}
