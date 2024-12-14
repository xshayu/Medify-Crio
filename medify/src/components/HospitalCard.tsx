'use client';

import type { Booking, Hospital, HospitalCardProps } from "@/models";
import { useState } from "react";
import BookingSlots from "./BookingsSlots";

export default function HospitalCard(props: HospitalCardProps) {
    const [showBookings, setShowBookings] = useState(false);

    const { info, allBookingIds } = props;
    
    const isBooking = (info: Hospital | Booking): info is Booking => {
        return 'Date' in info;
    };

    const hospitalImgSrc = 'https://s3-alpha-sig.figma.com/img/4667/f883/b3e2f8072c3b5c69af5f4bb1596a887f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fqM2GefFz5QD3AzLxHetwqlFicWAKpImeRQ6uHSI1A6huD~jLVjEGVvLHbkg3TnmM0UsjCpIg94usCNaRNAyhDb3fclqWsnAXXzDmtmlTv1WYRzhj1rscfOiegNV0ep9deI~LqRRazPukC6ipGGGetBJxuQ5SmLqPluPswwn1ZpVhYKh~MVMNplOnNpqZ36YkIJ5DNTn1qq5y8itG82iqj46Hcc0hiSJDLd~sg8G8bSltI0MJhKaNtY8H1Y5IGc4WMKoyCkrYlnc-eMvmvh73iYeIA6Qgm8qP-psubeDujcsupCPFBrGZ4mogg0zY-lEGBJxXz4CfLVEkVHrzTX65w__';

    return (
        <article className="rounded-[15px] p-6 bg-white min-h-[--hospital-card-height]">
            <div className="flex flex-col md:flex-row">
                <div className="rounded-full bg-[#8CCFFF] flex items-center justify-center h-[124px] w-[124px]">
                    <img src={hospitalImgSrc} alt="Hospital Image" style={{height: '80px'}} />
                </div>
                <div className="flex flex-col gap-3 px-2">
                    <h1 className="text-xl font-semibold text-primary">{info["Hospital Name"]}</h1>
                    <p className="text-sm text-[#414146]">
                        <b>{info.State}, {info.City}</b><br />
                        {info["Hospital Type"]}<br />
                        <span className="text-[#02A401] font-bold">FREE</span>
                        <span className="line-through text-[#787887]">₹ 500</span>
                        <span className="text-[#414146]">Consultation fee at clinic</span>
                    </p>
                    <hr className="border-dashed border-[#E8E8F0]" />
                    <span className="py-1 px-2.5 bg-[#00A500] inline-flex items-center gap-1 rounded-[3.5px] w-fit">
                        <img src="/thumbsUp.svg" alt="Likes" />
                        <span className="text-sm opacity-50 text-white">5</span>
                    </span>
                </div>
                <div className={`flex gap-3.5 ${isBooking(info) ? 'flex-row' : 'flex-col items-center justify-end'}`}>
                    {
                        isBooking(info) ?
                        <>
                            <span className="py-2 px-3 text-primary border border-primary rounded-[3px]">
                                {info.Time}
                            </span>
                            <span className="py-2 px-3 text-[#00A500] border border-[#00A500] rounded-[3px]">
                                {info.Date}
                            </span>
                        </>
                        :
                        <>
                            <p className="text-[#00A500] font-medium">Available Today</p>
                            <button className="btn rounded-[4px] text-sm" onClick={(e) => setShowBookings(true)}>
                                Book FREE Center Visit
                            </button>
                        </>
                    }
                </div>
            </div>
            {!isBooking(info) &&
                <BookingSlots info={info} allBookingIds={allBookingIds} showBookings={showBookings} />
            }
        </article>
    )
}