//Интерфейс для стейта
import {useEffect} from "react";
import axios from "axios";

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
    if(records.length === 0) return <span>Добавьте новые числа</span>
    //обрабатываем родительский стейт записей
    const elements = records.map(item => {
        return (
            <tr>
                <td>{item.firstNumber}</td>
                <td>{item.secondNumber}</td>
                <td>{item.avg}</td>
            </tr>
        )
    });
    //Возвращаем таблицу
    return (
        <table>
            <tbody>
                {elements}
            </tbody>
        </table>
    )
}