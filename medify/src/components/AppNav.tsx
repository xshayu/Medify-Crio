'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AppNavHeader() {
    const path = usePathname();
    const LINK_NAMES = ['Find Doctors', 'Hospitals', 'Medicines', 'Surgeries', 'Software for Provider', 'Facilities'];

    return (
        <nav className={`h-[--app-nav-height] absolute w-full section-x-padding flex justify-between items-center ${path == '/' ? '' : 'bg-white'}`}>
            <Link href="/">
                <img src="/medifyLogo.svg" alt="Medify Logo" style={{ height: '27px', width: 'fit-content' }} />
            </Link>
            <div className="flex items-center gap-6 md:gap-10 h-full">
                {LINK_NAMES.map((linkName, key) => 
                    linkName == 'Hospitals' ? 
                        <Link
                            key={key}
                            href="/hospitals"
                            className={`text-sm h-full flex items-center justify-center border-solid border-y-[6px] border-transparent ${path == '/hospitals' ? 'border-b-primary' : ''}`}
                        >
                            Hospitals
                        </Link> :
                        <a
                            key={key}
                            href="#"
                            className={`text-sm h-full hidden md:flex items-center justify-center border-solid border-y-[6px] border-transparent ${path == `/${linkName.toLocaleLowerCase()}` ? 'border-b-primary' : ''}`}
                        >
                            {linkName}
                        </a>
                )}
                <Link href="/bookings" className="btn text-sm">
                    My Bookings
                </Link>
            </div>
        </nav>
    )

}