'use client';

import LocationSetterForm from "@/components/LocationSetter";
import HospitalCard from "@/components/HospitalCard";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { MyBookings, fetchHospitals } from "@/helpers";
import type { Hospital } from "@/models";
import type { FormEventHandler } from 'react';
import SearchIcon from "./SearchIcon";

interface Props {
    initialHospitals: Hospital[];
    initialState?: string;
    initialCity?: string;
    areBookings?: boolean;
}

export default function HospitalList({ initialHospitals, initialState = '', initialCity = '', areBookings = false }: Props) {
    const router = useRouter();
    const [location, setLocation] = useState({ 
        state: initialState, 
        city: initialCity 
    });
    const [listLoading, setListLoading] = useState(false);
    const [list, setList] = useState<Hospital[]>(initialHospitals); // or bookings if areBookings
    const [bookingIds, setBookingsIds] = useState<Set<string>>(new Set());
    const [hospital, setHospital] = useState(''); // This is for searching within bookings page

    useEffect(() => {
        console.log(list);
        if (!areBookings) {
            const allBookings = MyBookings().all();
            setBookingsIds(new Set(allBookings.map(b => b._id)) as Set<string>);
        }
    }, []);

    useEffect(() => { // filtering bookings
        if (areBookings) {
            setList(
                hospital?.length ?
                initialHospitals.filter(thisBooking => {
                    return thisBooking["Hospital Name"].includes(hospital) || thisBooking["Hospital Type"].includes(hospital)
                }) :
                initialHospitals
            );
        }
    }, [hospital, initialHospitals]);

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

    const handleBookingSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setHospital(formData.get('search') as string);
    }

    const oralDaysrc = 'https://s3-alpha-sig.figma.com/img/1fe6/7356/75bf68ac8b03b8adc3d5939338d5479e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mbmpbSk5ONok-wgqzB8iMYEH0Ol~E3y9uGWCscbjnBdLdVfySPx6HjFBPDxKzb74oM1c~kntwuUgmaXEvorYHYc8EwJ-rwqiny1tZfRveRmgWWXH-VxBXDlhuZLtNAtA7JNAbzsfIUBit7j9nBJKuvxo1R--XGw2NJkR2RqN0OftrCQm9ncknYh-rGp5Rc46LcfAtPEUUeo-NdnzyeOYnYOvELzCSrS8tr0apsLTYO9DrD2Qz-MABgkpu6~r1fJaMXQ84eevAHr~UCBLHl4uIcW9b9g~U7OyMGDe1z-rjndk74N-jgCReokNITgLoRBMQwy-gnIUdC1ROupFRGUxYQ__';

    return (
        <>
        <section id="hospitalNavSection" className="rounded-b-[16px] section-x-padding relative w-full">
            <div className="absolute left-0 bottom-[-30px] w-full section-x-padding flex flex-col md:flex-row gap-8 items-center">
                {
                    areBookings &&
                    <div className="basis-1/3">
                        <h1 className="section-heading text-white whitespace-nowrap">
                            My Bookings
                        </h1>
                    </div>
                }
                {
                    areBookings ?
                    <form
                        className="bg-white rounded-[15px] p-6 w-full location-form-shadow
                                my-2 flex gap-5 py-7 px-4"
                        onSubmit={handleBookingSearch}>
                        <input
                            name="search"
                            type="text"
                            placeholder="Search By Hospital"
                            className="p-4 bg-[#FAFBFE] text-sm rounded-lg flex-grow border border-[#F0F0F0]"
                        />
                        <button type="submit" className="btn flex items-center justify-center gap-[6px]">
                        <SearchIcon fill='white' />
                        <span>Search</span>
                        </button>
                    </form>
                    :
                    <LocationSetterForm
                        className="bg-white rounded-[15px] p-6 w-full location-form-shadow"
                        grow={true}
                        onSubmit={clientFetchHospitals}
                        initialState={initialState}
                        initialCity={initialCity}
                    />
                }
            </div>
        </section>
        <section className="section-x-padding pt-[100px]" style={{ background: 'linear-gradient(81deg, #EFF5FE 9.01%, rgba(241, 247, 255, 0.47) 89.11%)' }}>
            <p className="text-2xl mt-6">
                {!(location.city?.length && areBookings) && 'Search for hospitals'}
                {location.city && location.state && (
                    listLoading ? 
                    'Searching...' : 
                    `${list.length} medical centres available in ${location.city}, ${location.state}`
                )
                }
            </p>
            {
                !areBookings && 
                <div className="flex items-center gap-7 pb-2">
                    <img src="/verifiedGrey.svg" alt="Verified" />
                    <p className="text-[#787887]">Book appointments with minimum wait-time & verified doctor details</p>
                </div>
            }
            {
                list?.length > 0 && 
                <div className="flex flex-col md:flex-row-reverse gap-6 pt-4 pb-[100px]">
                    <img
                        src={oralDaysrc}
                        alt="Oral Day"
                        className={`object-cover h-[--hospital-card-height] rounded-[15px] ${list.length ? 'md:w-1/4 ' : ''}`}
                        style={{objectPosition: 'top left'}}
                    />
                    <div className="flex flex-col gap-6 flex-grow overflow-hidden">
                        {list.map((hospital, index) => (
                            <HospitalCard key={index} info={hospital} allBookingIds={bookingIds} />
                        ))}
                    </div>
                </div>
            }
        </section>
        </>
    )
}