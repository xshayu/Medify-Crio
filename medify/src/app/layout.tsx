import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import type { CSSProperties, FormEvent } from 'react';
import ClientForm from '@/components/ClientForm';

const PoppinsFont = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Medify Crio",
  description: "This is a takehome assignment for Crio, done by Ayush Wardhan (Xylar)",
};

function MobileAppPreview({ style }: { style: CSSProperties }) {
  const mobileFrameUrl = 'https://s3-alpha-sig.figma.com/img/6809/90cf/89195b86da2d6e512393a9734fd116d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oRv0QNyJChzkTTUd7-QMcRvKLDZPEHNUZAU3ddqwJnjpzkrCmwUcr9yO6R-wtml9UBy-29XQ-7oIg3FpZmSwDqaaKbM--XscXKjjeMdqwgXI-odOfWIOqequXv5a-AsAvv8WfZd0WIzF-e3E8NnVytdi2Idp6ofqEhOOzPViWOj30KUgWuAUqzh8-T3jVfhDMbq0IkX8aSo4fwUkMITKr44G90clZzIOjjvXkGkmkkvFmF3~E20~-Mx6MtJssQ-1jmpD1XngEpJgJyYoUTbwbvSgd1dclSihh0JoaWLTU~6~id8BSG3tv2aCL8tlsLRFVA1z-Ec5AI~30MjrnNOsSg__';
  const mobileAppImgUrl = 'https://s3-alpha-sig.figma.com/img/cd7a/141a/3f2225b1820012068980e6ed1a5ae7f7?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qj-ko~BPVKygACyDj-XKhxuBgXfg132O0B8CZS5ElS5Jdp8bpWIm0S1CA~HbVeEmPRMu3P9gFdW2e5ujVn6yA7f291xXtj-O85lom6U~YqV-ytFxvEpAsQr-e0BRohjR022iZJBBDAmeK2uanlNrR27QButy8O6dlHdZyzi~YeWLv6Ld1bdrtFsYXvQU7lPNFDPV8otPFYwzp1Q-W9PV9cDDdG1y8mR8nSFkdreIu5PgoEXLcOBTekTrAcg8BbY19547phRrFjkDeCLe7ZU5E-6BN2KTuMkSuQ~9fM48ifSNk0xX9Rjdabq6YDzTZg2oAolBma7qCIC~HwQlA6iLqA__';

  return (
    <div
      style={{
        ...style,
        width: '60%',
        position: 'absolute',
      }}
    >
      <div // The App's image. This figma asset is pretty tough to work with
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          padding: '30px 10px',
          zIndex: '-1',
          backgroundClip: 'content-box !important',
          background: `url(${mobileAppImgUrl}) no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: '49.5%'
        }}
      >

      </div>
      <img // The mobile frame
        src={mobileFrameUrl}
        alt="Mobile App Preview"
        style={{
          width: '100%',
        }}
      />
    </div>
/*     <img
      src={mobileFrameUrl}
      alt="Mobile App Preview"
      style={{
        ...style,
        width: '60%',
        position: 'absolute',
        background: `url(${mobileAppImgUrl}) no-repeat`,
        backgroundSize: '95% 92%',
        backgroundPosition: '50% 55%'
      }}
    /> */
  )
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={PoppinsFont.className}
      >

        <div className="text-center bg-primary text-white h-[40px] text-[14px] hidden md:flex items-center justify-center"> {/* Hidden in mobile because text is too long */}
          The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
        </div>

        {children}

        <section className="gradient-bg h-[850px] md:h-[542px] pt-[41px] flex flex-col-reverse md:flex-row justify-center items-center overflow-clip gap-4">
          <div className="relative top-[20px] h-full w-full md:w-1/3">
            <MobileAppPreview style={{ top: '0px', right: '0px' }} />
            <MobileAppPreview style={{ bottom: '-30vh', left: '0px' }} />
          </div>
          <div className="flex items-start">
            <img
              alt="Arrow to link"
              src="/arrow.svg"
              style={{
                transform: 'rotate(-5deg)',
                opacity: '0.8',
                marginTop: '45px'
              }}
            />
            <div className="flex flex-col gap-2 pl-4">
              <h1 className="section-heading">Get the<br /><span className="text-primary">Medify</span> App</h1>
              <p>Get the link to download the app</p>
              <ClientForm className="flex flex-col md:flex-row justify-between w-full md:w-[528px] text-[14px] font-bold gap-4">
                <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFBFE] flex overflow-clip flex-grow h-[50px]">
                  <span className="flex items-center justify-center h-full aspect-square border-r border-[#B4B4BE4D]">
                    +91
                  </span>
                  <input name="phone" placeholder="Enter phone number" className="pl-[20px] w-full" />
                </div>
                <button className="btn">Send SMS</button>
              </ClientForm>
              <div className="flex flex-col md:flex-row gap-2 md:gap-[26px] md:mt-14">
                <img
                  alt="Google Play"
                  src="https://s3-alpha-sig.figma.com/img/f21a/8caa/cc3e4dc3a228882459de2a4d49e45055?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R3dBSGla2XdlAviMYXFy6ZgXEw8cDK0Y2xiQ6XkLKLNQ05w503ary~2~433reRMVLjFcoz72MNmzAK2SVFuS~u9NqJ5Sfq9DpBurkxRh1ufR3BkRmIvAlKPTa1EtFsIf49lHRWDBtSwrcYnOZfqUCasXtaffg-hALd~kX0VwD0dXubM0ZHrlyahVDWVL9UC3b1asPV28OdZ-hN9bDXcNpJ8Rg0mg0pQ2P3j6paLOGqhVTzKkeJk-Jaxwk0VW6QOM09R~jGanbfEiqQktBPAUmD~XfdMi~38LG2ySqGOpyS-2Ob8-XR~YmTlemB9cpWMpM7i4tIS1RH6pa6w-6lzx8g__"
                  style={{ height: '69px' }}
                />
                <img
                  alt="Apple Store"
                  src="https://s3-alpha-sig.figma.com/img/560b/7f8f/cb4223c4079dc306eb83f5c12e95e22f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ti10XwGiULZ~XzyP4ri2ZpytKPNNFyYGsHAgwyxU0ASrWbF6WfGimj1~D0Dbd~Fz5WHwq~TVw0VOg59QygftDhMnyPDxaVQJSwzVS0nAWvfGyMvt69g2rmOW5TjuoJJypYJJZQ84-phV~Gk5VwSyYAsJV7LFBBLHJ6q3O3YBYEChDLyvTjmdf09BLInnlB6I5k1fRdMdt-nN7IzonZOP9i4LbMmsFwJsIvkk19D~3F~rZePyOmGi4kOTYBF0~QJ3k~pH0iq8RQGGFN0Wzs-Usz6igJUlu2Vvr~62OVnRQpjBLUott1hb-I9He83lkAjiNK8RrZqf5PG-3i4lQkOe5Q__"
                  style={{ height: '69px' }}
                />
              </div>
            </div>
          </div>
        </section>

      </body>
    </html>
  );
}
