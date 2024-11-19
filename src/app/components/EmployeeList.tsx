/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Employee } from '@prisma/client'
import SkeletonEmployees from './EmployeeSkeleton'
import { Title } from './Title'

interface Props {
  employees: Employee[]
}

export const EmployeeList: React.FC<Props> = ({ employees }) => {
  return (
    <>
      {employees.length === 0 && <SkeletonEmployees />}
      <Title title="Your Employees" component="h2" />
      <div className="max-h-[800px] overflow-scroll border-gray-500 border-2 rounded-md w-full ">
        {employees?.map(({ id, fullName, email, cuil }) => (
          <div
            key={id}
            className="flex flex-row gap-2 border-b-2 border-gray-500 p-2 text-ellipsis overflow-hidden"
          >
            <div className="flex flex-row self-start justify-self-start w-full text-ellipsis overflow-hidden">
              <p className="truncate">{`${fullName.toLowerCase()} - ${cuil} | ${email}`}</p>
            </div>
            <div className="flex flex-row self-end justify-self-end gap-2">
              <button className="bg-red-500 text-white px-2 rounded-md">
                Delete
              </button>
              <button className="bg-green-500 text-white px-2 rounded-md">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
