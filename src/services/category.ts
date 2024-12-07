import instance from '@/configs/axios' // instance của axios
import { ICategory } from '@/types/category'
import { IQuery } from '@/types/responseApi'

// Lấy tất cả danh mục (categories)
export const getAllCategories = async (params?: Partial<IQuery>) => {
  try {
    const { data } = await instance.get('/categories', { params })
    return data
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error)
    throw error
  }
}

// Lấy thông tin danh mục theo ID
export const getCategoryById = async (id: number | string | undefined) => {
  try {
    const { data } = await instance.get(`/categories/${id}`, {})
    return data.res
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Thêm một danh mục
export const addCategory = async (category: Partial<ICategory>) => {
  try {
    const { data } = await instance.post('/categories', category)
    return data.res
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Xóa một danh mục
export const removeCategory = async (category: Partial<ICategory>): Promise<void> => {
  try {
    await instance.patch(`/categories/${category._id}`)
    return
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Cập nhật một danh mục
export const editCategory = async (category: Partial<ICategory>) => {
  try {
    const response = await instance.put(`/categories/${category?._id}`, category, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
