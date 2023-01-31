import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.sass'
import NavBar from "@/components/Navigation/Navbar";
import MainAfisha from "@/components/Afisha/MainAfisha";
import axios from "axios";


export const getInitialProps = async () => {
    //Часть 1 - аутентификация
    //отправляем запрос на сервер
    const answer = await axios.get(`http://localhost:2222/api/login`, {withCredentials: true});
    //Часть 2 - получение постов
    const answerPosts = await axios.get(`http://localhost:2222/api/getAllPosts`, {withCredentials: true,});
    const answerData = answerPosts.data || [{author: 'pisa', text: 'sad'}];
    //Возвращаем пропс с постами
    return {
        props: {
            posts: answerData
        }
    }
}

export default function Home({posts}: {posts: IAfishaUnit[]}) {
  return (
    <>
      <Head>
        <title>AZ-Test: afisha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className={styles.HomeGrid}>
            <MainAfisha posts={posts} />
          </div>
      </main>
    </>
  )
}
