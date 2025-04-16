import { LucideLoader2 } from 'lucide-react'

interface Props {
  classNames?: string
  size?: number
}

export function Loading({ classNames, size = 5 }: Readonly<Props>) {
  return (
    <div className={`flex items-center justify-center text-sm ${classNames}`}>
      <LucideLoader2 className={`mr-2 size-${size} animate-spin`} />
    </div>
  )
}
