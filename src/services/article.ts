// services/articleService.ts
import instance from '@/configs/axios'
import IArticle from '@/types/article'
import { IQuery } from '@/types/responseApi'

// Lấy tất cả bài viết với các tham số lọc, phân trang nếu có
export const getAllArticles = async (params?: Partial<IQuery>) => {
  try {
    const { data } = await instance.get('/articles', { params })
    return data.res
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    throw error
  }
}

// Lấy bài viết theo ID
export const getArticleById = async (id: number | string | undefined) => {
  try {
    const { data } = await instance.get(`/articles/${id}`)
    return data.res
  } catch (error) {
    console.error('Failed to fetch article:', error)
    throw error
  }
}

// Thêm bài viết mới
export const addArticle = async (article: Partial<IArticle>) => {
  try {
    const { data } = await instance.post('/articles', article)
    return data.res
  } catch (error) {
    console.error('Failed to add article:', error)
    throw error
  }
}

// Xóa bài viết
export const removeArticle = async (article: Partial<IArticle>): Promise<void> => {
  try {
    if (!article._id) throw new Error('Article ID is required for deletion')
    await instance.delete(`/articles/${article._id}`)
  } catch (error) {
    console.error('Failed to delete article:', error)
    throw error
  }
}

// Cập nhật bài viết
export const editArticle = async (article: Partial<IArticle>) => {
  try {
    // Kiểm tra `_id` của bài viết
    if (!article._id) throw new Error('Article ID is required for editing')

    // Gửi yêu cầu PUT để cập nhật bài viết
    const { data } = await instance.put(
      `/articles/${article?._id}`, // Sử dụng article._id
      article // Truyền toàn bộ bài viết trong phần body
    )

    return data.res
  } catch (error) {
    console.error('Failed to edit article:', error)
    throw error // Nên ném lỗi để mutation xử lý
  }
}
