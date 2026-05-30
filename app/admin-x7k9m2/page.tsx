import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

// Secret admin page - only accessible by admin email
const ADMIN_EMAIL = 'normanbaka602@gmail.com'

export default async function SecretAdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  if (session.user.email !== ADMIN_EMAIL) {
    redirect('/dashboard')
  }
  
  return <AdminDashboard />
}
