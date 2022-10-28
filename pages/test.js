import { gql, useMutation } from "@apollo/client";
import {createApolloClient} from "../helpers/apollo-client"
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


 


export default function Test() {
    const client = createApolloClient();// this won't work
    const name = "test11"
    const email = "@dfdfdfd"

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
          variables: {id:"4304d225-9dfd-4bf2-8d85-c54086380214",payments:{
            "paid": true
          }}
          
        })
        .then(result => { console.log(result)})
        .catch(error => { console.log(error) });
    }

    const onClickHandler = async (e) => {
        console.log(e)
        await updateUserMutation();
    }
    // const [createUser , { data, loading, error }] = useMutation(CREATE_USER, {variables: { name, email } })

    
    return (


        <Container>
            <div>
                <Text fontSize='xl'>Home page </Text>
                <Button colorScheme='blue' onClick={onClickHandler}>Submit</Button>
            </div>
        </Container>
    )


}
