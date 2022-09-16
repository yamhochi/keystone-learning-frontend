import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";
import { Input, Container, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText } from '@chakra-ui/react'


export default function sessionDetails({ data }) {
    console.log(data.invoices)
    const invoices = data.invoices
    const dc = "defaultChecked"

    //setup function to for badge colour
    function paidColour(i) {
        return i ? 'green' : 'red'
    }

    var truth = ''

    //setup function for changing colour
    function updatePaidStatus(e, initial) {
        truth = initial
        var parentEl = e.target.parentNode
        var nextEl=parentEl.nextSibling
        return (truth = e.target.checked, nextEl.innerHTML=truth) //true or false


    }


    // return e.target.checked
    //get initial State from server
    //state = !state
    //on click, change initial state status
    //update ccolour

    // var paid = updatePaidStatus




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
                            <div><Checkbox colorScheme='green' /*isChecked= {item.paid}*/ defaultChecked={item.paid} onChange={(e) => (updatePaidStatus(e, item.paid), console.log(truth))}>Paid</Checkbox>
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