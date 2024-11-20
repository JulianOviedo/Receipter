/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'
import React, { useState } from 'react'
import { ReceiptInput } from './components/ReceiptInput'
import toast from 'react-hot-toast'
import { useEmployees } from './context'
import Footer from './components/Footer'

export default function Home () {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { employees } = useEmployees()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files))
      toast.success('Files uploaded successfully!', {
        duration: 3000,
        position: 'bottom-right'
      })
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

          toast.promise(
            fetch('/api/send-receipt', {
              method: 'POST',
              body: formData
            })
              .then(async (response) => {
                if (!response.ok) {
                  const errorMessage = await response.text()
                  throw new Error(errorMessage || response.statusText)
                }
                return 'Recibo(s) enviado(s)'
              }),
            {
              loading: 'Enviando recibo(s)...',
              success: (message) => message,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              error: (err) => `Error al enviar el recibo: ${err.message}`
            }
          )
        }
      }
    }
  }

  return (
    <main>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl py-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-3">
            Receipt
          </span>
          GUN
        </h1>
        <ReceiptInput
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
        />
        <button
          disabled={employees.length < 0}
          className="shadow-md text-2xl bg-green-500 rounded-[50%] p-16 text-green-850 hover:bg-green-800 transition-all delay-50 hover:shadow-2xl hover:text-green-300"
          onClick={handleSendReceipts}
        >
          Shot Receipts
        </button>
      <Footer className='justify-end w-full'/>
      </div>
    </main>
  )
}
