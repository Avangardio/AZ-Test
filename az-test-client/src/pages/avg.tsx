import dynamic from "next/dynamic";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/Home.module.sass";
import MainAfisha from "@/components/Afisha/MainAfisha";
//Загружаем элемент на клиентском рендере
const MainAvg = dynamic(() => import('../components/Avg/MainAvg'), {ssr: false});

export default function avg(){
    return (
        <>
            <Head>
                <title>AZ-Test: avg</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.HomeGrid}>
                    <MainAvg />
                </div>
            </main>
        </>
    )
}

export const getInitialProps = async () => {
    //отправляем запрос на сервер
    const answer = await axios(`http://localhost:2222/api/login`, {
        method: "GET",
        withCredentials: true,
    });

    return {props: {}}
}