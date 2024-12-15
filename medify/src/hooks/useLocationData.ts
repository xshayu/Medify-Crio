import { useState } from "react";

let statesCache: string[] | null = null;
const citiesCache: Record<string, string[]> = {};

export const useLocationData = () => {
    const [stateOptions, setStateOptions] = useState<string[]>([]);
    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStates = async () => {
        if (statesCache) {
            setStateOptions(statesCache);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('https://meddata-backend.onrender.com/states');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: string[] = await response.json();
            statesCache = data;
            setStateOptions(data);
        } catch (error) {
            console.error("Failed to fetch states:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCities = async (state: string) => {

        if (!state || state.length == 0) {
            setCityOptions([]);
            return
        } else if (citiesCache[state]) {
            setCityOptions(citiesCache[state]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`https://meddata-backend.onrender.com/cities/${state}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: string[] = await response.json();
            citiesCache[state] = data;
            setCityOptions(data);
        } catch (error) {
            console.error("Failed to fetch cities:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        stateOptions,
        cityOptions,
        isLoading,
        fetchStates,
        fetchCities,
    };
}