export default interface IArticle {
  _id?: string | number
  title: string
  thumbnail: string
  content: [
    {
      heading: string
      paragraph: string
      images: [
        {
          url: string
          caption: string
        }
      ]
    }
  ]
  author: string
  author_id: string
  isHidden: boolean
  created_at: string
  updated_at: string
}
