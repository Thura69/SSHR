'use client'
import React, { useState } from 'react'
import { CareerHeader } from './career-header'
import { CareerCard } from './career-card'
import Paging from '@/components/common/pagers/pagination-v4'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'
import { CareerPublicHeader } from './career-public-header'

export const MainPage = () => {
    const [isGrid, setIsGrid] = useState(true)
    const [isCopy, setIsCopy] = useState(false)
    const CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const { width, height } = useWindowSize()

    const containerVariants = {
        grid: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger animation for grid items
                when: 'beforeChildren', // Ensure container animates before children
            },
        },
        list: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05, // Faster stagger for list items
                when: 'beforeChildren', // Ensure container animates before children
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <>
            {isCopy && (
                <Confetti width={width} height={height} recycle={false} />
            )}
            <div className="p-[40px]">
                {/* <CareerPublicHeader /> */}
                <CareerHeader
                    setIsCopy={setIsCopy}
                    isCopy={isCopy}
                    setIsGrid={setIsGrid}
                    isGrid={isGrid}
                />
                <section className={cn('mt-[32px] space-y-5 md:px-[58px]')}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${isGrid}`} // Triggers re-render on isGrid change
                            className={cn(
                                isGrid
                                    ? 'grid grid-cols-3 gap-10'
                                    : 'space-y-5',
                            )}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={containerVariants}
                        >
                            {CARDS.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="grid-item"
                                    variants={itemVariants}
                                >
                                    <CareerCard gridCard={isGrid} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <Paging currentPage={1} perPage={8} totalCount={80} />
                </section>
            </div>
        </>
    )
}
;``
