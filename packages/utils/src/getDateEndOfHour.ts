import dayjs from "dayjs";

export function getDateEndOfHour (date: Date) {
  return dayjs(date).endOf("hour");
}