import dynamic from "next/dynamic";
import axios from "axios";
//Загружаем элемент на клиентском рендере
const MainAvg = dynamic(() => import('../components/Avg/MainAvg'), {ssr: false});

export default function avg(){

    return <MainAvg/>
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
