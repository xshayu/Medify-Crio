'use client';

import { useBookings } from "@/stores/useBookingsStore";
import HospitalList from "@/components/HospitalList";

export default function BookingsPage() {
  const { bookings } = useBookings()

  return (
    <HospitalList initialHospitals={bookings} areBookings={true} />
  )
}
  