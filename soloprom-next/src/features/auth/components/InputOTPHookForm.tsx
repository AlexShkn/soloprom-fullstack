import React, { useState, useEffect, useCallback } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { ControllerRenderProps } from 'react-hook-form'

interface InputOTPHookFormProps {
  field: ControllerRenderProps<any, string>
  length?: number
  countdown: number
  disabled?: boolean
  onComplete?: () => void
}

const InputOTPHookForm: React.FC<InputOTPHookFormProps> = ({
  field,
  length = 6,
  disabled = false,
  onComplete,
  countdown,
}) => {
  const [otpValue, setOtpValue] = useState(field.value || '')
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    if (field.value !== otpValue) {
      setOtpValue(field.value || '')
    }
  }, [field.value, otpValue])

  const handleSlotFocus = useCallback(
    (index: number) => {
      if (disabled) return
      setFocusedIndex(index)
    },
    [disabled],
  )

  const handleOtpChange = (value: string) => {
    setOtpValue(value)
    field.onChange(value)
    if (value.length === length && onComplete) {
      onComplete()
    }
  }

  const renderInputOTP = () => {
    const slots = []
    for (let i = 0; i < length; i++) {
      slots.push(
        <InputOTPSlot key={i} index={i} onFocus={() => handleSlotFocus(i)} />,
      )
      if ((i + 1) % 3 === 0 && i !== length - 1) {
        slots.push(<InputOTPSeparator key={`sep-${i}`} />)
      }
    }
    return (
      <InputOTP
        maxLength={length}
        onChange={handleOtpChange}
        value={countdown === 0 ? ' ' : otpValue}
        disabled={disabled}
      >
        <InputOTPGroup>{slots}</InputOTPGroup>
      </InputOTP>
    )
  }

  return renderInputOTP()
}

export default InputOTPHookForm
