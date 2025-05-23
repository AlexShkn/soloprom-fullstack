'use client'

import { motion } from 'framer-motion'
import { pageVariants } from '@/supports/animations'
import { useState, useEffect } from 'react'
import { Loading } from '@/components/ui'

export default function HeroLoadWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{
        position: 'relative',
      }}
    >
      {children}
      {isLoading && (
        <div className="w-full-h-full absolute inset-0 z-10 flex h-full bg-white">
          <div className="h-full w-full animate-pulse">
            <div className="h-full w-full bg-gray-200"></div>
            <Loading
              classNames="text-darkBlue absolute ttall"
              spinClasses="w-12 h-12"
            />
          </div>
        </div>
        // <div className="absolute inset-0 z-10 h-full w-full bg-white">
        //   <div className="page-container flex w-full flex-col gap-1">
        //     <div className="flex h-60 w-full items-center gap-1">
        //       <div className="h-full w-[calc(60%-5px)]">
        //         <div className="flex h-full animate-pulse">
        //           <div className="h-full w-full">
        //             <ul className="mt-5 h-full space-y-2">
        //               <li className="h-full w-full rounded-custom bg-gray-200"></li>
        //             </ul>
        //           </div>
        //         </div>
        //       </div>
        //       <div className="h-full w-[40%]">
        //         <div className="flex h-full animate-pulse">
        //           <div className="h-full w-full">
        //             <ul className="mt-5 h-full space-y-2">
        //               <li className="h-full w-full rounded-custom bg-gray-200"></li>
        //             </ul>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     <div className={'flex h-48 w-full items-center gap-1'}>
        //       <div className="h-full w-1/2">
        //         <div className="flex h-full animate-pulse">
        //           <div className="h-full w-full">
        //             <ul className="mt-5 h-full space-y-2">
        //               <li className="h-full w-full rounded-custom bg-gray-200"></li>
        //             </ul>
        //           </div>
        //         </div>
        //       </div>
        //       <div className="h-full w-1/2">
        //         <div className="flex h-full animate-pulse">
        //           <div className="h-full w-full">
        //             <ul className="mt-5 h-full space-y-2">
        //               <li className="h-full w-full rounded-custom bg-gray-200"></li>
        //             </ul>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </motion.div>
  )
}
