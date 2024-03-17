'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import { PubSubEvent, usePub } from '~/hooks/usePubSub';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
// import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
})

export const Submit = () => {
    const publish = usePub();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
        },
    })

    function onSubmit() {
        // alert('firset')
        if (confirm('Submit Dashboards?') === true) {
            publish(PubSubEvent.Saving, { save: true });
        }
    }

    return (
        <Button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={onSubmit}>Submit</Button>

    )
}
