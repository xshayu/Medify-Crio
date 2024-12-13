import type { Booking } from "./models";

export function MyBookings() { // bookings helper functions
    const all = () => {
        const data = window.localStorage.getItem('bookings');
        return data ? JSON.parse(data) as Booking[] : [];
    };
    const getId = (booking: { Date: string, Time: string }) => {
        return `${booking.Date}-${booking.Time}`;
    };
    const create = (booking: Booking) => {
        const allBookings = all();
        const _id = getId(booking);
        if (allBookings.findIndex((val) => val._id == _id) !== -1) { // avoiding race conditions of different tab activity
            console.warn('Booking of this date-time ' + _id + ' exists already.');
            return;
        } else {
            booking._createdAt = new Date().valueOf();
            allBookings.push(booking);
            window.localStorage.setItem('bookings', JSON.stringify(allBookings));
        }
    };
 
    return {
        all,
        getId,
        create
    }
};