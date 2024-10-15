import dayjs from 'dayjs'

export function getEndOfDay(date: Date): Date {
    return dayjs(date).endOf('day').toDate()
}

export function getEndOfHour(date: Date): Date {
    return dayjs(date).endOf('hour').toDate()
}

export function getStartOfDay(date: Date): Date {
    return dayjs(date).startOf('d').toDate()
}

export function getStartOfHour(date: Date): Date {
    return dayjs(date).startOf('hour').toDate()
}
