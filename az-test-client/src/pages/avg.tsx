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
export async function getServerSideProps({req, res}: any){
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
    return {props: {}}
}
