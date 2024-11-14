import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismaClient'
import { Employee } from '@prisma/client'

// Deshabilitar el bodyParser de Next.js
export const config = {
  api: {
    bodyParser: false
  }
}

export async function GET () {
  try {
    const employees: Employee[] = await prisma.employee.findMany()
    return NextResponse.json(employees, { status: 200 })
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json({ error: 'Error fetching employees' }, { status: 500 })
  }
}