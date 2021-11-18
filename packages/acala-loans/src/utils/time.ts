export const formatTime = (time: Date) => {
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    hour: time.getHours()
  }
}

export const getDailyTimeString = (time: Date) => {
  const { year, month, date } = formatTime(time);
  return `${year}:${month}:${date}`
}

export const getHourTimeString = (time: Date) => {
  const { year, month, date, hour } = formatTime(time);
  return `${year}:${month}:${date}:${hour}`
}