
import { EmployeeFormData } from '@/types'
import { editEmployee } from '@/utils/CRUD/editEmployee'
import React, { useState } from 'react'
import { Title } from './Title'
import toast from 'react-hot-toast'

interface Props {
  employeeData: EmployeeFormData
  refetchEmployees: () => Promise<void>
  setIsEditModalOpen: (value: boolean) => any
}

export const EditEmployeeForm: React.FC<Props> = ({ employeeData, refetchEmployees, setIsEditModalOpen }) => {
  const [formData, setFormData] = useState<EmployeeFormData>(employeeData)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'legajo' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    await toast.promise(
      (async () => {
        try {
          await editEmployee(formData)
          await refetchEmployees()
        } catch (error: any) {
          setError(error.message)
          throw error.message
        }
      })(),
      {
        loading: 'Updating employee...',
        success: 'Employee updated successfully!',
        error: (err) => err || 'Failed to update employee. Please try again.'
      }
    )

    setIsSubmitting(false)
    setIsEditModalOpen(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-5"
    >
      <Title title="Edit Employee" component="h2" />
      <div className="w-full">
        <label
          htmlFor="fullName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Full Name
        </label>
        <input
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="cuil"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          CUIL
        </label>
        <input
          type="number"
          id="cuil"
          value={formData.cuil}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="legajo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Legajo
        </label>
        <input
          type="number"
          id="legajo"
          value={formData.legajo}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isSubmitting ? 'Submitting...' : 'Update Employee'}
      </button>
    </form>
  )
}

export default EditEmployeeForm
