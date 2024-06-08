import { parseISO, format } from "date-fns"

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  const formattedDate: string = format(date, 'dd/MM/yyyy HH:mm');
  return <time dateTime={dateString}>{formattedDate}</time>
}

export default DateFormatter


