import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Booking } from '@/models'

interface BookingsState {
  bookings: Booking[];
  getBookingId: (booking: { Date: string; Time: string }) => string;
  createBooking: (booking: Booking) => void;
  getAllBookings: () => Booking[];
  isSlotBooked: (date: string, time: string) => boolean;
}

let bookingIdsCache: Set<string> | null = null;

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      
      getBookingId: (booking) => {
        return `${booking.Date}-${booking.Time}`
      },
      
      createBooking: (booking) => {
        set((state) => {
          const bookingId = get().getBookingId(booking);

          const currentIds = bookingIdsCache || new Set(state.bookings.map(b => get().getBookingId(b)))
          
          if (currentIds.has(bookingId)) {
            console.warn(`Booking ${bookingId} already exists`)
            return state
          }
          
          const newBooking = {
            ...booking,
            _createdAt: new Date().valueOf(),
            _id: bookingId
          }

          currentIds.add(bookingId)
          bookingIdsCache = currentIds
          
          return {
            bookings: [...state.bookings, newBooking],
          }
        })
      },
      
      getAllBookings: () => {
        return get().bookings
      },
      
      isSlotBooked: (date, time) => {
        const state = get();
        if (!bookingIdsCache) {
          bookingIdsCache = new Set(state.bookings.map(b => state.getBookingId(b)))
        }
        return bookingIdsCache.has(state.getBookingId({ Date: date, Time: time }))
      }
    }),
    {
      name: 'bookings-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
)

export function useBookings() {
    const bookings = useBookingsStore(state => state.bookings)
    const createBooking = useBookingsStore(state => state.createBooking)
    const isSlotBooked = useBookingsStore(state => state.isSlotBooked)
    
    return {
      bookings,
      createBooking,
      isSlotBooked,
    }
}