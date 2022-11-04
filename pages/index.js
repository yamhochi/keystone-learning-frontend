import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import { createApolloClient } from "../helpers/apollo-client";
import { ApolloClient, gql, ApolloProvider } from '@apollo/client';
import { SimpleGrid, Container, Text, LinkBox, LinkOverlay, Heading, Button, ButtonGroup, Divider, Stack, Box, Badge, Checkbox, StatHelpText } from '@chakra-ui/react'


export default function Home() {
  return (
    <Container py='10'>
      <Text fontSize='5xl' py='5'>Welcome, Administrator</Text>
      <SimpleGrid columns={2} spacing={3}>
        <LinkBox as='Item' maxW='sm' p='5' borderWidth='1px' rounded='md' height="200px" backgroundColor='#EDF2F7'>
          <Heading size='md' my='2'>
            <LinkOverlay href="/sessions">
              Sessions
            </LinkOverlay>
          </Heading>

        </LinkBox>
        <LinkBox as='Item' maxW='sm' p='5' borderWidth='1px' rounded='md' height="200px" backgroundColor='#EDF2F7'>
          <Heading size='md' my='2'>
            <LinkOverlay href="/members">
              Members
            </LinkOverlay>
          </Heading>
        </LinkBox>
      </SimpleGrid>
    </Container>
  )
}
{/* <Link href="/sessions">Sessions</Link> */ }
