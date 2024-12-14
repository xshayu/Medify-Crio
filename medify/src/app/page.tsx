import Image from "next/image";
import LocationSetterForm from "@/components/LocationSetter";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  const nb = (title: string, img: string) => ({ title, img })
  
  const doctorsImgSrc = 'https://s3-alpha-sig.figma.com/img/7804/e5f2/776e41d6b125a1ff07effac37d6ff11b?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qVvHuIerSooHyJMFcfXf7L-GjleXwhXhCl5h3DghgQJcHluk6AAZqelGWsc-N1NHmIWX6fx2BYYEW4EVM0nnaaXJIHbS8~0xXFb8hgUHtVUbPQEyP3TBN9-jXf~wi-Mch~QIz9Q93C9w9MsO5kWLZBqkJH24pZvqGFCEDtQ7y1LST~7doM4sGUQyAhY8ZiVaZf3Z5F3byuuaJFm4~vt70CMyG4shp4Nngc6fNmBQDfY87yQaOh9NH4pZcdr~kimzqhnDZivhWmqDC2rqTJy4vy~iAE0GZOegYiOrtuPbQeBXUPCuyH5hTVTBsABBcUgi4GjIK~3UqokFW6Z5vzBplg__';
  const NAV_BUTTONS = [nb('Doctors', '/doctor.svg'), nb('Labs', '/drugstore.svg'), nb('Hospitals', '/hospital.svg'), nb('Medical Store', '/pill.svg'), nb('Ambulance', '/ambulance.svg')];

  return (
    <>

      <section id="landingSection" className="section-x-padding relative gradient-bg flex flex-col md:flex-row">

        <div className="md:w-1/2">
          <h1 className="main-heading">Skip the travel! Find Online<br />
            <span className="bigText">Medical <span className="text-primary">Centres</span></span>
          </h1>
          <p className="text-xl text-[#5C6169]">
            Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
          </p>
          <button className="btn mt-4">Find Centres</button>
        </div>
        
        <img id="doctorsImg" src={doctorsImgSrc} alt="Doctors for you" className="w-full md:w-1/2" />

        <div id="findCentre" className="w-full absolute left-0 bottom-[-10%] md:bottom-[-20%] section-x-padding z-[5]">
          <nav className="flex flex-col gap-6 py-6 md:py-12 px-3 md:px-8 bg-white rounded-2xl">
            <LocationSetterForm className="md:pl-[150px] md:justify-end" isLink={true} />
            <div>
              <p className="text-center text-xl font-medium mt-6 mb-4">You may be looking for</p>
              <div className="flex gap-2 md:gap-5 mt-2">
                {NAV_BUTTONS.map((navButton, key) =>
                  <button
                    className="aspect-square w-full flex flex-col items-center justify-center
                              gap-1 md:gap-4 rounded-lg text-[9px] md:text-lg
                              bg-[#FAFBFE] text-[#ABB6C7] border font-normal transition-all
                              hover:border-primary hover:bg-[#2AA7FF14] hover:text-primary hover:font-semibold"
                    key={key}
                  >
                    <img src={navButton.img} alt={navButton.title} className="h-1/4 md:h-1/3" />
                    <span>{navButton.title}</span>
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </section>

      <section className="section-padding-x pt-[40vh]">

      </section>

      <FaqSection />
    </>
  );
}
