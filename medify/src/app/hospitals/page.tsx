import { Suspense } from 'react';
import { HospitalList } from './client';
import { fetchHospitals } from './utils';
import type { Hospital } from '@/models';

export default async function HospitalsPage({ searchParams }: { searchParams: { state?: string; city?: string }}) {
  let initialHospitals: Hospital[] = [];

  const { state, city } = await searchParams;

  if (state && city) {
    const { hospitals } = await fetchHospitals(state, city);
    initialHospitals = hospitals;
  };

  return (
    <section style={{paddingTop: 'var(--app-nav-height)'}}>
      <h1>Hospitals</h1>
      <Suspense fallback={<p>Loading hospitals...</p>}>
        <HospitalList initialHospitals={initialHospitals} initialState={state || ''} initialCity={city || ''} />
      </Suspense>
    </section>
  )
}
