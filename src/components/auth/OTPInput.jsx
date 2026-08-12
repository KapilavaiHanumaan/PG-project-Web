import React, { useRef, useEffect } from 'react'

export default function OTPInput({ length = 6, value = '', onChange, disabled = false, error = false }) {
  const inputRefs = useRef([])

  // Initialize array of digits from value
  const digits = Array.from({ length }, (_, i) => value[i] || '')

  useEffect(() => {
    // Focus first input on mount if empty
    if (inputRefs.current[0] && !value) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e, index) => {
    const val = e.target.value
    if (!/^\d*$/.test(val)) return // allow numbers only

    const newDigits = [...digits]

    // Take the last entered character if multiple characters entered
    const lastChar = val.slice(-1)
    newDigits[index] = lastChar

    const combined = newDigits.join('')
    onChange(combined)

    // Move to next input if digit entered
    if (lastChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move back and clear previous field
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length)
    if (!pastedData) return

    onChange(pastedData)

    // Focus last pasted digit input or next empty box
    const nextFocusIndex = Math.min(pastedData.length, length - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 my-4">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of verification code`}
          className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border transition-all duration-200 focus:outline-none ${
            error
              ? 'border-rose-500 bg-rose-500/10 text-rose-300 focus:ring-2 focus:ring-rose-500/50'
              : digits[index]
              ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/20 focus:ring-2 focus:ring-blue-500'
              : 'border-slate-800 bg-slate-950/60 text-white hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      ))}
    </div>
  )
}
