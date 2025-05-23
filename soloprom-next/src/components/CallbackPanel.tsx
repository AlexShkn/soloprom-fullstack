'use client'
import { useModalsStore } from '@/store/useModalsStore'
import { Button } from './ui'

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
        className="inline-flex items-center gap-1 rounded-custom bg-hoverBlue p-1 text-sm font-medium text-white"
      >
        <svg className="icon h-7 w-7 fill-white">
          <use xlinkHref="/img/sprite.svg#footer-tg"></use>
        </svg>
      </a>
      <a
        href="https://wa.me/79036569393"
        className="inline-flex items-center gap-1 rounded-custom bg-greenColor p-1 text-sm font-medium text-white"
      >
        <svg className="icon h-7 w-7 fill-white">
          <use xlinkHref="/img/sprite.svg#footer-wp"></use>
        </svg>
      </a>

      <Button
        onClick={() => modalCallbackStateChange(true)}
        className="gap-1 px-2.5 py-1.5"
      >
        <svg className="icon h-6 w-6 fill-white">
          <use xlinkHref="/img/sprite.svg#mail"></use>
        </svg>
        <span>онлайн-заявка</span>
      </Button>
    </div>
  )
}
