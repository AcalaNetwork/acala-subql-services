import { getDateEndOfDay, getDateStartOfDay, getDateEndOfHour, getDateStartOfHour } from '.'

describe('all date helper functions should work', () => {
    const target = new Date('2000/12/12 12:12')
    const startOfDay = new Date('2020/12/12 00:00')
    const endOfDay = new Date('2020/12/12 59:59')
    const startOfHour = new Date('2000/12/12 12:00')
    const endOfHour = new Date('2000/12/12 12:59')

    test('getDateStartOfDay should work', () => {
        expect(getDateStartOfDay(target).toDate().getTime()).toEqual(startOfDay.getTime())
    })

    test('getDateEndOfDay should work', () => {
        expect(getDateEndOfDay(target).toDate().getTime()).toEqual(endOfDay.getTime())
    })

    test('getDateStartOfHour should work', () => {
        expect(getDateStartOfHour(target).toDate().getTime()).toEqual(startOfHour.getTime())
    })

    test('getDateEndOfHour should work', () => {
        expect(getDateEndOfHour(target).toDate().getTime()).toEqual(endOfHour.getTime())
    })
})
