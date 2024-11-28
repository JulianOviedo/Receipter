import { EmployeeFormData } from '@/types'

export const editEmployee = async (employee: EmployeeFormData): Promise<Response> => {
  try {
    const response = await fetch('http://localhost:3000/api/edit-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to edit employee')
    }

    return response
  } catch (error) {
    console.error('Error editing employee:', error)
    throw error
  }
}
