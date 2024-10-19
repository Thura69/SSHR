import Image from 'next/image'
import React from 'react'

interface TopWaveProps {
    className?: string
}

export const TopWave: React.FC<TopWaveProps> = ({ className }) => {
    return (
        <Image
            src={'/assets/wave-top.svg'}
            alt="illustration"
            width={540}
            height={540}
            className={className}
        />
    )
}
