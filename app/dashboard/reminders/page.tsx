import { getReminders, getPayments, getClients } from '@/app/actions/business'
import { ReminderList } from '@/components/dashboard/reminder-list'

export default async function RemindersPage() {
  const [reminders, payments, clients] = await Promise.all([
    getReminders(),
    getPayments(),
    getClients(),
  ])

  return <ReminderList reminders={reminders} payments={payments} clients={clients} />
}
