'use client';
import SearchIcon from "./SearchIcon";
import { useEffect, useState } from "react";
import Link from "next/link";

interface LocationSetterFormProps {
    className?: string;
    grow?: boolean;
    onSubmit?: ({ city, state }: { city: string, state: string }) => void;
    isLink?: boolean;
    initialState?: string;
    initialCity?: string;
}
type LocationType = 'State' | 'City';

function SearchSelectField({
    className = '',
    name = 'State' as LocationType,
    disabled = false,
    options = [] as string[],
    value = '',
    callbackOnChange = (val: string, name: LocationType) => {}
}) {
    return (
        <span className={`${className} bg-[#FAFBFE] border border-[#F0F0F0] rounded-lg px-4 flex items-center`}>
            <SearchIcon fill="#9CA3AF" className="h-[12px] md:h-auto" />
            <select
                value={value}
                onChange={(e) => callbackOnChange(e.target.value, name)}
                name={name.toLocaleLowerCase()}
                className="w-full text-xs md:text-sm bg-[#FAFBFE] py-[var(--btn-padding-y)] min-w-[6ch]"
                disabled={disabled}
            >
                <option value="" disabled>{name}</option>
                {
                    options.map((option, key) => <option value={option} key={key}>{option}</option>)
                }
            </select>
        </span>
    )
}

export default function LocationSetterForm({ className = '', grow = false, onSubmit = () => {return}, isLink = false, initialState = '', initialCity = ''}: LocationSetterFormProps) {
    const [stateOptions, setStateOptions] = useState<string[]>([]);
    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [state, setState] = useState<string>(initialState);
    const [city, setCity] = useState<string>(initialCity);

    const fetchOptions = async (type: LocationType = 'State') => {
        const baseUrl = 'https://meddata-backend.onrender.com';
        const api = type === 'City' 
            ? `${baseUrl}/cities/${state}` 
            : `${baseUrl}/states`;
        
        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: string[] = await response.json();
            type == 'State' ?  setStateOptions(data) : setCityOptions(data);
        } catch (error) {
            console.error("Fetch failed. Error:\n", error);
        }
    };

    useEffect(() => { // Fetching all states early on
        fetchOptions();
    }, []);

    useEffect(() => {
        state ? fetchOptions('City') : setCityOptions([]); // Resetting city in case state is cleared
    }, [state]);

    const onSelectChange = (value: string, type: LocationType = 'State') => {
        if (type === 'City') {
            setCity(value);
        } else {
            setState(value);
            setCity('');
        }
    };

    const onFieldsSubmit = () => {
        if (!city?.length || !state?.length) return;
        onSubmit({city, state});
    };

    return (
        <div className={`${className} flex items-center gap-1 md:gap-5 ${grow ? '' : 'md:gap-[120px]'}`}>
            <SearchSelectField name='State' value={state} callbackOnChange={onSelectChange} options={stateOptions} className="flex-grow"  />
            <SearchSelectField disabled={!state} name='City' value={city} callbackOnChange={onSelectChange} options={cityOptions} className="flex-grow"  />
            {
                isLink ? 
                    <Link href={city ? `/hospitals?state=${state}&city=${city}` : '/hospitals'} className="btn flex items-center justify-center gap-0.5 md:gap-[6px] text-xs md:text-base">
                        <SearchIcon fill='white' className="h-[12px] md:h-auto" />
                        <span>Search</span>
                    </Link>
                    :
                    <button onClick={onFieldsSubmit} className="btn flex items-center justify-center gap-0.5 md:gap-[6px] text-xs md:text-base">
                        <SearchIcon fill='white' className="h-[12px] md:h-auto"  />
                        <span>Search</span>
                    </button>
            }
        </div>
    )

}