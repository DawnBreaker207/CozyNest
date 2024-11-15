export default interface IArticle {
  _id: number
  title: string
  content: [
    {
      heading: string,
      paragraph:string,
      images: [
        {
          url: string,
          caption: string
        }
      ]
    }
  ],
  author: string,
  created_at: string
  updated_at: string
}