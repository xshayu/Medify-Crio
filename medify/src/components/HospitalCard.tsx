import type { Booking, Hospital } from "@/models";

export default function HospitalCard(props: { info: Hospital | Booking }) {
    const { info } = props;
    
    const isBooking = (info: Hospital | Booking): info is Booking => {
        return 'Date' in info;
    };

    return (
        <div>
            <p><b>{info["Hospital Name"]}</b></p>
            {isBooking(info) && `${info.Date} & ${info.Time}`}
        </div>
    )
}