import instance from '@/configs/axios'
import { IProduct } from '@/types/product'
import { IQuery, ResAPI } from '@/types/responseApi'

// Lấy tất cả sản phẩm
export const getAllProducts = async (params?: Partial<IQuery>) => {
  try {
    const { data } = await instance.get<ResAPI<IProduct[]>>('/products', { params })

    return data
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error)
    throw error
  }
}

// Lấy thông tin sản phẩm theo ID
export const getProductById = async (id: number | string) => {
  try {
    const { data } = await instance.get(`/products/${id}`)
    return data
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error)
    throw error
  }
}

// Thêm sản phẩm mới

export const addProduct = async (product: Partial<IProduct>) => {
  try {
    const { data } = await instance.post<ResAPI<IProduct>>(`/products`, product)
    return data
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error)
    throw error
  }
}

// Xóa sản phẩm
export const removeProduct = async (product: Partial<IProduct>): Promise<void> => {
  try {
    await instance.delete(`/products/${product._id}`)
    return
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error)
    throw error
  }
}

export const editProduct = async (product: Partial<IProduct>) => {
  if (!product._id) {
    throw new Error('Id not exist') // Trả về null nếu không có _id
  }

  try {
    const { data } = await instance.put<ResAPI<IProduct>>(`/products/${product._id}`, product)
    return data
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error)
    throw error
  }
}

export const deleteOption = async (input?: { id: string; optionId: string | undefined }) => {
  try {
    await instance.delete(`/options/${input?.id}/${input?.optionId}`)
  } catch (error) {
    // Hiển thị lỗi nếu có
    console.error('Failed to delete color:', error)
    throw error
  }
}
