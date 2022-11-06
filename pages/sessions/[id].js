import { gql} from "@apollo/client";
import { createApolloClient } from "../../helpers/apollo-client";
import Link from "next/link";
import HookForm from './Hookform'
import { Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Container, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText } from '@chakra-ui/react'


export default function sessionDetails({ data }) {


    const invoices = data.invoices
    console.log(invoices)
    const client = createApolloClient()

    var pid, pstatus
    //update paid status backend
    const updateUserMutation = () => {
        return client.mutate({
            mutation: gql`  
             mutation updateInvoiceMutation ($id:ID!, $payments:InvoiceUpdateInput!){
                updateInvoice( where: {id: $id} data:$payments){
                    id 
                    paid
                }
              }
            `,
            variables: {
                id: pid, payments: {
                    "paid": pstatus
                }
            }

        })
            .then(result => { console.log(result) })
            .catch(error => { console.log(error) });
    }


    var truth
    //setup function for changing badge
    function updatePaidStatus(e, initial) {
        truth = initial
        var parentEl = e.target.parentNode
        var nextEl = parentEl.nextSibling
        return (truth = e.target.checked, nextEl.innerHTML = truth) //true or false
    }

    return (
        <Container>
            <Box w='100%' py={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='../'>Home</BreadcrumbLink>
                    </BreadcrumbItem>


                    <BreadcrumbItem>
                        <BreadcrumbLink href='./'>Sessions</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>{data.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>


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
                                    pstatus = item.paid,
                                    pid = item.id,
                                    await updateUserMutation(),
                                    console.log(pid, pstatus)
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
                    <Stack spacing={3} >
                        <Text fontSize='xl'>Just rocked up?</Text>
                                <HookForm vars={data}/>
                    </Stack>
                </Stack>
            </Stack>
        </Container>

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