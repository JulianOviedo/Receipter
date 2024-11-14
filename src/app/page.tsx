'use client'
import { getEmployees } from '@/utils/CRUD/getEmployees'
import { Employee } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import SkeletonEmployees from './components/EmployeeSkeleton'
import { Title } from './components/Title'
import AddEmployeeForm from './components/AddEmployeeForm'
import { ReceiptInput } from './components/ReceiptInput'

export default function Home () {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesData = await getEmployees()
      setEmployees(employeesData)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchEmployees()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files))
    }
  }

  const handleSendReceipts = async () => {
    for (const file of selectedFiles) {
      // Extraer el legajo del nombre del archivo
      const match = file.name.match(/(\d+)\.PDF$/i)
      const legajo = match ? parseInt(match[1], 10) : null

      if (legajo) {
        // Buscar el empleado con el legajo correspondiente
        const employee = employees.find((emp) => emp.legajo === legajo)
        console.log(employee)

        if (employee?.email) {
          // Crear un FormData para enviar el archivo
          const formData = new FormData()
          formData.append('file', file)
          formData.append('email', employee.email)

          try {
            const response = await fetch('/api/send-receipt', {
              method: 'POST',
              body: formData
            })

            if (!response.ok) {
              console.error('Error al enviar el recibo:', response.statusText)
            } else {
              console.log(`Recibo enviado a ${employee.email}`)
            }
          } catch (error) {
            console.error('Error al enviar el recibo:', error)
          }
        }
      }
    }
  }

  return (
    <main className="grid grid-cols-2 gap-8 w-full h-full items-center justify-items-center p-5">
      <div>
        <Title
          title="CEFTY RECEIPT GUN"
          subtitle="Please add here the receipts you want to deliver"
        />
        <ReceiptInput handleFileChange={handleFileChange} selectedFiles={selectedFiles}/>
        <AddEmployeeForm />
      </div>

      <div>
        {employees.length === 0 && <SkeletonEmployees />}
        <Title title="Your Employees" component="h2" />
        {employees?.map(({ id, name, email }) => (
          <div key={id}>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        ))}

        <button onClick={handleSendReceipts}>SHOT</button>
      </div>
    </main>
  )
}
