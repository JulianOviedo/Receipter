/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Employee } from '@prisma/client'
import SkeletonEmployees from './EmployeeSkeleton'
import { deleteEmployee } from '@/utils/CRUD/deleteEmployee'
import toast from 'react-hot-toast'

interface Props {
  employees: Employee[]
  refetchEmployees: () => Promise<void>
}

export const EmployeeList: React.FC<Props> = ({ employees, refetchEmployees }) => {
  const handleDelete = async (email: string | null) => {
    if (email) {
      await toast.promise(
        (async () => {
          await deleteEmployee(email)
          await refetchEmployees()
        })(),
        {
          loading: 'deleting employee...',
          success: 'Employee deleted successfully!',
          error: 'Failed to delete employee. Please try again.'
        }
      )
    } else {
      console.error('Email is null or undefined')
    }
  }

  return (
    <>
      <div className="border-blue-900 border-2 rounded-md w-full mx-20 overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-300">
            <tr>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">
                Full Name
              </th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">
                CUIL
              </th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">
                Email
              </th>
              <th className="px-4 py-2 text-center border-b-2 border-blue-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && <SkeletonEmployees />}
            {employees?.map(({ id, fullName, email, cuil }) => (
              <tr
                key={id}
                className="border-b border-blue-900 hover:bg-gray-100"
              >
                <td className="px-4 py-2 truncate">{fullName.toLowerCase()}</td>
                <td className="px-4 py-2 truncate">{cuil}</td>
                <td className="px-4 py-2 truncate">{email}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={async () => await handleDelete(email)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                      Delete
                    </button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
