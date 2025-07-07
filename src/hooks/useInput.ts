import { useState } from 'react'

export function useInput(validator: (value: string) => boolean) {
  const [value, setValue] = useState('')
  const isValid = validator(value)

  return {
    value,
    setValue,
    isValid,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  }
}
