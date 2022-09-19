
import client from "../helpers/apollo-client"
import { gql, useMutation, } from "@apollo/client";
import { Input, Container, Text, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText } from '@chakra-ui/react'

// const = define the mutation
const UPDATE_PAID_STATUS_MUTATION = gql`
mutation UPDATE_PAID_STATUS_MUTATION ($id:ID!, $paid:Boolean!){
    updateInvoice( where: {id: $id} data:{paid: $paid}){
        id 
        paid  
    }
 }
`


const CREATE_USER = gql`
mutation CREATE_USER_MUTATION ($name:String, $email:String){
    createUser( data:{name:$name, email:$email}){
        name
        email
    }
 }`


//  const CREATE_USER =  client.mutate({
//     mutation: gql`
//         mutation CREATE_USER_MUTATION ($name:String, $email:String){
//              createUser( data:{name:$name, email:$email}){
//                  name
//                  email
//      }
//   }`,
//   variables: {name:"55",email:"@4"}
// })
// .then(result => { console.log(result) })
// .catch(error => { console.log(error) });

export default function Test() {
    const name = "test1"
    const email = "@tttttx"

    const [createUser, { data: updateData, error: updateError, loading: updateLoading }] = 
       client.mutate({ mutation: CREATE_USER, variables: { name, email } })
        .then(result => { console.log(result) })
        .catch(error => { console.log(error) });

    
    return (


        <Container>
            <div>
                <Text fontSize='xl'>Home page </Text>
                <Button colorScheme='blue' onClick={(e) => { console.log(e), createUser }}>Submit</Button>
            </div>
        </Container>
    )


}
