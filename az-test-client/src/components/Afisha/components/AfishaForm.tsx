import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import styles from '../Afisha.module.sass'
//Функция-компонент, ответственная за форму добавления афиши
export default function AfishaForm(){
    //Создаем стейт для формы
    const [formData, setFormData] = useState<IAfishaUnit>({
        author: '',
        text: ''
    });
    //Объявляем роутер
    const router = useRouter();
    //функция, ответственная за поддержку изменения стейта формы
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        //Деструктуризируем таргет ивента
        const {name, value} = event.target;
        //обновляем стейт
        return setFormData({...formData, [name]: value});
    };
    //функция, ответственная за отправку формы
    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        //Отправляем запрос на сервер
        axios.post('http://localhost:2222/api/addNewPost', {post: {author: formData.author, text: formData.text}}, {withCredentials: true})
            //ловим колбеки
            .then(
                //В случае успеха перезагружаем страницу
                answer => router.reload(),
                //В случае ошибки логируем ошибку
                error => console.log(error)
            )
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.AfishaForm}>
            <input
                placeholder={'Автор'}
                name={'author'}
                value={formData.author}
                onChange={handleChange}
                required={true}
            />
            <p>
                <textarea
                    placeholder={'Текст...'}
                    required={true}
                    name={'text'}
                    value={formData.text}
                    onChange={handleChange}
                />
            </p>
            <p><input type={'submit'}/></p>
        </form>
    )

}