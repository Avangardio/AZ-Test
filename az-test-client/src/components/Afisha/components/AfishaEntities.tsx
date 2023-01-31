//Функция-компонент, ответственная за вывод списка постов
import styles from '../Afisha.module.sass'
export default function AfishaEntities({posts}: IAfishaList) {
    //Создаем массив с
    const AfishaList = posts.reverse().map(item => {
        return (
            <div key={item.text} className={styles.PostContainer}>
                <p><span>{item.author}</span></p>
                <p><span>{item.text}</span></p>
            </div>
        )
    })
    return <div className={styles.AfishaEntities}>{AfishaList}</div>;
}