import { Suspense } from 'react'; // , useState, useEffect
import HospitalList from '@/components/HospitalList';
import { fetchHospitals } from '@/helpers';
import type { Hospital } from '@/models';
import FaqSection from '@/components/FaqSection';

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function HospitalsPage(props: { params: Params, searchParams: SearchParams }) {
  const { state, city } = await props.searchParams as { city: string, state: string };
  let initialHospitals = [] as Hospital[];

  if (state?.length && city?.length) {
    const { hospitals } = await fetchHospitals(state, city);
    initialHospitals = hospitals;
  }

  return (
    <>
    <Suspense fallback={
      <h1 className="text-center">Loading Hospitals...</h1>
    }>
      <HospitalList initialHospitals={initialHospitals} initialState={state || ''} initialCity={city || ''} />
    </Suspense>
    <FaqSection />
    </>
  )
}
