'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const isDark = 'dark'

  return (
    <Sonner
      className="toaster"
      toastOptions={{
        classNames: {
          toast: `border border-border shadow-custom text-sm bg-white text-accentBlue`,
          description: 'text-black',
          actionButton: isDark
            ? 'bg-blue-600 text-white'
            : 'bg-blue-700 text-white',
          cancelButton: isDark
            ? 'bg-gray-600 text-white'
            : 'bg-gray-300 text-white',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
