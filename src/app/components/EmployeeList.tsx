import { Employee } from '@prisma/client'
import SkeletonEmployees from './EmployeeSkeleton'
import { deleteEmployee } from '@/utils/CRUD/deleteEmployee'
import toast from 'react-hot-toast'
import EditEmployeeForm from './EditEmployeeForm'
import Close from '../../../public/icons/Close'
import { useState } from 'react'
import { EmployeeFormData } from '@/types'

interface Props {
  employees: Employee[]
  refetchEmployees: () => Promise<void>
}

export const EmployeeList: React.FC<Props> = ({ employees, refetchEmployees }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [employeeToEdit, setEmployeeToEdit] = useState<EmployeeFormData | null>(null)

  const handleDelete = async (email: string) => {
    if (email) {
      await toast.promise(
        (async () => {
          await deleteEmployee(email)
          await refetchEmployees()
        })(),
        {
          loading: 'Deleting employee...',
          success: 'Employee deleted successfully!',
          error: (err) => err || 'Failed to delete employee. Please try again.'
        }
      )
    }
  }

  const handleEdit = (employee: EmployeeFormData) => {
    setEmployeeToEdit(employee)
    setIsEditModalOpen(true)
  }

  return (
    <>
      <div className="border-blue-900 border-2 rounded-md w-full mx-20 overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-300">
            <tr>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">Legajo</th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">Full Name</th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">CUIL</th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">Email</th>
              <th className="px-4 py-2 text-center border-b-2 border-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && <SkeletonEmployees />}
            {employees?.map(({ id, fullName, email, cuil, legajo }) => (
              <tr key={id} className="border-b border-blue-900 hover:bg-gray-100">
                <td className="px-4 py-2 truncate">{legajo}</td>
                <td className="px-4 py-2 truncate">{fullName.toLowerCase()}</td>
                <td className="px-4 py-2 truncate">{cuil}</td>
                <td className="px-4 py-2 truncate">{email}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={async () => await handleDelete(email)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit({ id, fullName, email, cuil, legajo })}
                      className="bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && employeeToEdit && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto bg-white p-6 rounded-xl">
              <EditEmployeeForm
                refetchEmployees={refetchEmployees}
                setIsEditModalOpen={setIsEditModalOpen}
                employeeData={employeeToEdit}
              />
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute right-5 top-3 py-1 px-2 rounded-[50%]"
              >
                <Close className="size-6" />
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}
