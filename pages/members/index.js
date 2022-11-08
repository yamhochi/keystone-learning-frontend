import { gql } from "@apollo/client";
import { createApolloClient } from "../../helpers/apollo-client";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Container, Heading, LinkBox, LinkOverlay, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText, StackItem } from '@chakra-ui/react'

export default function Members({ data, loading, error }) {
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
                        <BreadcrumbLink href='#'>Members</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

            </Box>

            <Heading size='lg' my='2'>All members</Heading>
            <Stack spacing={1}>
                {data.map((item) => (
                    <Link key={item.id} href="members/[id]" as= {`/members/${item.id}`}>{item.name}</Link>
                    // <LinkBox as='Item' key={item.id} maxW='lg' p='2' borderWidth='1px' rounded='md' backgroundColor='#EDF2F7'>

                    //     <LinkOverlay href={`/members/${item.id}`}>
                    //         {item.name}item.id
                    //     </LinkOverlay>
                    // </LinkBox>

                ))}
            </Stack>
        </Container>
    );
}


export async function getStaticProps() {
    const client = createApolloClient();

    const { data } = await client.query({
        query: gql`
        query getUsers{
            users {
              id
              name
              email
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
            data: data.users,
        },

        // this is very important to make sure next cache is re-reading from server
        // is this the same as overwriting in-memory cache
        revalidate: 1,
    };

}