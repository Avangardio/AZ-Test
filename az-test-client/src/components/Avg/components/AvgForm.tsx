//Функция-компонент, ответственная за вывод формы добавления числа и отправкой запросов
import {useState} from "react";
import axios from "axios";
import styles from '../styles/Avg.module.sass'

export default function AvgForm({records, updateRecords}: IAvgFormProps) {
    //Определяем стейт для формы
    const [formValue, setFormValue] = useState<IValue>({
        number: undefined,
        negative: false,
        float: false,
    });
    //функция, ответственная за поддержку изменения стейта формы
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        //Деструктуризируем таргет ивента
        const {name, value} = event.target;
        //Для чисел и чекбоксов разное выполнение функции
        //Если ивент от инпута числа и введеное число корректно, обновляем стейт
        if(name === 'number') return setFormValue({...formValue, [name]: value});
        //иначе обрабатываем чекбоксы
        setFormValue({...formValue, [name]: !formValue[name]})
    };
    //Функция, ответственная за обработку отправки формы
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        //отправляем запрос
        axios.post('http://localhost:2222/api/addNumber', {number: +formValue.number!, negative: formValue.negative, float: formValue.float}, {withCredentials: true})
            //Ловим колбек
            .then(
                //При успехе запроса обновляем запись
                answer => {
                    updateRecords(answer.data)
                },
                //При ошибке логируем ее
                error  => console.log(error)
            )
    };
    return (
        <form
            className={styles.AvgForm}
            onSubmit={handleSubmit}>
            <p>
            <input
                value={formValue.number}
                name={'number'}
                placeholder={'Введите число'}
                onChange={handleChange}
                required={true}
            />
            </p>
            <p>
                <label >
                    Отрицательное?
                    <input
                        type={"checkbox"}
                        name={'negative'}
                        checked={formValue.negative}
                        onChange={handleChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Целое?
                    <input
                        type={"checkbox"}
                        name={'float'}
                        checked={formValue.float}
                        onChange={handleChange}
                    />
                </label>
            </p>
            <input
                type={'submit'}
                value={'Отправить'}
            />
        </form>
    )
}