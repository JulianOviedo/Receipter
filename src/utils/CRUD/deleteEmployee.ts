'use server'

import prisma from '../../../lib/prismaClient'

export const deleteEmployee = async (employeeEmail: string) => {
  try {
    await prisma.employee.delete({
      where: {
        email: employeeEmail
      }
    })
  } catch (error) {
    console.error('Error adding employee:', error)
    throw error
  }
}
