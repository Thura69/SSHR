const CloseSvg = ({ height, width }: { height?: string; width?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || '30'}
            height={height || '30'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-square-x"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
        </svg>
    )
}

export default CloseSvg
