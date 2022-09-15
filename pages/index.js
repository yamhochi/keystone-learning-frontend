import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";


export default function Home() {
  return (
    <div> 
      <h1>Home page </h1>
      <p>
        <Link href="/sessions">See the sessions</Link>
      </p>
      <p>
        <Link href="/members">See the members</Link>
      </p>
    </div>
  )
}
