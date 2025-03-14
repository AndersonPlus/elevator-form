import useElevatorOption, { Rules } from "@/hooks/useElevatorOption";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const passengerElevatorRules: Rules<['load', 'width', 'depth']> = {
    order: ['load', 'width', 'depth'],
    load() {
        return [630, 1000, 1250]
    },
    width(load: number) {
        if (load === 630) {
            return [1100]
        }
        if (load === 1000) {
            return [1200]
        }
        if (load === 1250) {
            return [1200, 1600]
        }

        return [];
    },
    depth(load: number, width: number) {
        if (load === 630) {
            return [1400]
        }
        if (load === 1000) {
            return [2100]
        }
        if (load === 1250) {
            if (width === 1200) {
                return [2100]
            }
            if (width === 1600) {
                return [1400]
            }
        }

        return []
    }
}

export const PassengerElevatorOption = ({ options, type, value, onChange }: { options: number[], type: string, value: number, onChange: (val: number) => void }) => {
    const [inputVal, setInputVal] = useState('')
    return (
        <Select
            defaultValue={String(value)}
            onValueChange={(val: string) => onChange(Number(val))}
            onOpenChange={(open) => {
                if (!open && inputVal) {
                    onChange(Number(inputVal))
                    setInputVal('')
                }
            }}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${type}`}>{value}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Default Value</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option} value={String(option)}>{option}</SelectItem>
                    ))}
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Custom Value</SelectLabel>
                    <div className="flex flex-row items-center">
                        <Input placeholder="input your custom value" onChange={(e) => {
                            setInputVal(e.target.value)
                        }} value={inputVal} />
                    </div>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export const PassengerElevatorForm = () => {
    const form = useFormContext();
    const options = useElevatorOption(passengerElevatorRules, form);
    return (
        <>
            <FormField
                control={form.control}
                name="load"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 mt-3">
                        <FormLabel>Load(kg)</FormLabel>
                        <FormControl>
                            <PassengerElevatorOption options={options['load'] || []} type="load" onChange={field.onChange} value={field.value} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 mt-3">
                        <FormLabel>Width(mm)</FormLabel>
                        <FormControl>
                            <PassengerElevatorOption options={options['width'] || []} type="width" onChange={field.onChange} value={field.value} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="depth"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 mt-3">
                        <FormLabel>Depth(mm)</FormLabel>
                        <FormControl>
                            <PassengerElevatorOption options={options['depth'] || []} type="depth" onChange={field.onChange} value={field.value} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    )
}