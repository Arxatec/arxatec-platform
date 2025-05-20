import { useState } from 'react'

interface CustomToggleProps {
  label?: string
  description?: string
  initialState?: boolean
  onChange?: (state: boolean) => void
}

export const CustomToggle = ({
  label,
  description,
  initialState = false,
  onChange,
}: CustomToggleProps) => {
  const [enabled, setEnabled] = useState(initialState)

  const handleToggle = () => {
    const newState = !enabled
    setEnabled(newState)
    onChange?.(newState)
  }

  return (
    <div className="flex items-center justify-between gap-3">
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
          {description && <span className="text-sm text-gray-500">{description}</span>}
        </div>
      )}
      <button
        onClick={handleToggle}
        className={`relative inline-flex flex-shrink-0 h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 
        ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
        aria-pressed={enabled}
      >
        <span
          className={`absolute left-0 inline-block size-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}
