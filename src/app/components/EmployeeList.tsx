/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Employee } from '@prisma/client'
import SkeletonEmployees from './EmployeeSkeleton'

interface Props {
  employees: Employee[]
}

export const EmployeeList: React.FC<Props> = ({ employees }) => {
  return (
    <>
      {employees.length === 0 && <SkeletonEmployees />}
      <div className="border-blue-900 border-2 rounded-md w-full mx-20 overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-300">
            <tr>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">Full Name</th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">CUIL</th>
              <th className="px-4 py-2 text-left border-b-2 border-blue-900">Email</th>
              <th className="px-4 py-2 text-center border-b-2 border-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map(({ id, fullName, email, cuil }) => (
              <tr key={id} className="border-b border-blue-900 hover:bg-gray-100">
                <td className="px-4 py-2 truncate">{fullName.toLowerCase()}</td>
                <td className="px-4 py-2 truncate">{cuil}</td>
                <td className="px-4 py-2 truncate">{email}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">
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
