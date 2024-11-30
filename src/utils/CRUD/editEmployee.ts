import { EmployeeFormData } from '@/types'

export const editEmployee = async (employee: EmployeeFormData): Promise<Response> => {
  try {
    const { id, email, fullName, cuil, legajo } = employee

    if (!id) {
      throw new Error('Id is missing')
    }

    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [
          { email },
          { legajo }
        ],
        NOT: {
          id
        }
      }
    })

    if (existingEmployee) {
      throw new Error('Email or Legajo already exists')
    }

    const updateUser = await prisma.employee.update({
      where: {
        id
      },
      data: {
        email,
        fullName,
        cuil,
        legajo
      }
    })

    return updateUser
  } catch (error) {
    console.error('Error editing employee:', error)
    throw error
  }
}
