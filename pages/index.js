import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";


export default function Home() {
  return (
    <div> 
      <p>Home page </p>
      <p>
        <Link href="/members">See the list of members</Link>
    </p>
    </div>
  )
}
