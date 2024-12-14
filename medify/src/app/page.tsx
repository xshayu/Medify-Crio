import Image from "next/image";
import LocationSetterForm from "@/components/LocationSetter";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <>
      <section style={{paddingTop: 'var(--app-nav-height)'}}>
        <h1>Home</h1>
        <LocationSetterForm className="my-2" isLink={true} />
      </section>
      <FaqSection />
    </>
  );
}
