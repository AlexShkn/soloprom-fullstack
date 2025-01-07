import { LucideLoader2 } from 'lucide-react'

interface Props {
  classNames?: string
}

export function Loading({ classNames }: Props) {
  return (
    <div className={`flex items-center justify-center text-sm ${classNames}`}>
      <LucideLoader2 className="mr-2 size-5 animate-spin" />
    </div>
  )
}
