'use client';

import { Suspense, useState, useEffect } from 'react';
import HospitalList from '@/components/HospitalList';
import { fetchHospitals } from '@/helpers';
import type { Hospital } from '@/models';
import FaqSection from '@/components/FaqSection';
import { useSearchParams } from 'next/navigation'

function HospitalsInformation() {
  const [initialHospitals, setInitialHospitals] = useState<Hospital[]>([]);

  const searchParams = useSearchParams();
  const state = searchParams.get('state');
  const city = searchParams.get('city');

  const fetchInitialHospitals = async (state: string, city: string) => {
    const { hospitals } = await fetchHospitals(state, city);
    setInitialHospitals(hospitals);
  };

  useEffect(() => {
    if (state && city) fetchInitialHospitals(state, city);
  });

  return (
      <HospitalList initialHospitals={initialHospitals} initialState={state || ''} initialCity={city || ''} />
  )
};

export default function HospitalsPage() {
  return (
    <>
    <Suspense fallback={
      <h1 className="text-center">Loading Hospitals...</h1>
    }>
      <HospitalsInformation />
    </Suspense>
    <FaqSection />
    </>
  )
}
