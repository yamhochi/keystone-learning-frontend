import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";
import {useRouter} from 'next/router';

export default function Members({ data, loading, error}) {
    console.log({data})


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div>
            <h1> List of all members shown here.</h1>
            {data.map((item) => (
                <p key={item.id}>
                    <Link href={`/members/${item.id}`}>
                        <a> {item.name} </a>
                    </Link>
                </p>
            ))}
        </div>
    );
}


export async function getStaticProps() {

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
      fetchPolicy: 'no-cache'
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
    };    
}