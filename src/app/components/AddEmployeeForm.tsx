import { EmployeeFormData } from '@/types'
import { addEmployee } from '@/utils/CRUD/addEmployee'
import React, { useState } from 'react'
import { Title } from './Title'
import toast from 'react-hot-toast'

interface Props {
  refetchEmployees: () => Promise<void>
  setShowModal: (value: boolean) => any
}

export const AddEmployeeForm: React.FC<Props> = ({ refetchEmployees, setShowModal }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    fullName: '',
    cuil: '',
    email: '',
    legajo: 0
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

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
    try {
      await toast.promise(
        (async () => {
          await addEmployee(formData)
          await refetchEmployees()
        })(),
        {
          loading: 'Adding employee...',
          success: 'Employee added successfully!',
          error: (err) => {
            console.error('Error caught in toast.promise:', err)
            return err instanceof Error
              ? err.message
              : 'Failed to add employee. Please try again.'
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)
    setShowModal(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-5"
    >
      <Title title="Add Employee" component="h2" />
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
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isSubmitting ? 'Submitting...' : 'Register new Employee'}
      </button>
    </form>
  )
}

export default AddEmployeeForm
