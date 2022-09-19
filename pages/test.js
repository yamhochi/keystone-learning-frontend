import { gql, useMutation } from "@apollo/client";
import client from "../helpers/apollo-client"
import { Container, Text, Button } from '@chakra-ui/react'

// const = define the mutation
const UPDATE_PAID_STATUS_MUTATION = gql`
mutation UPDATE_PAID_STATUS_MUTATION ($id:ID!, $paid:Boolean!){
    updateInvoice( where: {id: $id} data:{paid: $paid}){
        id 
        paid  
    }
 }
`


// const CREATE_USER = gql`
// mutation CREATE_USER_MUTATION ($name:String, $email:String){
//     createUser( data:{name:$name, email:$email}){
//         name
//         email
//     }
//  }`


 const CREATE_USER =  client.mutate({
    mutation: gql`
        mutation CREATE_USER_MUTATION ($name:String, $email:String){
             createUser( data:{name:$name, email:$email}){
                 name
                 email
     }
  }`,
  variables: {name:"55",email:"@314"}
})
.then(result => { console.log(result)})
.catch(error => { console.log(error) });

export default function Test() {
    const name = "test11"
    const email = "@dfdfdfd"

    // function x(n,e){
    //     client.mutate({ mutation: CREATE_USER, variables: { n,e } })
    //         .then(result => { console.log(result) })
    //         .catch(error => { console.log(error) });
    // }

    // const createUser = 
    //    client.mutate({ mutation: CREATE_USER, variables: { name, email } })
    //     .then(result => { console.log(result) })
    //     .catch(error => { console.log(error) });

    // const [createUser , { data, loading, error }] = useMutation(CREATE_USER, {variables: { name, email } })

    const cu=CREATE_USER

    
    return (


        <Container>
            <div>
                <Text fontSize='xl'>Home page </Text>
                <Button colorScheme='blue' onClick={async (e) => {console.log(e)
                   await cu      
                }}>Submit</Button>
            </div>
        </Container>
    )


}
