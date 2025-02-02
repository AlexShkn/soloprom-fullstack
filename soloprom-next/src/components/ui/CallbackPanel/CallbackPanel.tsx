'use client'
import { useModalsStore } from '@/store/modalsStore'

import './CallbackPanel.scss'

interface Props {
  className?: string
}

export const CallbackPanel: React.FC<Props> = ({ className }) => {
  const { callbackIsOpen, modalCallbackStateChange, shareModal } =
    useModalsStore((state) => state)

  return (
    <div
      className={`callback-panel ${(callbackIsOpen || shareModal.isOpen) && 'fixed-panel'}`}
    >
      <a href="https://t.me/+79036569393" className="callback-panel__link">
        <svg className="icon">
          <use xlinkHref="/img/sprite.svg#footer-tg"></use>
        </svg>
      </a>
      <a href="https://wa.me/79036569393" className="callback-panel__link">
        <svg className="icon">
          <use xlinkHref="/img/sprite.svg#footer-wp"></use>
        </svg>
      </a>
      <button
        onClick={() => modalCallbackStateChange(true)}
        type="button"
        className="callback-panel__link"
      >
        <svg className="icon">
          <use xlinkHref="/img/sprite.svg#mail"></use>
        </svg>
        <span>онлайн-заявка</span>
      </button>
    </div>
  )
}
