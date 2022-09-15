import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";


export default function sessionDetails({data}) {

  return (
    <div>
      <h1> Session detail</h1>
      <p>{data.title}</p>
      <p>{data.date}</p>
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
            title
            date
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
          }
        }
      `,
      variables: { id },
    });
    
    return {
      props: {
        data: data.session
      },
    };
  }