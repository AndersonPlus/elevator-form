import { memo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Country } from "react-phone-number-input"
// hack type provided by react-phone-number-input
type Tagged<A, T> = A & { __tag: T };
type CountryCallingCode = Tagged<string, "CountryCallingCode">;
const CountrySelect = memo(({ countries, onCountryChange, defaultCountry }: {
    countries: Array<{
        originCountry: Country,
        countryName: string,
        countryPhoneCode: CountryCallingCode
    }>,
    onCountryChange: (value: Country) => void,
    defaultCountry: Country
}) => {
    return (
        <Select onValueChange={(value: Country) => { onCountryChange(value) }} defaultValue={defaultCountry}>
            <SelectTrigger style={{
                width: '20%'
            }}>
                <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
                {countries.map((item) => (
                    <SelectItem key={item.countryName} value={item.originCountry}>
                        {item.countryName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
})

export default CountrySelect;