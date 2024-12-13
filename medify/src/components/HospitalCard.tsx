import type { Booking, Hospital, HospitalCardProps } from "@/models";
import BookingSlots from "./BookingsSlots";

export default function HospitalCard(props: HospitalCardProps) {
    const { info, allBookingIds } = props;
    
    const isBooking = (info: Hospital | Booking): info is Booking => {
        return 'Date' in info;
    };

    return (
        <div className="p-4 rounded border-2 border-black">
            <p><b>{info["Hospital Name"]}</b></p>
            {isBooking(info) ?
                <p>{info.Date} & {info.Time}</p>
                :
                <BookingSlots info={info} allBookingIds={allBookingIds} />
            }
        </div>
    )
}