import { getBusinesses, getClientCount } from '@/app/actions/business'
import { BusinessList } from '@/components/dashboard/business-list'

export default async function BusinessesPage() {
  const businesses = await getBusinesses()
  
  // Get client counts for each business
  const clientCounts: Record<number, number> = {}
  for (const business of businesses) {
    clientCounts[business.id] = await getClientCount(business.id)
  }

  return <BusinessList businesses={businesses} clientCounts={clientCounts} />
}
