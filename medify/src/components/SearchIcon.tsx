/**
 * Seems to be the only icon with two color variations.
 * Next.js doesn't seem to have any convenient Icon component packages,
 * so avoided the hassle
 * */

export default function SearchIcon({fill = 'white', className = ''}) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill={fill} fillRule="evenodd" clipRule="evenodd" d="M7.59994 2.7999C4.94898 2.7999 2.79996 4.94894 2.79996 7.5999C2.79996 10.2509 4.94898 12.3999 7.59994 12.3999C10.2509 12.3999 12.3999 10.2509 12.3999 7.5999C12.3999 4.94894 10.2509 2.7999 7.59994 2.7999ZM0.399963 7.5999C0.399963 3.62345 3.6235 0.399902 7.59994 0.399902C11.5764 0.399902 14.7999 3.62345 14.7999 7.5999C14.7999 9.1549 14.307 10.5948 13.4688 11.7717L19.2484 17.5514C19.7171 18.02 19.7171 18.7798 19.2484 19.2484C18.7798 19.7171 18.02 19.7171 17.5514 19.2484L11.7718 13.4688C10.5948 14.307 9.15493 14.7999 7.59994 14.7999C3.6235 14.7999 0.399963 11.5764 0.399963 7.5999Z"/>
        </svg>
    )
};
