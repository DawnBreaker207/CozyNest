import instance from '@/configs/axios' // instance của axios
import { ICategory } from '@/types/category'
import { IQuery, ResAPI } from '@/types/responseApi'

// Cấu hình axios để gửi cookie trong mỗi request
instance.defaults.withCredentials = true // Đảm bảo gửi cookie đi cùng với yêu cầu

// Lấy tất cả danh mục (categories)
export const getAllCategories = async (params?: Partial<IQuery>) => {
  try {
    const { data } = await instance.get<ResAPI<ICategory[]>>('/categories', { params })
    return data.res
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error)
    throw error
  }
}

// Lấy thông tin danh mục theo ID
export const getCategoryById = async (id: number | string | undefined) => {
  try {
    const { data } = await instance.get<ResAPI<ICategory>>(`/categories/${id}`, {})
    return data.res
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Thêm một danh mục
export const addCategory = async (category: Partial<ICategory>) => {
  try {
    const { data } = await instance.post<ResAPI<ICategory>>('/categories', category)
    return data.res
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Xóa một danh mục
export const removeCategory = async (category: Partial<ICategory>): Promise<void> => {
  try {
    await instance.delete(`/categories/${category._id}`)
    return
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Cập nhật một danh mục
export const editCategory = async (category: Partial<ICategory>) => {
  try {
    const { data } = await instance.put<ResAPI<ICategory>>(`/categories/${category?._id}`, category)
    return data.res
  } catch (error) {
    console.log(error)
    throw error
  }
}
