import { Suspense } from 'react';
import HospitalList from '@/components/HospitalList';
import { fetchHospitals } from '@/helpers';
import type { Hospital } from '@/models';
import FaqSection from '@/components/FaqSection';

export default async function HospitalsPage({ searchParams }: { searchParams: { state?: string; city?: string }}) {
  let initialHospitals: Hospital[] = [];

  const { state, city } = await searchParams;

  if (state && city) {
    const { hospitals } = await fetchHospitals(state, city);
    initialHospitals = hospitals;
  };

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
