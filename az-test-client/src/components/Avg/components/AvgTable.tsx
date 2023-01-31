//Интерфейс для стейта
import {useEffect} from "react";
import axios from "axios";
import styles from '../styles/Avg.module.sass'
//Функция-компонент, ответственная за вывод списка вычислений
export default function AvgTable({records, updateRecords}: IAvgFormProps) {
    //Добавляем эффект при загрузке ДОМА
    useEffect(() => {
        //Отправляем запрос на сервер
        axios.get('http://localhost:2222/api/allCalculations', {withCredentials: true})
            //Ловим коллбеки
            .then(
                //В случае успеха обновляем стейт
                answer => {
                    answer.data !== 0 ? updateRecords([...answer.data]): null
                },
                //В случае ошибки логируем ошибку
                error => console.log(error)
            )
    }, []);
    if(records.length === 0) return <span className={styles.AvgEntities}>Добавьте новые числа</span>
    //обрабатываем родительский стейт записей
    const elements = [...records].reverse().map(item => {
        return (
            <tr key={Math.random()}>
                <td>{item.firstNumber}</td>
                <td>{item.secondNumber}</td>
                <td>{item.avg}</td>
            </tr>
        )
    });
    //Возвращаем таблицу
    return (
        <table className={styles.AvgEntities}>
            <tbody>
                <th>Первое число</th>
                <th>Второе число</th>
                <th>Среднее</th>
                {elements}
            </tbody>
        </table>
    )
}