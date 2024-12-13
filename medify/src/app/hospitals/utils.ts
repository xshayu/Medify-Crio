import type { Hospital } from "@/models";

export async function fetchHospitals(state: string, city: string) {
    let success = false, hospitals: Hospital[] = [];
    try {
        const api = `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`;
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        hospitals = await response.json();
        success = true;
    } catch (error) {
        console.error('Error in fetching hospitals. Error:\n', error);
    }
    return { success, hospitals }
};