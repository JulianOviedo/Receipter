export const deleteEmployee = async (employeeEmail: string): Promise<Response> => {
  try {
    const response = await fetch('http://localhost:3000/api/delete-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: employeeEmail })
    })
    if (!response.ok) {
      throw new Error('Failed to delete employee')
    }

    return response
  } catch (error) {
    console.error('Error adding employee:', error)
    throw error
  }
}
