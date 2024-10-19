import { SVGElementProps } from '@/types/svg-element-interface'

const TwoUsers = ({ fill, ...props }: SVGElementProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            {...props}
        >
            <g clipPath="url(#clip0_2473_22100)">
                <path
                    fill={fill ?? '#3D5D60'}
                    d="M2.4 4.769c0-.857.337-1.679.937-2.285A3.185 3.185 0 015.6 1.538c.849 0 1.663.34 2.263.946.6.606.937 1.428.937 2.285 0 .857-.337 1.678-.937 2.284C7.263 7.66 6.449 8 5.6 8s-1.663-.34-2.263-.947A3.247 3.247 0 012.4 4.77zM0 13.71c0-2.486 1.995-4.5 4.458-4.5h2.285c2.462 0 4.457 2.014 4.457 4.5 0 .415-.332.75-.742.75H.743a.746.746 0 01-.743-.75zm15.233.75h-3.448c.135-.237.215-.512.215-.808v-.202a5.057 5.057 0 00-1.745-3.83c.06-.003.118-.006.178-.006h1.535c2.227 0 4.032 1.822 4.032 4.071 0 .43-.345.775-.767.775zM10.8 8a2.781 2.781 0 01-1.982-.83A4.044 4.044 0 009.6 4.768c0-.677-.165-1.315-.457-1.876a2.782 2.782 0 011.657-.547c1.548 0 2.8 1.264 2.8 2.827C13.6 6.735 12.348 8 10.8 8z"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_2473_22100">
                    <path fill="#fff" d="M0 0H16V16H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default TwoUsers