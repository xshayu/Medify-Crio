export interface Hospital {
    'Hospital Name': string;
    'Hospital Type': string;
    State: string;
    City: string;
};

export interface Booking extends Hospital {
    Date: string; // DD MMMM YYYY
    Time: string; // h:mm A
    _createdAt?: number; // unix timestamp
    _id?: string; // will use for easy querying, is `{Date}-{Time}` as bookings cant have same time
};

export interface HospitalCardProps {
    info: Hospital | Booking;
    allBookingIds?: Set<string>;
    showBookings?: boolean;
};