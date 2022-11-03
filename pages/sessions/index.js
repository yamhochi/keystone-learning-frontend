import { gql } from "@apollo/client";
import { createApolloClient } from "../../helpers/apollo-client";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Container, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText } from '@chakra-ui/react'

export default function Sessions({ data, loading, error }) {
    console.log({ data })


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <Container>
            <Box w='100%' py={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='./'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>All social sessions</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            
                </Box>   
            <Text fontSize='3xl' py='2'>All social sessions</Text>
            <Stack spacing={1}>
            {data.map((item) => (
                
                    <Link href={`/sessions/${item.id}`} key={item.id}>
                        <a> <Container borderRadius='md' backgroundColor='#EDF2F7' p='2'>{item.title} </Container></a>
                    </Link>
            ))}
            </Stack>
        </Container>
    );
}


export async function getStaticProps() {
    const client = createApolloClient();

    const { data } = await client.query({
        query: gql`
        query getSessions{
            sessions {
              id
              title
              date
            }
          }
      `,
        fetchPolicy: 'no-cache' //evaluate this
    });

    // await client.refetchQueries({
    //     updateCache(cache) {
    //       cache.evict({ fieldName: "someRootField" });
    //     },
    //   });

    return {
        props: {
            data: data.sessions,
        },

        // this is very important to make sure next cache is re-reading from server
        // is this the same as overwriting in-memory cache
        revalidate: 1,
    };

}