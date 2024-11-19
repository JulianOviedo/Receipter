// app/api/employees/route.ts
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismaClient'

export async function POST (request: Request) {
  try {
    // Obtenemos los datos del empleado desde el cuerpo de la solicitud
    const { fullName, cuil, email, legajo } = await request.json()

    // Validación básica de los datos
    if (!fullName || !cuil || !email || !legajo) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Verificar si ya existe un empleado con el mismo email o legajo
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [{ email }, { legajo }]
      }
    })

    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Email or Legajo already exists' },
        { status: 409 }
      )
    }

    // Crear un nuevo empleado en la base de datos
    const newEmployee = await prisma.employee.create({
      data: {
        fullName,
        cuil,
        email,
        legajo
      }
    })

    // Responder con el nuevo empleado creado
    return NextResponse.json(newEmployee, { status: 201 })
  } catch (error) {
    console.error('Failed to create employee:', error)
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    )
  }
}
