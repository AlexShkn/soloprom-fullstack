'use client'
import { useModalsStore } from '@/store/useModalsStore'

interface Props {
  className?: string
}

export const CallbackPanel: React.FC<Props> = ({ className }) => {
  const { callbackIsOpen, modalCallbackStateChange, shareModal } =
    useModalsStore()

  return (
    <div
      className={`fixed bottom-2.5 right-2 z-[11] hidden items-center gap-2 transition-transform md:inline-flex ${callbackIsOpen && 'right-6'}`}
    >
      <a
        href="https://t.me/+79036569393"
        className="inline-flex items-center gap-1 rounded-custom bg-hoverBlue p-[5px] text-sm font-medium text-white"
      >
        <svg className="icon h-7 w-7 fill-white">
          <use xlinkHref="/img/sprite.svg#footer-tg"></use>
        </svg>
      </a>
      <a
        href="https://wa.me/79036569393"
        className="inline-flex items-center gap-1 rounded-custom bg-greenColor p-[5px] text-sm font-medium text-white"
      >
        <svg className="icon h-7 w-7 fill-white">
          <use xlinkHref="/img/sprite.svg#footer-wp"></use>
        </svg>
      </a>
      <button
        onClick={() => modalCallbackStateChange(true)}
        type="button"
        className="inline-flex items-center gap-1 rounded-custom bg-accentBlue px-2.5 py-[7px] text-sm font-medium text-white transition-colors hover:bg-hoverBlue"
      >
        <svg className="icon h-6 w-6 fill-white">
          <use xlinkHref="/img/sprite.svg#mail"></use>
        </svg>
        <span>онлайн-заявка</span>
      </button>
    </div>
  )
}
