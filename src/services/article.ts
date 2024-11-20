 // services/articleService.ts
import instance from '@/configs/axios';
import IArticle from '@/types/article';

// Lấy tất cả bài viết với các tham số lọc, phân trang nếu có
export const getAllArticles = async () => {
  try {
    const {data} = await instance.get('http://localhost:8888/api/v1/articles');
    return data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

// Lấy bài viết theo ID
export const getArticleById = async (id: number | string) => {
  try {
    const response = await instance.get(`http://localhost:8888/api/v1/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
};

// Thêm bài viết mới
export const addArticle = async (article: IArticle) => {
  try {
    const response = await instance.post('http://localhost:8888/api/v1/articles', article, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add article:', error);
    return null;
  }
};

// Xóa bài viết
export const removeArticle = async (article: IArticle) => {
  try {
    if (!article._id) throw new Error("Article ID is required for deletion");
    const response = await instance.delete(`http://localhost:8888/api/v1/articles/${article._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete article:', error);
    return null;
  }
};

// Cập nhật bài viết
 export const editArticle = async (article: IArticle) => {
  
  try {
    // Kiểm tra `_id` của bài viết
    if (!article._id) throw new Error("Article ID is required for editing");
    
    // Gửi yêu cầu PUT để cập nhật bài viết
    const {data} = await instance.put(
      `http://localhost:8888/api/v1/articles/${article?._id}`, // Sử dụng article._id
      article, // Truyền toàn bộ bài viết trong phần body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error('Failed to edit article:', error);
    throw error; // Nên ném lỗi để mutation xử lý
  }
};

