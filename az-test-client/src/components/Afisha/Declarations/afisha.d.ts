//Декларируем интерфейс для тела афиши
declare interface IAfishaUnit {
    author: string
    text: string
}
//Декларируем интерфейс для листа афиши
declare interface IAfishaList {
    posts: IAfishaUnit[]
}