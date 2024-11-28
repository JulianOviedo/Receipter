import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismaClient'

export async function POST (request: Request) {
  try {
    const { id, email, fullName, cuil, legajo } = await request.json()

    if (!id) {
      console.error('Employee ID is missing')
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      )
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
      return NextResponse.json(
        { error: 'Email or Legajo already exists' },
        { status: 409 }
      )
    }

    const updateUser = await prisma.employee.update({
      where: {
        id // Usamos el id como clave única para la actualización
      },
      data: {
        email,
        fullName,
        cuil,
        legajo
      }
    })

    return NextResponse.json(updateUser, { status: 200 }) // Respuesta con éxito
  } catch (error) {
    console.error('Failed to update employee:', error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  }
}
