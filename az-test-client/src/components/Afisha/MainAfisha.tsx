import AfishaForm from "@/components/Afisha/components/AfishaForm";
import AfishaEntities from "@/components/Afisha/components/AfishaEntities";

//Функция-компонент, ответственная за вывод афиши
export default function MainAfisha({posts}: IAfishaList){
    return (
        <>
            <AfishaForm />
            <AfishaEntities posts={posts} />
        </>
    )
}