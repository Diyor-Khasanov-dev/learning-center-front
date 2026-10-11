'use client'

import React, { createContext, useContext, useState } from 'react'
import { DemoForm } from '@/types/landing'

interface DemoModalContextType {
  isDemoModalOpen: boolean
  setIsDemoModalOpen: (open: boolean) => void
  openDemoModal: () => void
  closeDemoModal: () => void
  demoStep: 1 | 2
  setDemoStep: (step: 1 | 2) => void
  demoForm: DemoForm
  setDemoForm: React.Dispatch<React.SetStateAction<DemoForm>>
  demoSubmitted: boolean
  handleDemoSubmit: (e: React.FormEvent) => void
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined)

const INITIAL_FORM_STATE: DemoForm = {
  name: '',
  phone: '',
  centerName: '',
  studentsCount: '100-300',
  preferredTime: 'Morning (9:00 - 12:00)',
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [demoStep, setDemoStep] = useState<1 | 2>(1)
  const [demoForm, setDemoForm] = useState<DemoForm>(INITIAL_FORM_STATE)
  const [demoSubmitted, setDemoSubmitted] = useState(false)

  const openDemoModal = () => setIsDemoModalOpen(true)
  const closeDemoModal = () => setIsDemoModalOpen(false)

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDemoSubmitted(true)
    setTimeout(() => {
      setDemoSubmitted(false)
      setIsDemoModalOpen(false)
      setDemoStep(1)
      setDemoForm(INITIAL_FORM_STATE)
    }, 2800)
  }

  return (
    <DemoModalContext.Provider
      value={{
        isDemoModalOpen,
        setIsDemoModalOpen,
        openDemoModal,
        closeDemoModal,
        demoStep,
        setDemoStep,
        demoForm,
        setDemoForm,
        demoSubmitted,
        handleDemoSubmit,
      }}
    >
      {children}
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  const context = useContext(DemoModalContext)
  if (!context) {
    throw new Error('useDemoModal must be used within a DemoModalProvider')
  }
  return context
}
