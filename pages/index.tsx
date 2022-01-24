import Head from 'next/head'
import Image from 'next/image'
import LayoutHOC from '../components/layouts/LayoutHOC'

export default function Home() {
  return (
    <div>
      <Head>
        <title>ME</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <LayoutHOC>
      <>
      </>
    </LayoutHOC>
    </div>
  )
}
