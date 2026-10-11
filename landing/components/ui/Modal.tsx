'use client'

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  showCloseButton?: boolean
  closeOnOutsideClick?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'lg',
  showCloseButton = true,
  closeOnOutsideClick = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto'
      role='dialog'
      aria-modal='true'
    >
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidthClasses[maxWidth]} rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#101226] p-6 sm:p-8 shadow-2xl shadow-violet-950/20 dark:shadow-violet-950/50 space-y-6 my-8 animate-in zoom-in-95 duration-200 border-slate-200 dark:border-white/20`}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label='Close modal'
            className='absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer'
          >
            <X className='h-5 w-5' />
          </button>
        )}

        {/* Modal Header */}
        {(title || description) && (
          <div className='space-y-2 pr-8'>
            {title && (
              <div className='text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight'>
                {title}
              </div>
            )}
            {description && (
              <div className='text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
                {description}
              </div>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className='relative'>{children}</div>

        {/* Modal Footer */}
        {footer && <div className='pt-4 border-t border-slate-200 dark:border-white/10'>{footer}</div>}
      </div>
    </div>
  )
}
