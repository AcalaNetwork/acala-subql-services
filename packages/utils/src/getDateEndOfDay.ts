import dayjs from "dayjs";

export function getDateEndOfDay(date: Date) {
  return dayjs(date).endOf("day");
}
