"use client";
import { handleElevatorFormSubmit } from "@/lib/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ElevatorPhoneInput from "./elevator-phone-input";
import { PassengerElevatorForm } from "./passenger-elevator";
import { toast } from "sonner"
import { redirect } from "next/navigation";

export const passengerElevatorSchema = z.object({
    load: z.number({
        required_error: "Load is required",
        invalid_type_error: "Load must be a number"
    }).min(200, { message: "Load must be greater than 200" }).max(10000, { message: "Load must be less than 10000" }),
    width: z.number({
        required_error: "Width is required",
        invalid_type_error: "Width must be a number"
    }).min(1000, { message: "Width must be greater than 1000" }).max(2000, { message: "Width must be less than 2000" }),
    depth: z.number({
        required_error: "Depth is required",
        invalid_type_error: "Depth must be a number"
    }).min(1000, { message: "Depth must be greater than 1000" }).max(2500, { message: "Depth must be less than 2500" }),
})

export const basicFormSchema = z.object({
    companyName: z.string().min(1, { message: "Company name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Company address is required" }),
    billAddress: z.string().min(1, { message: "Bill address is required" }),
    billAddressSame: z.boolean().default(false).optional(),
    elevatorType: z.enum(["passenger", "escalator", "walks"]).default('passenger').optional(),
})

export const formSchema = z.discriminatedUnion('elevatorType', [
    basicFormSchema.merge(z.object({
        elevatorType: z.literal('passenger'),
    }).merge(passengerElevatorSchema)),
    basicFormSchema.merge(z.object({
        elevatorType: z.literal('walks'),
    })),
    basicFormSchema.merge(z.object({
        elevatorType: z.literal('escalator'), 
    }))
])

const ElevatorForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            phone: "",
            address: "",
            billAddress: "",
            billAddressSame: false,
            elevatorType: 'passenger',
        }
    })
    const watchElevatorType = form.watch('elevatorType');
    form.watch('billAddressSame')

    return (
        <Card className="w-[500px] p-5">
            <CardHeader>
                <CardTitle>Elevator Form</CardTitle>
                <CardDescription>Please correctly fill out elevator form below</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => {
                        toast.success('Your Form submitted successfully', {
                            position: 'top-center'
                        })
                        handleElevatorFormSubmit(data)
                        redirect('/success')
                    }, (err) => { toast.error(JSON.stringify(err))})}>
                        <FormField control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3 mt-3">
                                    <FormLabel>CompanyName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="input company name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3 mt-3">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <ElevatorPhoneInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3 mt-3">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="input your address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="billAddress"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3 mt-3">
                                    <FormLabel>Bill Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={form.getValues('billAddressSame') ? "the same as company address" : "input bill address"}
                                            {...field}
                                            value={form.getValues('billAddressSame') ? form.getValues('address') : ''}
                                            disabled={form.getValues('billAddressSame')}
                                            style={{
                                                'cursor': form.getValues('billAddressSame')? 'not-allowed' : 'auto',
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="billAddressSame"
                            render={({ field }) => (
                                <FormItem className="flex gap-3 mt-3">
                                    <FormLabel>Same as company address.</FormLabel>
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={(val) => {
                                            field.onChange(val)
                                            form.setValue('billAddress', val? form.getValues('address') : '')
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField control={form.control}
                            name="elevatorType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3 mt-3">
                                    <FormLabel>Elevator Type</FormLabel>
                                    <FormControl>
                                        <Select defaultValue={field.value} onValueChange={(val) => {
                                            field.onChange(val)
                                        }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a elevator type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="passenger">Passenger</SelectItem>
                                                <SelectItem value="escalator">Escalator</SelectItem>
                                                <SelectItem value="walks">Walks</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        {
                            watchElevatorType === 'passenger' ?
                                <PassengerElevatorForm /> : null
                        }
                        <Button type="submit" className="mt-5">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p className="text-sm">By submitting this form, you agree to our <a href="/" className="text-primary">Terms of Service</a> and <a href="/" className="text-primary">Privacy Policy</a>.</p>
            </CardFooter>
        </Card>
    )
}

export default ElevatorForm;