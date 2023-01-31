import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.sass'
import NavBar from "@/components/Navigation/Navbar";
import MainAfisha from "@/components/Afisha/MainAfisha";
import axios from "axios";

export async function getServerSideProps({req, res}: any){
    //Часть 1 - аутентификация
    //отправляем запрос на сервер
    const answer = await axios(`http://localhost:2222/api/login`, {
        method: "GET",
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Credentials': true,
            Cookie: req!.headers.cookie
        }
    });
    //Отдаем куки браузеру
    //пробрасываем пользователю куки с аутентификацией
    if (answer.headers["set-cookie"]) {
        res.setHeader('Set-Cookie', answer.headers["set-cookie"]);
    }
    //Часть 2 - получение постов
    const answerPosts = await axios(`http://localhost:2222/api/getAllPosts`, {
        method: "GET",
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Credentials': true,
            Cookie: req!.headers.cookie || answer.headers["set-cookie"]
        }
    });
    const answerData = answerPosts.data || [];
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
