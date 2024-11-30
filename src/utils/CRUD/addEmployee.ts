'use server'
import { EmployeeFormData } from '@/types'
import prisma from '../../../lib/prismaClient'

export const addEmployee = async (employee: EmployeeFormData) => {
  try {
    const { fullName, cuil, email, legajo } = employee

    if (!fullName || !cuil || !email || !legajo) {
      throw new Error('Name, cuil, email or legajo is missing')
    }

    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [{ email }, { legajo }]
      }
    })

    if (existingEmployee) {
      throw new Error('Email or legajo already exist')
    }

    const newEmployee = await prisma.employee.create({
      data: {
        fullName,
        cuil,
        email,
        legajo
      }
    })
    return newEmployee
  } catch (error) {
    console.error('Error adding employee:', error)
    throw error
  }
}
