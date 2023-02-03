import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe("function nameIsValid", function () {
    it("checks that Name is not empty", function () {
        expect(nameIsValid('Анатолий')).not.toBeNull();
    });
    it("checks if Name is too short", function () {
        expect(nameIsValid('A')).toBe(false);
    });
    it("checks if Name have spacebreak", function () {
        expect(nameIsValid('Анат олий')).toBe(false);
    });
});


describe("function fullTrim", function () {
    it("delete spaces", function () {
        expect(fullTrim('     ')).toHaveLength(0);
    });
    it("do not delete letters", function () {
        expect(fullTrim('А нат оли й')).toMatch(/Анатолий/);
    });
    it("return truthy value", function () {
        expect(fullTrim(' Анат олий')).toBeTruthy();
    });
});

const data = [
    { items: [{ price: 10, quantity: 10 }], discount: 0, expected: 100 },
    { items: [{ price: 10, quantity: 1 }], discount: 0, expected: 10 },
    { items: [{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }], discount: 0, expected: 100 },
    { items: [{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }], discount: 0, expected: 90 },
    { items: [{ price: 10, quantity: 10 }], discount: 10, expected: 90 },
    { items: [{ price: 10, quantity: 10 }], discount: 100, expected: 0 }
];

describe('Функция GetTotal', () => {
    test.each(data)('параметризированные тесты %j', ({ items, discount, expected }) => {
        expect(getTotal(items, discount)).toBe(expected);
    });


    it('Скидка должна быть числом', () => {
        expect(() => getTotal({ items: [{ price: 10, quantity: 10 }], discount: '1b' })).toThrow();
    });

    it('Процент скидки не может быть отрицательным ', () => {
            expect(() => getTotal({ items: [{ price: 10, quantity: 10 }], discount: -10 })).toThrow();
    });
});
