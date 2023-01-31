
//интерфейс для хранения данных пользователя
declare interface IusersAvg {
    [key: string]: INubmerUnit[]
}
//Интерфейс
declare interface INubmerUnit {
    number: number
    negative: boolean
    float: boolean
}
//Интерфейс для addNumber
declare interface IaddNumber {
    userId: string
    unit: INubmerUnit
}
//Интерфейс для вычисленных чисел
declare interface Icalculated {
    firstNumber: number,
    secondNumber ?: number,
    avg: number | null
}
//Декларируем интерфейс для тела афиши
declare interface IAfishaUnit {
    author: string
    text: string
}
//Декларируем интерфейс для листа афиши
declare interface IAfishaList {
    [key:string]: IAfishaUnit[]
}
//Декларируем интерфейс для добавления поста
declare interface IAddNewPost {
    userId: string
    post: IAfishaUnit
}
