import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { User, Mail, Calendar } from 'lucide-react'

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-purple/20 flex items-center justify-center">
            <User className="h-8 w-8 text-purple" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">Business Owner</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="font-medium text-foreground">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
        <p className="text-muted-foreground mb-4">
          Contact our support team on WhatsApp for any questions or assistance.
        </p>
        <a 
          href="https://wa.me/2347067569737"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-500 hover:underline"
        >
          WhatsApp: 07067569737
        </a>
      </div>
    </div>
  )
}
