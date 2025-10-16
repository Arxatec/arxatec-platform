export interface Events {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  reminder_minutes: number | null;
  status: string;
  case: null;
  client: null;
}
