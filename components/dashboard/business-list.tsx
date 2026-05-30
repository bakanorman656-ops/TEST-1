'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Building2, MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createBusiness, deleteBusiness, updateBusiness } from '@/app/actions/business'

interface Business {
  id: number
  name: string
  industry: string | null
  email: string | null
  phone: string | null
  address: string | null
  plan: string | null
  clientLimit: number | null
  isUpgraded: boolean | null
  createdAt: Date | null
}

interface BusinessListProps {
  businesses: Business[]
  clientCounts: Record<number, number>
}

export function BusinessList({ businesses, clientCounts }: BusinessListProps) {
  const router = useRouter()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await createBusiness({
      name: formData.get('name') as string,
      industry: formData.get('industry') as string || undefined,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      address: formData.get('address') as string || undefined,
    })
    
    setLoading(false)
    setIsCreateOpen(false)
    router.refresh()
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingBusiness) return
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await updateBusiness(editingBusiness.id, {
      name: formData.get('name') as string,
      industry: formData.get('industry') as string || undefined,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      address: formData.get('address') as string || undefined,
    })
    
    setLoading(false)
    setIsEditOpen(false)
    setEditingBusiness(null)
    router.refresh()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this business? All associated clients and payments will also be deleted.')) return
    await deleteBusiness(id)
    router.refresh()
  }

  const openEdit = (business: Business) => {
    setEditingBusiness(business)
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Businesses</h1>
          <p className="text-muted-foreground">Manage your registered businesses</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-purple-pink text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Business</DialogTitle>
              <DialogDescription>Add a new business to manage clients and payments.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Business Name *</Label>
                <Input id="name" name="name" required placeholder="My Business" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" placeholder="Technology, Healthcare, etc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="business@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+234 xxx xxx xxxx" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" placeholder="Business address" />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-purple-pink text-white border-0">
                {loading ? 'Creating...' : 'Create Business'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Business List */}
      {businesses.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border/50 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No businesses yet</h3>
          <p className="text-muted-foreground mb-4">Register your first business to start managing clients and payments.</p>
          <Button onClick={() => setIsCreateOpen(true)} className="gradient-purple-pink text-white border-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Business
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business) => {
            const clientCount = clientCounts[business.id] ?? 0
            const limit = business.clientLimit ?? 50
            return (
              <div key={business.id} className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple/10">
                    <Building2 className="h-6 w-6 text-purple" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(business)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(business.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <h3 className="font-semibold text-foreground mb-1">{business.name}</h3>
                {business.industry && (
                  <p className="text-sm text-muted-foreground mb-3">{business.industry}</p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{clientCount} / {limit} clients</span>
                </div>
                
                {!business.isUpgraded && clientCount >= limit && (
                  <p className="text-xs text-destructive mt-2">Upgrade required to add more clients</p>
                )}
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    business.isUpgraded 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {business.isUpgraded ? 'Pro Plan' : 'Free Plan'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business</DialogTitle>
            <DialogDescription>Update your business information.</DialogDescription>
          </DialogHeader>
          {editingBusiness && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Business Name *</Label>
                <Input id="edit-name" name="name" required defaultValue={editingBusiness.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-industry">Industry</Label>
                <Input id="edit-industry" name="industry" defaultValue={editingBusiness.industry ?? ''} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" name="email" type="email" defaultValue={editingBusiness.email ?? ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" name="phone" defaultValue={editingBusiness.phone ?? ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input id="edit-address" name="address" defaultValue={editingBusiness.address ?? ''} />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-purple-pink text-white border-0">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
