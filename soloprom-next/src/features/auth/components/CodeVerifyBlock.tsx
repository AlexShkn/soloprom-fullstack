'use client'
import React from 'react'
import { ConfirmFields } from './ConfirmFields'
import { Input } from '@/components/ui/Input'
import { ControllerRenderProps } from 'react-hook-form'

interface Props {
  emailAddress: string
  isLoading: boolean
  isResendEnabled: boolean
  resetCode: () => void
  countdown: number
  field: ControllerRenderProps
}

export const CodeVerifyBlock: React.FC<Props> = ({
  emailAddress,
  field,
  countdown,
  isResendEnabled,
  resetCode,
  isLoading,
}) => {
  return (
    <ConfirmFields emailAddress={emailAddress}>
      <Input
        placeholder="123456"
        disabled={isLoading}
        {...field}
        className={'mt-2'}
      />
      {countdown > 0 ? (
        <span className="mt-5 text-center">
          <span>Код отправлен. Время действия кода:</span>{' '}
          <span>{countdown}</span> <span>сек</span>
        </span>
      ) : (
        ''
      )}

      {countdown === 0 && (
        <div className="mt-2 flex flex-col justify-center">
          <p className="text_css_root_r67fmvx text_css_body-2_b1pxmc10">
            Время действия кода истекло.
          </p>
          {isResendEnabled && (
            <p className="text-center">
              <button
                className="p-1 font-bold text-accentBlue"
                onClick={resetCode}
              >
                Отправить новый
              </button>
            </p>
          )}
        </div>
      )}
    </ConfirmFields>
  )
}
