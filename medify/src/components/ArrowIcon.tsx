/**
 * Seems to be the only icon with two color variations.
 * Next.js doesn't seem to have any convenient Icon component packages,
 * so avoided the hassle
 * */

export default function ArrowIcon({fill = 'white', className = ''}) {
    return (
        <svg className={className} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={fill} d="M8.15961 7.87305C8.42328 7.60938 8.42328 7.16992 8.15961 6.90625L2.47601 1.19336C2.18304 0.929688 1.74359 0.929688 1.47992 1.19336L0.806091 1.86719C0.542419 2.13086 0.542419 2.57031 0.806091 2.86328L5.31781 7.375L0.806091 11.916C0.542419 12.209 0.542419 12.6484 0.806091 12.9121L1.47992 13.5859C1.74359 13.8496 2.18304 13.8496 2.47601 13.5859L8.15961 7.87305Z"/>
        </svg>


    )
};
