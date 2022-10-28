import { gql, useMutation, } from "@apollo/client";
import {createApolloClient} from "../../helpers/apollo-client";
import Link from "next/link";
import { Input, Container, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText } from '@chakra-ui/react'

    //const = define the mutation
        // const UPDATE_PAID_STATUS_MUTATION = gql`
        // mutation UPDATE_PAID_STATUS_MUTATION ($id:ID!, $paid:Boolean){
        //     updateInvoice( where: {id: $id} data:{paid: $paid}){
        //         id 
        //         paid  
        //     }
        //  }
        // `;
    
    
export default function sessionDetails({data}) {


    const invoices = data.invoices
    console.log(invoices)

    // const [ updateInvoice, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(
    //     UPDATE_PAID_STATUS_MUTATION
    // );


    var truth
    //setup function for changing colour
    function updatePaidStatus(e, initial) {
        truth = initial
        var parentEl = e.target.parentNode
        var nextEl = parentEl.nextSibling
        return (truth = e.target.checked, nextEl.innerHTML = truth) //true or false
    }

    return (
        <div>
            <Container>
                <Stack spacing={3}>
                    <Text fontSize='3xl'>{data.title}</Text>
                    <p>{data.date}</p>
                    <Divider orientation='horizontal' />
                    {invoices.map((item) => (
                        <Box key={item.id} p='6'>
                            <Text fontSize='xl' >{item.users.name}</Text>
                            <Text fontSize='s' >invoice: {item.id}</Text>
                            <div>
                                <Checkbox
                                    colorScheme='green'
                                    defaultChecked={item.paid}
                                    onChange={async (e) => (
                                        updatePaidStatus(e, item.paid),
                                        item.paid = !item.paid,
                                        // await updateInvoice({ variables: { id, paid: item.paid } }),
                                        console.log(item.paid)
                                    )
                                    } 
                                >
                                    Paid
                                </Checkbox>
                                <Badge ml='1' fontSize='0.8em' /*colorScheme={paidColour(item.paid)}*/>
                                    {item.paid.toString()}
                                </Badge>
                            </div>

                        </Box>

                    ))}
                    <Stack spacing={3}>
                        <Divider orientation='horizontal' />
                        <Container>
                            <Text fontSize='xl'>Just rocked up?</Text>
                            <Text mb='8px'>Name:</Text>
                            <Input placeholder='name' />
                            <Button colorScheme='blue'>Submit</Button>
                        </Container>
                    </Stack>
                </Stack>
            </Container>

        </div>
    )
}

export async function getStaticPaths() {
    const client = createApolloClient();

    // Perform a GraphQL query to fetch all of the id fields from the users table and store the result in the data variable.
    const { data } = await client.query({
        query: gql`
        query {
          sessions {
            id
          }
        }
      `,
    });

    // Extract the id properties from the query and store them in the paths array.
    const paths = data.sessions.map((item) => ({
        params: {
            id: item.id,
        },
    }));

    // Send these id’s to Next. We have also set the fallback property to false  
    return { paths, fallback: false };
}



// Now fetch just one session...
export async function getStaticProps({ params }) {
    const { id } = params;  
    const client = createApolloClient();

    const { data } = await client.query({
        query: gql`
        query session($id: ID!) {
          session(where: { id: $id }) {
            id  
            title
            date
            invoices {
                id
                users{name}
                paid
            }
          }
        }
      `,
        variables: { id },
    });


    return {
        props: {
            data: data.session, 
        }
    };
}