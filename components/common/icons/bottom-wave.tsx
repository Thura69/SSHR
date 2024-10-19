import Image from 'next/image'
import React from 'react'

interface BottomWaveProps {
    className?: string
}

export const BottomWave: React.FC<BottomWaveProps> = ({ className }) => {
    return (
        <Image
            src={'/assets/wave-bottom.svg'}
            alt="illustration"
            width={540}
            height={540}
            className={className}
        />
    )
}
