import { useEffect, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

export type Rules<Steps extends string[]> = {
    order: Steps;
} & {
    [K in Steps[number]]: (
        ...args: number[]
    ) => number[];
}
export const LOAD_OPTIONS = [630, 1000, 1250];
export default function useElevatorOption<T extends string[] = string[]>(rules: Rules<T>, form: UseFormReturn) {
    if (!Array.isArray(rules.order) || rules.order.length === 0) {
        throw new Error('order is empty')
    }
    const [options, setOptions] = useState<Record<string, number[]>>({
        load: LOAD_OPTIONS
    });
    const { watch } = form;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name && rules.order.includes(name)) {
                const inputs: number[] = [];
                const newOptions = { ...options };
                rules.order.forEach((item) => {
                    newOptions[item] = rules[item](...inputs)!;
                    const val = Number(value[item]);
                    if (typeof val === 'number') {
                        inputs.push(val);
                    } 
                })

                setOptions(prev => ({
                    ...prev,
                    ...newOptions
                }))
            }
        })

        return () => subscription.unsubscribe()
    }, [watch])

    return options;
}