'use client'
import { getEmployees } from '@/utils/CRUD/getEmployees';
import { Employee } from '@prisma/client';
import React, { useEffect, useState } from 'react'

export default function Home () {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesData = await getEmployees(); // Llamada a la API
      setEmployees(employeesData); // Establecer el estado con los empleados
    };

    fetchEmployees();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if ((files != null) && files.length > 0) {
      setSelectedFiles(Array.from(files))

      Array.from(files).forEach((file) => {
        const match = file.name.match(/(\d+)\.PDF$/i)

        const legajo = match ? parseInt(match[1], 10) : null
        console.log(legajo)
      })
    }
  }

  const handleSendReceipts = () => {
    console.log('Sending receipts...')
  }

  return (
    <main className="flex justify-center items-center gap-8 w-full h-full flex-col">
      <h1>CEFYT RECEIPT GUN</h1>
      <p>Please add here the receipts you want to deliver</p>

      <div className="flex items-center justify-center w-full">
        <label
          className="flex flex-col items-center justify-center w-[600px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          htmlFor="dropzone-file"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Receipts PDFs
            </p>
          </div>
          <input
            id="dropzone-file"
            multiple
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Mostrar la cantidad de archivos cargados */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-col items-center mt-4">
          <p className="text-sm text-green-600 dark:text-green-400">
            {selectedFiles.length} archivo(s) subido(s) correctamente
          </p>
        </div>
      )}

      <h1>Employees</h1>
      {employees && employees.map(({id, name, email}) => (
        <div key={id}>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      ))}

      <button onClick={handleSendReceipts}>SHOT</button>
    </main>
  )
}
