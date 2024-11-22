export default interface IArticle {
  _id?: string | number
  res: any
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
  created_at: string
  updated_at: string
}
