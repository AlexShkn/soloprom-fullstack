import { LucideLoader2 } from 'lucide-react'

interface Props {
  classNames?: string
  spinClasses?: string
  size?: number
  width?: number
  height?: number
}

export function Loading({
  classNames,
  spinClasses,
  size = 5,
  height,
  width,
}: Readonly<Props>) {
  return (
    <div className={`flex items-center justify-center text-sm ${classNames}`}>
      <LucideLoader2
        className={`mr-2 size-${size} ${spinClasses} animate-spin`}
      />
    </div>
  )
}
