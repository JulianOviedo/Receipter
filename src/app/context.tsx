'use client'

import { getEmployees } from '@/utils/CRUD/getEmployees'
import { Employee } from '@prisma/client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface EmployeeContextType {
  employees: Employee[]
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export const useEmployees = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees has not provider')
  }
  return context
}

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([])

  const fetchEmployees = async () => {
    const employeesData = await getEmployees()
    setEmployees(employeesData)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchEmployees()
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  )
}
