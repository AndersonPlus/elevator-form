'use server'
import { formSchema } from "@/components/elevator/elevator-form"
import { z } from "zod"

export async function handleElevatorFormSubmit(values: z.infer<typeof formSchema>) {
    console.log('success', values)

    return {
        code: 200,
        message: 'Your Form submitted successfully'
    }
}