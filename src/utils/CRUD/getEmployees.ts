'use server'

import { Employee } from '@prisma/client'
import prisma from '../../../lib/prismaClient'

export const getEmployees = async () => {
  try {
    const employees: Employee[] = await prisma.employee.findMany()
    return employees
  } catch (error) {
    console.error('Error fetching employees:', error)
    return []
  }
}
