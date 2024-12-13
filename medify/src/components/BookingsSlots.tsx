'use client';

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Booking, HospitalCardProps } from "@/models";
import { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import { MyBookings } from "@/helpers";
import { useRouter } from 'next/navigation';

dayjs.extend(customParseFormat);

interface day {
    date: dayjs.Dayjs;
    slots: {
        'Morning': string[];
        'Afternoon': string[];
        'Evening': string[];
    }
};

// Basically just generating random time slots for every day
export default function BookingSlots(props: HospitalCardProps) {
    const [showBookings, setShowBookings] = useState(false);
    const [dayIdx, setDayIdx] = useState(0); // Can go up to (7 - 1) = 6
    const router = useRouter();

    const MyBookingsHelper = MyBookings();

    const days: day[] = []; // generating all days from now to a week from now with random time slots

    const getRandomSlots = (startTime: string, endTime: string, thisDate: string) => { // both in h:mm A format, third in DD MMMM YYYY
        const slots = [];
        let currentTime = dayjs(startTime, 'h:mm A');
        const end = dayjs(endTime, 'h:mm A');
        
        while (currentTime.isBefore(end) || currentTime.isSame(end)) {
            const thisTime = currentTime.format('h:mm A');
            if (
                Math.random() < 0.4
                &&
                !props.allBookingIds?.has(MyBookingsHelper.getId({ Date: thisDate, Time: thisTime })) // includes only if _id doesn't exist
            ) {
                slots.push(thisTime);
            }
            currentTime = currentTime.add(30, 'minute');
        }
        
        return slots;
    };

    for (let i = 0; i < 7; i++) {
        const thisDayJs = dayjs().add(i, 'day');
        const thisDate = thisDayJs.format('DD MMMM YYYY');

        days.push({
            date: thisDayJs,
            slots: {
                'Morning': getRandomSlots('8:00 AM', '11:30 AM', thisDate),
                'Afternoon': getRandomSlots('12:00 PM', '4:30 PM', thisDate),
                'Evening': getRandomSlots('5:00 PM', '9:00 PM', thisDate)
            }
        })
    };

    const totalSlots = (day: day) => {
        const { Morning, Afternoon, Evening } = day.slots;
        return Morning.length + Afternoon.length + Evening.length;
    };

    const dateDisplayName = (date: dayjs.Dayjs) => { // gives Today, Tomorrow or "Fri, 5 May"
        let result = date.format('ddd, D MMM');
        if (dayjs().isSame(date, 'day')) result = 'Today';
        else if (dayjs().add(1, 'day').isSame(date, 'day')) result = 'Tomorrow';

        return result;
    };

    const createBooking = (slot: string, day: dayjs.Dayjs) => {
        const newBooking: Booking = {
            ...props.info,
            Date: day.format('DD MMMM YYYY'),
            Time: slot
        };
        MyBookingsHelper.create(newBooking);
        router.push('/bookings');
    }

    return (
        <div className="flex flex-col w-full">
            <button className="btn rounded-[4px]" onClick={(e) => setShowBookings(true)}>Book FREE Center Visit</button>
            {showBookings ?
                <>
                <div className="flex items-center gap-2">
                    <button onClick={() => setDayIdx(Math.max(0, dayIdx - 1))} className="flex items-center justify-center rounded-full border border-[#E0E0E4]">
                        <ArrowIcon fill="var(--primary)" className="transform -scale-x-100" />
                    </button>
                    <div className="flex-grow flex overflow-x-scroll">
                        {days.map((d, index) =>
                            <button onClick={() => setDayIdx(index)} className="py-3 text-center basis-1/3 flex-shrink-0" key={index}>
                                <p style={{lineHeight: '22.4px'}} className={dayIdx == index ? 'font-bold' : ''}>
                                    {dateDisplayName(d.date)}
                                </p>
                                <p className="text-[#01A400] text-xs">
                                    {totalSlots(d)} Slots Available
                                </p>
                            </button>
                        )}
                    </div>
                    <button onClick={() => setDayIdx(Math.min(6, dayIdx + 1))} className="flex items-center justify-center rounded-full border border-[#E0E0E4]">
                        <ArrowIcon fill="var(--primary)" />
                    </button>
                </div>
                {
                    ['Morning', 'Afternoon', 'Evening'].map((timing, key) => 
                        <div className={`flex ${key == 1 ? 'border-y border-[#F0F0F5]' : ''}`} key={key}>
                            <span className="text-center py-7 px-12">
                                {timing}
                            </span>
                            <div className="flex items-center gap-3 md:gap-8 overflow-x-auto">
                                {days[dayIdx].slots[timing as 'Morning' | 'Afternoon' | 'Evening'].map((slot, key) =>
                                    <button
                                        onClick={() => createBooking(slot, days[dayIdx].date)}
                                        title="Book Appointment"
                                        className="border border-primary rounded-[3px] text-primary text-sm py-2 px-3"
                                        key={key}
                                    >
                                        {slot}
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                }
                </>
                :
                <div> {/* Likes */}
                    <span className="py-1 px-2.5 bg-[#00A500] inline-flex items-center gap-1 rounded-[3.5px]">
                        <img src="/thumbsUp.svg" alt="Likes" />
                        <span className="text-sm opacity-50">5</span>
                    </span>
                </div>
            }
        </div>
    )
}