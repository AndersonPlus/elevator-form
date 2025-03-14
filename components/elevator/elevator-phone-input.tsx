"use client";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { formatPhoneNumber, parsePhoneNumber, getCountries, getCountryCallingCode, Country } from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en';
import { Input } from "../ui/input";
import CountrySelect from "./country-select";
import type { ControllerRenderProps } from "react-hook-form";

const ElevatorPhoneInput = (props: ControllerRenderProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [country, setCountry] = useState<Country>('US');
    const handleInputChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;
        const phoneString = `+${getCountryCallingCode(country)}${value}`
        const formattedNumber = formatPhoneNumber(phoneString);
        setPhoneNumber(formattedNumber || value);
        props.onChange(`+${getCountryCallingCode(country)}${formattedNumber || value}`);
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
                {...props}
                onChange={(e) => handleInputChange(e)}
                value={phoneNumber}
            />
        </div>
    )
}

export default ElevatorPhoneInput;