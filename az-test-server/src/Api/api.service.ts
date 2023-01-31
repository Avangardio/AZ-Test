import { Injectable } from '@nestjs/common';

@Injectable()
//класс апи сервиса
export class ApiService {
    //определяем переменную с данными пользователей
    private usersAvg: IusersAvg = {};
    //метод класса для обработки
    avgNumber(data: INubmerUnit[]): Icalculated {
        //функция для обработки со знаком
        function setSign(number: number, sign: boolean): number{
            //Если число должно быть отрицательным, то делаем его модуль таковым
            return Math.abs(number) * (sign ? -1 : 1);
        }
        //вычисление среднего
        const countedAvg = data[1] && data[0] ?
            ((setSign(data[0].number, data[0].negative) + setSign(data[1].number, data[1].negative)) / data.length)
            : null;
        return {
            //если нет первого числа, возвращаем нуль
            firstNumber: data[0] && !isNaN(data[0].number) !== null || undefined ? setSign(data[0].number, data[0].negative) : null,
            //если нет первого числа, возвращаем нуль
            secondNumber: data[1] && !isNaN(data[1].number) !== null || undefined ? setSign(data[1].number, data[1].negative)  : null,
            //Если есть все числа и они помечены как целые, то ПО ЗАДУМКЕ? отправляем целое число, либо флоат
            avg: countedAvg !== null ? +countedAvg.toFixed(
                data[0].float || data[1].float ? 0 : 1
            ) : null
        };
    }

    //метод класса для обработки добавления данных
    addNumber_service(data: IaddNumber): INubmerUnit {
        //если число некорректно, возвращаем нуль
        if(isNaN(data.unit.number)) return null;
        //проверяем, нет ли записи у пользователя
        if(!this.usersAvg[data.userId]) {
            //добавляем запись пользователя и его число
            this.usersAvg[data.userId] = [data.unit];
            //возвращаем null
            return null;
        };
        //Если есть запись пользователя, забираем последнее число в массиве
        const lastNumber = this.usersAvg[data.userId].slice(-1)[0];
        //добавляем число в массив пользователя
        this.usersAvg[data.userId].push(data.unit);
        //возвращаем последнее число до изменения
        return lastNumber;
    }
    //Метод класса для обработки вычислений
    allCalculations_service(userId: string) {
        //Проверяем, нет ли записи у пользователя
        if(!this.usersAvg[userId]) {
            //Тогда возвращается 0
            return 0;
        };
        //Определяем массив вложенных массивов с вычислениями
        const calculated: Icalculated[] = [];
        //Проходимся по всему массиву чисел пользователя
        for (let index = 0; index < this.usersAvg[userId].length; index += 2){
            const [num1, num2] = [this.usersAvg[userId][index], this.usersAvg[userId][index + 1]]
                //вычисляем и пушим в массив вычислений
                calculated
                    .push(this.avgNumber(
                        [
                            //для каждого элемента проверяем именно на отсутствие, иначе возвращаем нуль
                            num1 && num1.number    ? num1    : null,
                            num2 && num2.number    ? num2    : null,
                        ])
                    );
            };
        //возвращаем вычисления
        return calculated;
        }
}
