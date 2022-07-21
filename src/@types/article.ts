export type TArticle = {
  id: string
  content?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  revisedAt?: string
  title?: string
  body?: string
  eye_catch?: TEyeCatche
  category?: TCategory
  tag?: string
}

export type TEyeCatche = {
  url: string
  height: number
  width: number
}

export type TCategory = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

// article template に渡される型
export type TdisplayArticleData = TArticle & {
  console?: string
  isPreview: boolean
}
