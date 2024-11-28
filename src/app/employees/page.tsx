'use client'
/* eslint-disable multiline-ternary */
import { useState } from 'react'
import AddEmployeeForm from '../components/AddEmployeeForm'
import { EmployeeList } from '../components/EmployeeList'
import { useEmployees } from '../context'
import { getEmployees } from '@/utils/CRUD/getEmployees'
import Footer from '../components/Footer'
import Close from '../../../public/icons/Close'

export default function Employees () {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { employees, setEmployees } = useEmployees()

  const refetchEmployees = async () => {
    const employeesData = await getEmployees()
    setEmployees(employeesData)
  }
  return (
    <main>
      <div className="flex px-10 py-5 w-full justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="rounded bg-green-700 text-green-200 px-5 py-2 hover:shadow-lg hover:bg-green-900"
        >
          + Add
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto bg-white p-6 rounded-xl">
              <AddEmployeeForm
                refetchEmployees={refetchEmployees}
                setShowModal={setShowModal}
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-3 py-1 px-2  rounded-[50%]"
              >
                <Close className="size-6" />
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="w-full flex justify-center items-center">
        <EmployeeList
          employees={employees}
          refetchEmployees={refetchEmployees}
        />
      </div>
      <Footer />
    </main>
  )
}
