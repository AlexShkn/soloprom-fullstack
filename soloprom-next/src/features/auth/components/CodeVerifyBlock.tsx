'use client'
import React from 'react'
import { ConfirmFields } from './ConfirmFields'
import { ControllerRenderProps } from 'react-hook-form'
import InputOTPHookForm from './InputOTPHookForm'
import { Button } from '@/components/ui'

interface Props {
  emailAddress: string
  isLoading: boolean
  isResendEnabled: boolean
  resetCode: () => void
  countdown?: number
  field: ControllerRenderProps<any, string>
  onComplete?: () => void
}

export const CodeVerifyBlock: React.FC<Props> = ({
  emailAddress,
  field,
  countdown,
  isResendEnabled,
  resetCode,
  isLoading,
  onComplete,
}) => {
  return (
    <ConfirmFields emailAddress={emailAddress}>
      {countdown && countdown > 0 ? (
        <InputOTPHookForm
          field={field}
          disabled={isLoading}
          length={6}
          onComplete={onComplete}
          countdown={countdown}
        />
      ) : (
        ''
      )}

      {countdown && countdown > 0 ? (
        <span className="mt-5 text-center">
          <span>Код отправлен. Время действия кода:</span>{' '}
          <span>{countdown}</span> <span>сек</span>
        </span>
      ) : (
        ''
      )}

      {countdown === 0 ? (
        <div className="mt-2 flex flex-col justify-center">
          <p className="text_css_root_r67fmvx text_css_body-2_b1pxmc10 mb-2.5">
            Время действия кода истекло.
          </p>
          {isResendEnabled && (
            <Button type="submit" onClick={resetCode}>
              Отправить новый
            </Button>
          )}
        </div>
      ) : (
        ''
      )}
    </ConfirmFields>
  )
}
