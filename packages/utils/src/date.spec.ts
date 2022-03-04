import { getEndOfDay, getStartOfDay, getEndOfHour, getStartOfHour } from './date'

describe('all date helper functions should work', () => {
    const target = new Date('2020/12/12 12:12')
    const startOfDay = new Date('2020/12/12 00:00')
    const endOfDay = new Date('2020/12/12 23:59:59:999')
    const startOfHour = new Date('2020/12/12 12:00')
    const endOfHour = new Date('2020/12/12 12:59:59:999')

    test('getStartOfDay should work', () => {
        expect(getStartOfDay(target).getTime()).toEqual(startOfDay.getTime())
    })

    test('getEndOfDay should work', () => {
        expect(getEndOfDay(target).getTime()).toEqual(endOfDay.getTime())
    })

    test('getStartOfHour should work', () => {
        expect(getStartOfHour(target).getTime()).toEqual(startOfHour.getTime())
    })

    test('getEndOfHour should work', () => {
        expect(getEndOfHour(target).getTime()).toEqual(endOfHour.getTime())
    })
})
