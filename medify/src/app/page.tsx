import Image from "next/image";
import LocationSetterForm from "@/components/LocationSetter";
import FaqSection from "@/components/FaqSection";
import SwiperCarousel from "@/components/SwiperCarousel";

export default function Home() {
  const nb = (title: string, img: string) => ({ title, img })
  
  const doctorsImgSrc = 'https://s3-alpha-sig.figma.com/img/7804/e5f2/776e41d6b125a1ff07effac37d6ff11b?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qVvHuIerSooHyJMFcfXf7L-GjleXwhXhCl5h3DghgQJcHluk6AAZqelGWsc-N1NHmIWX6fx2BYYEW4EVM0nnaaXJIHbS8~0xXFb8hgUHtVUbPQEyP3TBN9-jXf~wi-Mch~QIz9Q93C9w9MsO5kWLZBqkJH24pZvqGFCEDtQ7y1LST~7doM4sGUQyAhY8ZiVaZf3Z5F3byuuaJFm4~vt70CMyG4shp4Nngc6fNmBQDfY87yQaOh9NH4pZcdr~kimzqhnDZivhWmqDC2rqTJy4vy~iAE0GZOegYiOrtuPbQeBXUPCuyH5hTVTBsABBcUgi4GjIK~3UqokFW6Z5vzBplg__';
  const NAV_BUTTONS = [nb('Doctors', '/doctor.svg'), nb('Labs', '/drugstore.svg'), nb('Hospitals', '/hospital.svg'), nb('Medical Store', '/pill.svg'), nb('Ambulance', '/ambulance.svg')];

  const promoSrc1 = 'https://s3-alpha-sig.figma.com/img/de86/24e6/39f85edb6078e19d7a6e7fdbb9054f70?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hvc2k6GTfhBy~w8RJSXBMysOI5QoXau4LwVAsB3pFxtywltGt5IxdUFDg1atuoPb2nqIBD121cedvwJrZOxLtwHDHtfTEjZq6PVPbimbM7bAj5HeqQOkjKfCvFbOjApWqeeLvk7momDU~rbH~kwFW01RH9W7P6~nx3UpAehz9jYQ46W0TBZuasIbgVYrU-9CyJMS~ZgcRRrPvPsDmYUNXcKxXyJHY8GYPXa3ik1pvFNvoEgJFTSHcB6ugMuN~S2F8hf-gpdoSYvYLYhOOU-EBsi-cssyGb~gyjwbjFA-z9pPAyFUgHvnlGjKghC9G5zDOH9f4NUKx1H1AhfZMX1vpw__';
  const promoSrc2 = 'https://s3-alpha-sig.figma.com/img/b284/93da/72ad49e23d6d55549e1b5970acfba4c0?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LGHU9cyJ4VyDwKsj-dbw3EoVEMtzpJdaSoKDQrHiiJH17VFK7DQoYtlWhuzUHCCPKzBTewKK3Bn8hJld6N0BkcqYl1UUQy0snJPzbJSvAUPMRVg1eH5JownpZuczXnP8~9frwdyGhuPkk2FUXeX8hSN2vDdhkQm02tX1Iv8Ta1AdlgX8DCHYbJbZALBLiqO2W0wK7BojY2MZObZgf~ePYJo--0r70pG77AfjQjinjab8BFiHFflYfXwUJ72s3cQmyej3~aceXGyPoxIeTD0VQetLRnfrj1Gi9R6ptmwZhglV44M73xmD2YBv75DyOwX3g1QXH2y3N-bm9gs3zO40JQ__';
  const PROMO_IMAGES = Array.from({length: 6}, (_, i) => i % 2 ? promoSrc1 : promoSrc2);

  const dt = (name: string, speciality: string, img: string) => ({name, speciality, img});
  const rawDoctors = [
    dt('Dr. Lesley Hull', 'Medicine', 'https://s3-alpha-sig.figma.com/img/3e4b/e101/ba0f7061449d5a8b7480b8472e68f077?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C7MEoT5LX88cGKwFhwxCEnVj4~MESaUl6xPS3D~9~IGxTVFLD1DQzDyJU-4rg6cYqB8vN04t6gKe3q4wJ3NXpL7f5x4opmAp-SQzSIIJbbS401W~HQ8SLAUo7PnIfVEI2YSmvdmyJArUm-fZP0lDQqN07IdcB2BXCO38KZ-La8PU3IlqszspW79BWbjwJ4x1z7kmKitKTC-XgkoSNhJ62V~cij0QPdQHge1GB3QqwtKkmDiAHpbdEc3N237N5~pE9W4zplpNB5bnrPdxeb6Hv~3XCb9nb6jXg7qHRIB905v6eHdwWEImBJG9VIy2VsGN8u8XsMPyQrzscJQu6J1LnA__'),
    dt('Dr. Ahmad Khan', 'Neurologist', 'https://s3-alpha-sig.figma.com/img/6f24/e1db/3aec5da26ceba574fbcd4af774a9fcce?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DheTxkTO0rdJS8X~ICoADxoUhK92TzXz0vcZCqFLwOCoFKrzisHYFz-MYyX1BHuAGrXx1jinvLUaijfgvlI5qvQYH-MYOVxlw4BcywL~p-Klf3M6yqfi~W-HUVpKAfd6oa8zu3-tqbHfjbdgk5~Dvsd52sxSuDdBkwknAcLtV4OeUhMDMYDaal3IZw5Jdv6upj5cJ4LApSxh4-gzDvc2RpEtWldPeOyi5jeNGipXtp4ZTBRlwrzIX5E-Wshpt8wjQxHhW4laKxnHqEIaWw~cC5Qm7J920BnN~7SeSEot3AWPSWBzCH1eG~fbjffboQftj6HEE7DVly3KYT~O27BELQ__'),
    dt('Dr. Heena Sachdeva', 'Orthopedics', 'https://s3-alpha-sig.figma.com/img/aefc/f6fd/6b77b4fb406b27286405d9c90a02fc40?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fk6ca2Tb3FpEJHsKZXX0atwtVpHA8qjqkL7nHDAmF8NaPgvplAUf1KD1b~MJNODCBdJs8WH3UJDmnzDiM4dh-UUHhMHZYshg6ZwEZ7GcktmkggkKetyDo3eqV-z6-5fxNgL5MkS1r3dUu2r0gdPFj-D8M4Ru5v-0fxFTENIZHcr1KYByVwTFHz~qM3nbfN1x08kjpvD1mCTiLP9EOuQh4Bvkw7WJoyROVIu6hlxMFdDtVZfTIB0MmNNxIq-mcvCdeKGMLCeI5o14w7WQAyc492sphkTjGyh3YpYC0-k5Oj9quawXAA8g~L21kTZu~fUj2PMyD75s6b8dv4mOka5Bgw__'),
    dt('Dr. Ankur Sharma', 'Medicine', 'https://s3-alpha-sig.figma.com/img/513a/3e3c/ee64bd2ca73922e15985b5325d529341?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dn6lSFil-qzPLjA8j4Lnfl-U0PU55DO7mHJ2NsXAEYOEj-n-pbWYD-9PwoYN3NnSI0Go7CGsWYqQaQJrZV-YvT-6qNIs82e~9fJl4vxuztCRMxoSmI64tyyU6MbCpUYSoSSFjv1myaJAyah-Qv87s7IskBnQEziCG9WqnvdrmD18o0I8Xe5FgOzs~AMBYpjIm6QJoSjMOTUNnHuAIdskc-jPbPKOEK1kbVwO4r83GvMkjogatppELp4fFvLYynUiHUFsPCb-lBXvt~ZMw2NRTRmeq-qRn7wvMnjePuni0KlmAi1VQZoGLFeRLqoxUS3maKJ38yaREtZhFPZJ0qajhQ__'),
    dt('Dr. Ahmad Stevans', 'Knee Surgeon', 'https://s3-alpha-sig.figma.com/img/d083/211a/994ab110965c1f350e6de92b3a2da0c2?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VgUX6qBSPVmU5xg~XXFfM~9gzDeaDi0XlbYPsMxo1Y4qqmdPLFVniOTj2LAdCUCG~QGVyl6YHiVXoP1VIiyKdtjbLmkgKFhbmiX1tt2QfWMSTszevL16HFozsu~eFn7LQNQIBJ3-dFxVoJuzbSMFZgRUcHQT5YLwkKx7AUdac7s7P~-AAAP-hQ1yapVn1ut7ujuKkvRboAQV2p1gWS9NpDsWo5swtX4dKbXiQfX-8cgVai7I1KfS-32L~fVvVrGQRoqqUr0QXgQXdGMu-MXXn9uxz6o9hUYT9Uuaw4ns4KHbpDgr7IrJ8H6GNYkYCz5~FID5qd0BarBl0n0q-gkPPA__')
  ];
  const DOCTORS = [...rawDoctors, ...rawDoctors, ...rawDoctors];

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

      <section id="promoImages" className="section-x-padding pt-[15vh] md:pt-[40vh] pb-4">
        <SwiperCarousel
          slidesPerView={{ mobile: 1.5, desktop: 3 }}
          spaceBetween={16}
        >
          {
            PROMO_IMAGES.map((src, key) => 
              <div className="rounded-lg overflow-hidden" key={key}>
                <img
                  src={src}
                  alt="Promotional"
                  className="h-[15vh] md:h-[25vh] w-full object-cover"
                />
              </div>
            )
          }
        </SwiperCarousel>
      </section>

      <section id="medicalSpecialists" className="py-16">
          <h1 className="section-heading text-center mb-8">
            Our Medical Specalists
          </h1>
          <SwiperCarousel
            slidesPerView={{ mobile: 2, desktop: 5 }}
            spaceBetween={10}
          >
            {
              DOCTORS.map((doc, key) => 
                <div className="flex flex-col items-center gap-1" key={key}>
                  <div className="doctor-frame h-[40vh] w-full flex flex-col items-center justify-end">
                    <img src={doc.img} alt={doc.name} className="max-h-[90%] max-w-[90%] h-auto w-auto" />
                  </div>
                  <p className="text-lg text-secondary text-center">{doc.name}</p>
                  <p className="text-primary text-center">{doc.speciality}</p>
                </div>
              )
            }
          </SwiperCarousel>
      </section>

      <FaqSection />
    </>
  );
}
