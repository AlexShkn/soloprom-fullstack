'use client'
import React, { useState, useRef, useEffect } from 'react'

import { AuthBottomNav } from '@/components/Auth/AuthBottomNav'
import { ConfirmFields } from '@/components/Auth/ConfirmFields'
import { SocialAuthButtons } from '@/components/Auth/SocialAuthButtons'
import { SubmitBtn } from '@/components/Auth/SubmitBtn'
import Link from 'next/link'

interface Props {
  className?: string
}

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const [codeIsSend, setCodeIsSend] = useState(false)
  const [fieldIsFilled, setFieldIsFilled] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const sendingVerifyToEmail = () => {
    setCodeIsSend(true)
  }

  useEffect(() => {
    if (emailInputRef.current) {
      setFieldIsFilled(!!emailInputRef.current.value)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldIsFilled(!!e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendingVerifyToEmail()
  }

  return (
    <div className="flex max-w-96 flex-col">
      <div className="flex w-full min-w-96 max-w-96 flex-col overflow-hidden rounded-lg bg-white p-10 shadow-custom">
        <div className="flex flex-col">
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-2xl font-bold leading-5 text-darkBlue">
                Регистрация
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="input_css_inputRoot_iit11wh">
                  <label
                    htmlFor="baseInput___LLt-2"
                    className="mb-1 text-sm font-medium leading-5 text-[#5d5d5f]"
                  >
                    Адрес электронной почты
                  </label>
                  <div className="flex min-h-10 w-full items-center gap-2 rounded-lg border bg-[#fcfcfc] px-2.5 shadow-sm outline-none">
                    <div className="relative flex-1">
                      <div className="flex w-full overflow-x-auto whitespace-nowrap">
                        <div className="flex flex-1 items-center gap-1">
                          {/* <div className=""></div> */}
                          <input
                            ref={emailInputRef}
                            onChange={handleInputChange}
                            className="w-full py-2.5 focus:shadow-none focus:outline-none"
                            type="email"
                            name="Email"
                            placeholder="e-mail@yandex.ru"
                            autoFocus={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {codeIsSend && <ConfirmFields />}
            </div>
            <div
              className="mocked-styled-0 stack_css_StackRoot_s1yn6md3"
              data-stack="1"
            >
              <SubmitBtn text={'Продолжить'} disabled={!fieldIsFilled} />
            </div>
          </form>

          <SocialAuthButtons />
        </div>
      </div>
      <AuthBottomNav register />
    </div>
  )
}
