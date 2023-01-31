//Функция-компонент, ответственная за вывод списка постов
import styles from '../Afisha.module.sass'
export default function AfishaEntities({posts}: IAfishaList) {
    if(!posts) return <span className={styles.AfishaEntities}>Добавьте новый пост</span>
    //Создаем массив
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