const stripMarkdown = (markdown: string): string => {
  return (
    markdown
      .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지 마크다운 제거
      .replace(/\[.*?\]\(.*?\)/g, '') // 링크 마크다운 제거
      // eslint-disable-next-line no-useless-escape
      .replace(/[`*_>#~\-]/g, '') // 마크다운 기호 제거
      .replace(/<\/?[^>]+(>|$)/g, '') // 개선된 HTML 태그 제거
      .trim()
  )
}
export default stripMarkdown
