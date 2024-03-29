import { gql } from "@apollo/client";
import {createApolloClient} from "../../helpers/apollo-client";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Container, Heading, LinkBox, LinkOverlay, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText, StackItem } from '@chakra-ui/react'



export default function MemberDetails({data}) {
  console.log(data)
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }


  return (
    <Container>
            <Box w='100%' py={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='../'>Home</BreadcrumbLink>
                    </BreadcrumbItem>


                    <BreadcrumbItem>
                        <BreadcrumbLink href='./'>Members</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>{data.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Stack spacing={3}>
                <Heading size='lg' my='2'>{data.name}</Heading>
                <Text>{data.email}</Text>
                <Divider orientation='horizontal' />
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
          users {
            id
            name
            email
          }
        }
      `,
      fetchPolicy: 'no-cache' //evaluate this
    });

// Extract the id properties from the query and store them in the paths array.
    const paths = data.users.map((item) => ({
      params: {
        id: item.id,
      },
    }));
  
// Send these id’s to Next. We have also set the fallback property to false  
    return { 
      paths, 
      fallback: true };
  }


// Now fetch just one user...
export async function getStaticProps({ params }) {
  console.log('params', params)
    const { id } = params;
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query user($id: ID!) {
          user(where: { id: $id }) {
            id  
            name
            email
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'no-cache' //evaluate this
    });
    
    return {
      props: {
        data: data.user
      },
      // revalidate: 1,
    };
  }