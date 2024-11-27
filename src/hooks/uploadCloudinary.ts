import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// TODO: fix
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const uploadFileCloudinary = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'cozynest-upload') // Thay bằng upload preset của bạn
    formData.append('folder', 'CozyNest')
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/didbnrsmz/upload', // Thay bằng cloudinary name của bạn
      formData
    )
    return data.url
  } catch (error) {
    // handle error here
    console.error(error)
    throw error
  }
}

export { uploadFileCloudinary }
