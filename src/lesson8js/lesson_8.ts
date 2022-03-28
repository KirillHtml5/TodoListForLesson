// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).
// TDD
export function sum(...nums: Array<number>): number {
    console.log(nums)
    let rest = nums.reduce(function (s, a) {
        return s + a
    }, 0)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return rest
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {


    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && a === c) {
            return "10"
        } else if (a === b || a === c || b === c) {
            return "01"

        } else {
            return "11"
        }
    }
    return "00"

    // if (a === b || a === c || b === c) {
    //     return "01"
    // }
    // if(a + b > c || a + c > b || b + c > a){
    //     return "11"
    // }
    // if (a + b < c || a + c < b || b + c < a) return "00"

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался


}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    let sum = 0
    let num = String(number);
    for (let i = 0; i < num.length; i++) sum += Number(num[i]);
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return sum
    // return number.toString().split('').reduce((acc, item) => Number(item) + acc, 0)

}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let sum1 = 0;// нечетные
    let sum = 0;// чётные
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            sum += arr[i];
        } else {
            sum1 += arr[i]
        }
    }
    if (sum1 < sum) {
        return true
    } else return false


    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался

}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {

    let arr1 = array.filter(el => el % 2 == 0 && el > 0)
    let arr2 = arr1.map(el => el * el)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return arr2
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    if (N === 0)  return 0;
    return N + sumFirstNumbers(N - 1);
}


//...здесь пишем код.
// В return стоит "заглушка", чтоб typescript не ругался


// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): any {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if (amountOfMoney===1) return 1
    if (amountOfMoney>=1000) return (1000 +',' + getBanknoteList(amountOfMoney-1000)).split(',').map(el=> Number(el))
    if (500<=amountOfMoney) return (500 +',' + getBanknoteList(amountOfMoney-500)).split(',').map(el=> Number(el))
    if (100<=amountOfMoney) return (100 +',' + getBanknoteList(amountOfMoney-100)).split(',').map(el=> Number(el))
    if (50<=amountOfMoney) return (50 +',' + getBanknoteList(amountOfMoney-50)).split(',').map(el=> Number(el))
    if (20<=amountOfMoney) return (20 +',' + getBanknoteList(amountOfMoney-20)).split(',').map(el=> Number(el))
    if (10<=amountOfMoney) return (10 +',' + getBanknoteList(amountOfMoney-10)).split(',').map(el=> Number(el))
    if (5<=amountOfMoney) return (5 +',' + getBanknoteList(amountOfMoney-5)).split(',').map(el=> Number(el))
    if (2<=amountOfMoney) return (2 +',' + getBanknoteList(amountOfMoney-2)).split(',').map(el=> Number(el))

}