/* eslint-disable @typescript-eslint/no-explicit-any */
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
type ExportData = Record<string, any>
const userExportExcel = () => {
  const exportToExcel = (data: ExportData[], fileName = 'export', sheetName = 'Sheet1') => {
    if (!Array.isArray(data) || !data.length) {
      console.error('No data to export')
      return
    }

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `${fileName}.xlsx`)
  }
  return { exportToExcel }
}

export default userExportExcel
