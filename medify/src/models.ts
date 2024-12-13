export interface Hospital {
    'Hospital Name': string,
    'Hospital Type': string,
    State: string,
    City: string,
};

export interface Booking extends Hospital {
    Date: string,
    Time: string
};