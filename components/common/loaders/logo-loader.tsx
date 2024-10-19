const LogoWithCSS = () => (
    <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
    >
        <g className="animate-logo-loader-blue">
            <circle className="fill-[#1a5b95] " cx="26" cy="13.57" r="5.75" />
            <polygon
                className="fill-[#1a5b95]"
                points="29 44.18 38.2 44.18 26 23.07 13.8 44.18 26 44.18"
            />
        </g>
        <g className="animate-logo-loader-teal">
            <circle className="fill-[#1bbdc8]" cx="13.04" cy="14.72" r="4.92" />
            <polygon
                className="fill-[#1bbdc8]"
                points="13.04 22.72 23.48 22.72 13.04 40.79 2.59 22.72 13.04 22.72"
            />
        </g>
        <g className="animate-logo-loader-teal">
            <circle className="fill-[#1bbdc8]" cx="38.96" cy="14.72" r="4.92" />
            <polygon
                className="fill-[#1bbdc8]"
                points="38.96 22.72 28.52 22.72 38.96 40.79 49.41 22.72 38.96 22.72"
            />
        </g>
    </svg>
)

const LogoLoader = () => {
    return (
        <div className="w-[80px] h-[80px] relative z-20">
            <LogoWithCSS />
        </div>
    )
}

export default LogoLoader
