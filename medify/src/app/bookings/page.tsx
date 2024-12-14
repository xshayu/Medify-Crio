'use client';

import { useState, useEffect } from "react";
import type { Booking } from "@/models";
import { MyBookings } from "@/helpers";
import HospitalList from "@/components/HospitalList";

export default function BookingsPage() {
    const MyBookingsHelper = MyBookings();
    const [allBookings, setAllBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const allBookings = MyBookingsHelper.all();
        console.log('a', { allBookings });
        setAllBookings(allBookings);
    }, []);

    return (
      <HospitalList initialHospitals={allBookings} areBookings={true}  />
    );
  }
  