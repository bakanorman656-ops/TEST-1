'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Users, MoreHorizontal, Pencil, Trash2, Mail, Phone, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient, deleteClient, updateClient } from '@/app/actions/business'
import { UpgradeModal } from '@/components/dashboard/upgrade-modal'

interface Client {
  id: number
  businessId: number
  name: string
  email: string | null
  phone: string | null
  company: string | null
  notes: string | null
  createdAt: Date | null
}

interface Business {
  id: number
  name: string
}

interface ClientListProps {
  clients: Client[]
  businesses: Business[]
}

export function ClientList({ clients, businesses }: ClientListProps) {
  const router = useRouter()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false)
  const [upgradeInfo, setUpgradeInfo] = useState<{ count: number; limit: number } | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    const result = await createClient({
      businessId: parseInt(formData.get('businessId') as string),
      name: formData.get('name') as string,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      company: formData.get('company') as string || undefined,
      notes: formData.get('notes') as string || undefined,
    })
    
    setLoading(false)
    
    if (result.error && result.upgradeRequired) {
      setUpgradeInfo({ count: result.currentCount!, limit: result.limit! })
      setIsCreateOpen(false)
      setIsUpgradeOpen(true)
      return
    }
    
    if (result.error) {
      setError(result.message || 'Failed to create client')
      return
    }
    
    setIsCreateOpen(false)
    router.refresh()
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingClient) return
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await updateClient(editingClient.id, {
      name: formData.get('name') as string,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      company: formData.get('company') as string || undefined,
      notes: formData.get('notes') as string || undefined,
    })
    
    setLoading(false)
    setIsEditOpen(false)
    setEditingClient(null)
    router.refresh()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return
    await deleteClient(id)
    router.refresh()
  }

  const openEdit = (client: Client) => {
    setEditingClient(client)
    setIsEditOpen(true)
  }

  const getBusinessName = (businessId: number) => {
    return businesses.find(b => b.id === businessId)?.name ?? 'Unknown'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your business clients</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-purple-pink text-white border-0" disabled={businesses.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Add a client to one of your businesses.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessId">Business *</Label>
                <Select name="businessId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a business" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id.toString()}>
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input id="name" name="name" required placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="client@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+234 xxx xxx xxxx" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="Client's company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" placeholder="Additional notes about this client" rows={3} />
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>
              )}
              <Button type="submit" disabled={loading} className="w-full gradient-purple-pink text-white border-0">
                {loading ? 'Adding...' : 'Add Client'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* No businesses warning */}
      {businesses.length === 0 && (
        <div className="bg-orange/10 border border-orange/20 rounded-xl p-4 text-center">
          <p className="text-orange font-medium">You need to register a business first before adding clients.</p>
          <Button variant="link" className="text-orange" onClick={() => router.push('/dashboard/businesses')}>
            Go to Businesses
          </Button>
        </div>
      )}

      {/* Client List */}
      {clients.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border/50 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No clients yet</h3>
          <p className="text-muted-foreground mb-4">Add your first client to start tracking payments.</p>
          {businesses.length > 0 && (
            <Button onClick={() => setIsCreateOpen(true)} className="gradient-purple-pink text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan/10">
                  <Users className="h-6 w-6 text-cyan" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(client)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(client.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{client.name}</h3>
              {client.company && (
                <p className="text-sm text-muted-foreground mb-2">{client.company}</p>
              )}
              
              <div className="space-y-1 text-sm text-muted-foreground">
                {client.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span>{getBusinessName(client.businessId)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Update client information.</DialogDescription>
          </DialogHeader>
          {editingClient && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Client Name *</Label>
                <Input id="edit-name" name="name" required defaultValue={editingClient.name} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" name="email" type="email" defaultValue={editingClient.email ?? ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" name="phone" defaultValue={editingClient.phone ?? ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input id="edit-company" name="company" defaultValue={editingClient.company ?? ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea id="edit-notes" name="notes" defaultValue={editingClient.notes ?? ''} rows={3} />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-purple-pink text-white border-0">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <UpgradeModal
        open={isUpgradeOpen}
        onOpenChange={setIsUpgradeOpen}
        currentCount={upgradeInfo?.count}
        limit={upgradeInfo?.limit}
      />
    </div>
  )
}
