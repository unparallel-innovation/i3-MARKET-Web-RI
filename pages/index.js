// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { Layout } from '/components/common.js'

export default function Home() {
  return (<Layout>
    <div className="px-5">
      <h1>Industrial data marketplace</h1>
      <h2>Turn manufacturing data into business</h2>
      <img src="/img/Siemens_Marketplace_keyvisual_2.jpeg" className="img-fluid"/>
    </div>
  </Layout>);
}
