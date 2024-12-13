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
    }

    return (
        <>
            <LocationSetterForm grow={true} className="my-2" onSubmit={clientFetchHospitals} initialState={initialState} initialCity={initialCity} />
            {location.city && location.state && (
                listLoading ? 
                <p>Loading...</p> : 
                <p>{list.length} medical centres available in {location.city}, {location.state}</p>
            )}
            <div className="flex flex-col gap-2">
                {list.map((hospital, index) => (
                    <HospitalCard key={index} info={hospital} allBookingIds={bookingIds} />
                ))}
            </div>
        </>
    )
}