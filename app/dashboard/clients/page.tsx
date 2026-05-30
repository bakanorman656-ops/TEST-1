import { getClients, getBusinesses } from '@/app/actions/business'
import { ClientList } from '@/components/dashboard/client-list'

export default async function ClientsPage() {
  const [clients, businesses] = await Promise.all([
    getClients(),
    getBusinesses(),
  ])

  return <ClientList clients={clients} businesses={businesses} />
}
