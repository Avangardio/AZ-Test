declare interface IValue {
    [key: string]: any
    number: string | undefined
    negative: boolean
    float: boolean
}
declare interface Icalculated {
    firstNumber: number,
    secondNumber ?: number,
    avg: number | null
}
//Интерфейс пропсов
declare interface IAvgFormProps {
    records: Icalculated[]
    updateRecords: React.Dispatch<any>
}