'use client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { modalCallbackStateChange } from '@/redux/slices/modalsSlice'

import './CallbackPanel.scss'

interface Props {
  className?: string
}

export const CallbackPanel: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()

  const callbackIsOpen = useSelector(
    (state: RootState) => state.modals.callbackIsOpen,
  )

  return (
    <div className={`callback-panel ${callbackIsOpen && 'fixed-panel'}`}>
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
        onClick={() => dispatch(modalCallbackStateChange(true))}
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
