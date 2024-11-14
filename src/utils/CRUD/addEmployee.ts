import { Employee } from '@/types'

export const addEmployee = async (employee: Employee): Promise<Response> => {
  try {
    const response = await fetch('http://localhost:3000/api/add-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })

    if (!response.ok) {
      throw new Error('Failed to add employee')
    }

    return response
  } catch (error) {
    console.error('Error adding employee:', error)
    throw error
  }
}
