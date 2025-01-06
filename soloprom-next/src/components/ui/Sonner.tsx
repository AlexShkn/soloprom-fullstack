'use client'

import { useTheme } from 'next-themes'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()
  const isDark =
    theme === 'dark' ||
    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <Sonner
      className="toaster font-medium"
      toastOptions={{
        classNames: {
          toast: `border border-border shadow-lg
                  ${isDark ? 'bg-[#111827] text-white' : 'bg-blue-500 text-white'}`,
          description: isDark ? 'text-white' : 'text-black font-medium',
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
