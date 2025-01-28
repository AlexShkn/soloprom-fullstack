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
