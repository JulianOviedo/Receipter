import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismaClient'

export async function POST (request: Request) {
  try {
    const { email } = await request.json()

    const deleteUser = await prisma.employee.delete({
      where: {
        email
      }
    })

    return NextResponse.json(deleteUser, { status: 201 })
  } catch (error) {
    console.error('Failed to delete employee:', error)
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    )
  }
}
