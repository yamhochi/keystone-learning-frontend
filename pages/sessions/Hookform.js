import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Stack
} from '@chakra-ui/react'
import { createApolloClient } from "../../helpers/apollo-client";
import { gql} from "@apollo/client";
import { useRouter } from 'next/router';


export default function HookForm(data) {
    const router = useRouter()
    // var sessionid = data.vars.id
    var input_name,input_email, session_id
    //define the query
    const client = createApolloClient()
    const createInvoiceMutation = () => {
        return client.mutate({
            mutation: gql`  
        mutation createInvoiceMutation ($details:InvoiceCreateInput!){
            createInvoice(data:$details){
              id
              paid
              sessions {id}
              users {
                name
                email
              }
              }
          }
        `,
            variables: {
                "details":
                {
                    "paid": false,
                    "sessions": { "connect": { "id": session_id } }, //update id
                    "users": {
                        "create": {
                            "name": input_name, //capture input name
                            "email": input_email //capture input email
                        }
                    }
                }
            }

        })
    }


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm()

    const onSubmit = async (values) => {
        session_id = data.vars.id
        input_email  = values.email
        input_name = values.name
        console.log(input_email, input_name, session_id)
        const res = await createInvoiceMutation()
        const invoice = res.data.createInvoice
        data.onAddInvoice(invoice)
        reset();
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
            <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor='name'>First name</FormLabel>
                <Input
                    id='name'
                    placeholder='name'
                    {...register('name', {
                        required: 'This is required',
                        minLength: { value: 1, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                    id='email'
                    placeholder='email'
                    {...register('email', {
                        required: 'This is required',
                        minLength: { value: 1, message: 'Minimum length should be 4' },
                        pattern: { value: /@/, message: 'Email should contain "@"' },
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            </Stack>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
        </form>
    )
}