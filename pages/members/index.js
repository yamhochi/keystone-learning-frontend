import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";

export default function Members({data}) {

    return (
        <div>
            <h1> List of all members shown here.</h1>
            {/* {data.map((item) => (
                <p key={item.id}>
                    <Link href={`/members/${item.id}`}>
                        <a> {item.name} </a>
                    </Link>
                </p>
            ))} */}
        </div>
    );
}

export async function getStaticProps() {
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

    return {
        props: {
            data: data.users,
        },
    };
}