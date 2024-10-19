import { useMediaQuery } from 'usehooks-ts'

const DIMENSIONS = {
    mobile: '(min-width: 320px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    laptop: '(min-width: 1024px) and (max-width: 1280px)',
    desktop: '(min-width: 1280px)',
}

export default function useDimension() {
    const isMobile = useMediaQuery(DIMENSIONS.mobile)
    const isTablet = useMediaQuery(DIMENSIONS.tablet)
    const isLaptop = useMediaQuery(DIMENSIONS.laptop)
    const isDesktop = useMediaQuery(DIMENSIONS.desktop)

    return { isMobile, isTablet, isLaptop, isDesktop }
}
