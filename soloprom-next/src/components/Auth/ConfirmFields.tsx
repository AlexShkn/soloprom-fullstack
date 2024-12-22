'use client'
import React from 'react'

interface Props {
  className?: string
}

export const ConfirmFields: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="114"
          height="114"
          fill="none"
          viewBox="0 0 24 24"
          color="#FD584E"
          className="platform-icon platfrom-icon-ic_m_key icon_css_root_r1cwkank"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
            d="M14.633 9.367h.009m-.009 5.266a5.266 5.266 0 1 0-5.219-4.558c.051.381.077.572.06.692a.75.75 0 0 1-.103.304c-.06.107-.164.211-.373.42l-4.486 4.486c-.151.152-.227.228-.282.316a.88.88 0 0 0-.105.254c-.024.1-.024.208-.024.423v1.525c0 .491 0 .737.096.925a.87.87 0 0 0 .383.383c.188.096.434.096.925.096H7.03c.215 0 .322 0 .423-.024a.878.878 0 0 0 .254-.105c.088-.055.164-.13.316-.282l4.485-4.486c.21-.209.314-.314.42-.373a.751.751 0 0 1 .305-.103c.12-.017.31.008.692.06.231.03.468.047.708.047Z"
          ></path>
        </svg>
        <span className="text-lg font-medium leading-5">
          Введите код подтверждения
        </span>
        <p className="text-center text-sm">
          Код отправлен на вашу почту{' '}
          <strong className="font-bold leading-7">lex92cool@yandex.ru</strong>
        </p>
      </div>
      <div className="mt-4 flex flex-col items-center gap-4">
        <div
          data-scope="pin-input"
          data-part="control"
          id="pin-input:cl-2:control"
          className="grid grid-cols-4 items-center gap-3"
        >
          <input
            data-scope="pin-input"
            data-part="input"
            id="pin-input:cl-2:0"
            data-ownedby="pin-input:cl-2"
            aria-label="pin code 1 of 4"
            inputMode="numeric"
            type="tel"
            autoCapitalize="none"
            autoComplete="off"
            placeholder="○"
            tabIndex={1}
            className="border-1 block h-14 w-14 rounded border border-[#ebebeb] text-center text-2xl font-medium"
          />
          <input
            data-scope="pin-input"
            data-part="input"
            id="pin-input:cl-2:1"
            data-ownedby="pin-input:cl-2"
            aria-label="pin code 2 of 4"
            inputMode="numeric"
            type="tel"
            autoCapitalize="none"
            autoComplete="off"
            placeholder="○"
            tabIndex={1}
            className="border-1 block h-14 w-14 rounded border border-[#ebebeb] text-center text-2xl font-medium"
          />
          <input
            data-scope="pin-input"
            data-part="input"
            id="pin-input:cl-2:2"
            data-ownedby="pin-input:cl-2"
            aria-label="pin code 3 of 4"
            inputMode="numeric"
            type="tel"
            autoCapitalize="none"
            autoComplete="off"
            placeholder="○"
            tabIndex={1}
            className="border-1 block h-14 w-14 rounded border border-[#ebebeb] text-center text-2xl font-medium"
          />
          <input
            data-scope="pin-input"
            data-part="input"
            id="pin-input:cl-2:3"
            data-ownedby="pin-input:cl-2"
            aria-label="pin code 4 of 4"
            inputMode="numeric"
            type="tel"
            autoCapitalize="none"
            autoComplete="off"
            placeholder="○"
            tabIndex={1}
            className="border-1 block h-14 w-14 rounded border border-[#ebebeb] text-center text-2xl font-medium"
          />
        </div>

        <span className="text_css_root_r67fmvx text_css_body-1_b1x39ofe utils_css_color_red_ciosmt4"></span>

        <span className="text-center">
          <span>Код отправлен. Время действия кода</span> <span>288</span>{' '}
          <span>сек</span>
        </span>

        <div className="flex flex-col justify-center">
          <p className="text_css_root_r67fmvx text_css_body-2_b1pxmc10">
            Время действия кода истекло.
          </p>
          <p className="text-center">
            <button className="p-1 font-bold text-accentBlue">
              Отправить новый
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
