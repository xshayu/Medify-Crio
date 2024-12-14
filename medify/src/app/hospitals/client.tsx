'use client';

import LocationSetterForm from "@/components/LocationSetter";
import HospitalCard from "@/components/HospitalCard";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchHospitals } from "./utils";
import { MyBookings } from "@/helpers";
import type { Hospital } from "@/models";

interface Props {
    initialHospitals: Hospital[];
    initialState: string;
    initialCity: string;
}

export function HospitalList({ initialHospitals, initialState, initialCity }: Props) {
    'use client';

    const router = useRouter();
    const [location, setLocation] = useState({ 
        state: initialState, 
        city: initialCity 
    });
    const [listLoading, setListLoading] = useState(false);
    const [list, setList] = useState<Hospital[]>(initialHospitals);
    const [bookingIds, setBookingIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const allBookings = MyBookings().all();
        setBookingIds(new Set(allBookings.map(b => b._id)) as Set<string>);
    }, []);
    

    async function clientFetchHospitals({ city, state }: { city: string, state: string }) {
        setListLoading(true);

        const { hospitals, success } = await fetchHospitals(state, city);
        setList(hospitals);
        if (success) {
            const params = new URLSearchParams();
            params.set('state', state);
            params.set('city', city);
            router.push(`?${params.toString()}`, { scroll: false });
            setLocation({ state, city });
        };

        setListLoading(false);
    };

    const oralDaysrc = 'https://s3-alpha-sig.figma.com/img/1fe6/7356/75bf68ac8b03b8adc3d5939338d5479e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mbmpbSk5ONok-wgqzB8iMYEH0Ol~E3y9uGWCscbjnBdLdVfySPx6HjFBPDxKzb74oM1c~kntwuUgmaXEvorYHYc8EwJ-rwqiny1tZfRveRmgWWXH-VxBXDlhuZLtNAtA7JNAbzsfIUBit7j9nBJKuvxo1R--XGw2NJkR2RqN0OftrCQm9ncknYh-rGp5Rc46LcfAtPEUUeo-NdnzyeOYnYOvELzCSrS8tr0apsLTYO9DrD2Qz-MABgkpu6~r1fJaMXQ84eevAHr~UCBLHl4uIcW9b9g~U7OyMGDe1z-rjndk74N-jgCReokNITgLoRBMQwy-gnIUdC1ROupFRGUxYQ__';

    return (
        <>
        <section id="hospitalNavSection" className="rounded-b-[16px] section-x-padding relative w-full">
            <div className="absolute left-0 bottom-[-30px] w-full section-x-padding">
                <LocationSetterForm
                    className="bg-white rounded-[15px] p-6 w-full location-form-shadow"
                    grow={true}
                    onSubmit={clientFetchHospitals}
                    initialState={initialState}
                    initialCity={initialCity}
                />
            </div>
        </section>
        <section className="section-x-padding gradient-bg pt-[100px]">
            <p className="text-2xl mt-6">
                {!location.city!! && 'Search for hospitals'}
                {location.city && location.state && (
                    listLoading ? 
                    'Searching...' : 
                    `${list.length} medical centres available in ${location.city}, ${location.state}`
                )
                }
            </p>
            <div className="flex items-center gap-7">
                <img src="/verifiedGrey.svg" alt="Verified" />
                <p className="text-[#787887]">Book appointments with minimum wait-time & verified doctor details</p>
            </div>
            <div className="flex flex-col md:flex-row-reverse gap-6 pt-4 pb-[100px]">
                <img
                    src={oralDaysrc}
                    alt="Oral Day"
                    className={`object-cover h-[--hospital-card-height] rounded-[15px] ${list.length ? 'md:w-1/4 ' : ''}`}
                    style={{objectPosition: 'top left'}}
                />
                <div className="flex flex-col gap-2 flex-grow overflow-hidden">
                    {list.map((hospital, index) => (
                        <HospitalCard key={index} info={hospital} allBookingIds={bookingIds} />
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}