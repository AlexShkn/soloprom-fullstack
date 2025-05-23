'use client'

import { motion } from 'framer-motion'
import { pageVariants } from '@/supports/animations'

export default function TransitionWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}

// 'use client'

// import { motion } from 'framer-motion'
// import { pageVariants } from '@/supports/animations'
// import { useState, useEffect } from 'react'
// import { Loading } from '@/components/ui'

// export default function TransitionWrapper({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Задержка, чтобы показать спиннер перед отображением содержимого.
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 2000)

//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={pageVariants}
//       style={{ position: 'relative' }} // Важно для позиционирования overlay
//     >
//       {children}
//       {isLoading && (
//         <div
//           style={{
//             position: 'absolute', // Overlay над контентом
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             zIndex: 1000, // Гарантирует, что overlay будет сверху
//           }}
//         >
//           <Loading classNames="text-accentBlue" spinClasses="w-10 h-10" />
//         </div>
//       )}
//     </motion.div>
//   )
// }
