export const getEmployees = async () => {
  try {
    const response = await fetch('/api/employees')

    // Verificar que la respuesta sea exitosa (código 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch employees')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching employees:', error)
    return []
  }
}
