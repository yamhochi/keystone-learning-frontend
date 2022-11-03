import { gql } from "@apollo/client";
import {createApolloClient} from "../../helpers/apollo-client";
import Link from "next/link";


export default function memberDetails({data}) {
  console.log(data)
  return (
    <div>
      <h1> Member detail</h1>
      <p>{data.name}</p>
      <p>{data.email}</p>
    </div>  
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
    });

// Extract the id properties from the query and store them in the paths array.
    const paths = data.users.map((item) => ({
      params: {
        id: item.id,
      },
    }));
  
// Send these id’s to Next. We have also set the fallback property to false  
    return { paths, fallback: false };
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
    });
    
    return {
      props: {
        data: data.user
      },
    };
  }