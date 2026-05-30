import { getPayments, getClients, getBusinesses } from '@/app/actions/business'
import { PaymentList } from '@/components/dashboard/payment-list'

export default async function PaymentsPage() {
  const [payments, clients, businesses] = await Promise.all([
    getPayments(),
    getClients(),
    getBusinesses(),
  ])

  return <PaymentList payments={payments} clients={clients} businesses={businesses} />
}
