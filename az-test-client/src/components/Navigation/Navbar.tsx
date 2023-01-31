import styles from './Navbar.module.sass'
import {useRouter} from "next/router";
//Функция-компонент Навигации
export default function NavBar() {
    //Создаем роутер
    const router = useRouter();

    //Функция, отвечающая за обработку клика по элементам навигации
    function handleClick(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        const targetChoice = target.closest(`span.${styles.NavBarOption}`)!.getAttribute("data-link")!;
        //Пушим в роутер выбранную опцию
        router.push(targetChoice, undefined, {shallow: true});
    };


    return (
        <div className={styles.NavBar} data-testid={'NavBar'}>
            <span className={styles.NavBarOption} data-link={'/'} onClick={handleClick}>Записи</span>
            <span className={styles.NavBarOption} data-link={'/avg'} onClick={handleClick}>Среднее</span>
            <span className={styles.NavBarOption} data-link={'https://github.com/Avangardio/AZ-Test'} onClick={handleClick}>GitHub</span>
        </div>
    )
}