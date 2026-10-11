'use client'

import React, { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown, Check, Search, X } from 'lucide-react'

export interface DropdownOption<T extends string | number = string> {
  value: T
  label: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  disabled?: boolean
}

export interface DropdownProps<T extends string | number = string> {
  options: DropdownOption<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  disabled?: boolean
  error?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Dropdown<T extends string | number = string>({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  searchable = false,
  searchPlaceholder = 'Search...',
  disabled = false,
  error,
  className = '',
  size = 'md',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const id = useId()

  const selectedOption = options.find((opt) => opt.value === value)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (option.description && option.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  useEffect(() => {
    if (isOpen && listboxRef.current && highlightedIndex >= 0) {
      const highlightedEl = listboxRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedEl) {
        highlightedEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex, isOpen])

  const toggleOpen = () => {
    if (disabled) return
    if (!isOpen) {
      const selectedIdx = filteredOptions.findIndex((opt) => opt.value === value)
      setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : 0)
      setIsOpen(true)
    } else {
      setIsOpen(false)
      setSearchQuery('')
      setHighlightedIndex(-1)
    }
  }

  const handleSelect = (optionValue: T, optDisabled?: boolean) => {
    if (optDisabled) return
    onChange(optionValue)
    setIsOpen(false)
    setSearchQuery('')
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault()
          toggleOpen()
        } else if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          e.preventDefault()
          const opt = filteredOptions[highlightedIndex]
          handleSelect(opt.value, opt.disabled)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          toggleOpen()
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          toggleOpen()
        } else {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
        }
        break
      case 'Escape':
        if (isOpen) {
          e.preventDefault()
          setIsOpen(false)
          setSearchQuery('')
          setHighlightedIndex(-1)
        }
        break
      case 'Tab':
        if (isOpen) {
          setIsOpen(false)
          setSearchQuery('')
          setHighlightedIndex(-1)
        }
        break
      default:
        break
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2.5 text-xs sm:text-sm rounded-md',
    lg: 'px-5 py-3 text-sm sm:text-base rounded-md',
  }

  const IconComponent = selectedOption?.icon

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label
          id={`${id}-label`}
          className='block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5'
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-labelledby={label ? `${id}-label` : undefined}
        disabled={disabled}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-3 text-left transition-all duration-200 border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          sizeClasses[size]
        } ${
          error
            ? 'border-red-500 ring-1 ring-red-500'
            : isOpen
            ? 'border-blue-600 ring-2 ring-blue-600 bg-neutral-50 dark:bg-neutral-950'
            : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className='flex items-center gap-2.5 truncate min-w-0'>
          {IconComponent && (
            <IconComponent className='h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0' />
          )}
          {selectedOption ? (
            <div className='flex items-center gap-2 truncate'>
              <span className='font-medium text-neutral-900 dark:text-neutral-100 truncate'>
                {selectedOption.label}
              </span>
              {selectedOption.badge && (
                <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 shrink-0'>
                  {selectedOption.badge}
                </span>
              )}
            </div>
          ) : (
            <span className='text-neutral-400 font-normal truncate'>{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`}
        />
      </button>

      {error && (
        <p className='mt-1 text-[11px] text-red-500 font-medium'>{error}</p>
      )}

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div className='absolute left-0 right-0 top-full mt-2 z-50 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150'>
          {/* Search Box if enabled */}
          {searchable && (
            <div className='p-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900'>
              <Search className='h-3.5 w-3.5 text-neutral-400 shrink-0 ml-1' />
              <input
                ref={searchInputRef}
                type='text'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setHighlightedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className='w-full bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none'
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer'
                >
                  <X className='h-3 w-3' />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <ul
            ref={listboxRef}
            role='listbox'
            tabIndex={-1}
            className='max-h-60 overflow-y-auto p-1 space-y-0.5'
          >
            {filteredOptions.length === 0 ? (
              <li className='px-4 py-3 text-xs text-neutral-400 text-center italic'>
                No matching options found
              </li>
            ) : (
              filteredOptions.map((option, idx) => {
                const isSelected = option.value === value
                const isHighlighted = idx === highlightedIndex
                const OptionIcon = option.icon

                return (
                  <li
                    key={String(option.value)}
                    role='option'
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value, option.disabled)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-md transition-all cursor-pointer ${
                      option.disabled ? 'opacity-40 cursor-not-allowed' : ''
                    } ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold'
                        : isHighlighted
                        ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <div className='flex items-center gap-2.5 min-w-0 pr-2'>
                      {OptionIcon && (
                        <OptionIcon
                          className={`h-4 w-4 shrink-0 ${
                            isSelected ? 'text-white' : 'text-neutral-400'
                          }`}
                        />
                      )}
                      <div className='min-w-0'>
                        <div className='flex items-center gap-2'>
                          <span className='truncate'>{option.label}</span>
                          {option.badge && (
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                              isSelected
                                ? 'bg-blue-700 text-white'
                                : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                            }`}>
                              {option.badge}
                            </span>
                          )}
                        </div>
                        {option.description && (
                          <div className={`text-[10px] font-normal truncate mt-0.5 ${
                            isSelected ? 'text-blue-100' : 'text-neutral-400'
                          }`}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className='h-4 w-4 text-white shrink-0 ml-2' />
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
