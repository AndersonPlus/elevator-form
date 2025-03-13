"use client";
import { useCallback, useMemo, useState } from "react";
import { formatPhoneNumber, getCountries, getCountryCallingCode, Country } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import { Input } from "../ui/input";
import CountrySelect from "./country-select";
import type { ControllerRenderProps } from "react-hook-form";

const ElevatorPhoneInput = (props: ControllerRenderProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [country, setCountry] = useState<Country>('US');
    const handleInputChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        // const phoneString = `+${getCountryCallingCode(country)}${input.value}`
        // const formattedNumber = formatPhoneNumber(phoneString);
        // console.log(phoneString, formattedNumber);
        setPhoneNumber(input.value);
    }
    const handleCountryChange = useCallback((value: Country) => {
        setCountry(value);
    }, []);
    const countries = useMemo(() => {
        return getCountries().map((country) => {
            return {
                originCountry: country,
                countryName: en[country],
                countryPhoneCode: getCountryCallingCode(country)
            }
        })
    }, []);
    const countryCode = useMemo(() => {
        return getCountryCallingCode(country);
    }, [country])
    return (
        <div className="flex flex-row">
            <CountrySelect countries={countries} onCountryChange={handleCountryChange} defaultCountry={'US'} />
            <Input 
                id="phone" 
                prefix={<span>{`+${countryCode}`}</span>} 
                className="flex-1" 
                value={props.value} 
                onChange={props.onChange} 
            />
        </div>
    )
}

export default ElevatorPhoneInput;