'use client';

import { useState, useEffect } from "react";
import type { Booking } from "@/models";
import { MyBookings } from "@/helpers";
import SearchIcon from "@/components/SearchIcon";
import { FormEventHandler } from "react";
import HospitalCard from "@/components/HospitalCard";



export default function BookingsPage() {
    const MyBookingsHelper = MyBookings();

    const [hospital, setHospital] = useState('');
    const [allBookings, setAllBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [bookingIds, setBookingIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const allBookings = MyBookingsHelper.all();
        setAllBookings(allBookings);
        setBookingIds(new Set(allBookings.map(b => b._id)) as Set<string>);
    }, []);

    useEffect(() => {
      setFilteredBookings(
        hospital?.length ?
          allBookings.filter(thisBooking => {
            return thisBooking["Hospital Name"].includes(hospital) || thisBooking["Hospital Type"].includes(hospital)
          }) :
          allBookings
      );
    }, [hospital]);

    const handleSearchSubmission: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      setHospital(formData.get('search') as string);
    }


    return (
      <section style={{paddingTop: 'var(--app-nav-height)'}}>
        <h1>
          My Bookings
        </h1>
        <form className="my-2 flex gap-5 py-7 px-4" onSubmit={handleSearchSubmission}>
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
        {
          filteredBookings.map((thisBooking, key) =>
            <HospitalCard info={thisBooking} key={key} allBookingIds={bookingIds} />
          )
        }
      </section>
    );
  }
  