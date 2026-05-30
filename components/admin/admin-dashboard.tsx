'use client'

import { useState, useEffect } from 'react'
import { Bot, Shield, Users, Building2, MessageSquare, Ban, RefreshCw, Eye, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  getAdminStats, 
  getChatLogs, 
  getSecurityLogs, 
  getBannedBusinesses, 
  getChatbotSubscriptions,
  manuallyBanBusiness,
  unbanBusiness,
  upgradeUserChatbot
} from '@/app/actions/admin'
import { format } from 'date-fns'

type Tab = 'overview' | 'chats' | 'security' | 'banned' | 'subscriptions'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [stats, setStats] = useState({ totalUsers: 0, totalBusinesses: 0, totalBanned: 0, totalChatMessages: 0 })
  const [chatLogs, setChatLogs] = useState<any[]>([])
  const [securityLogs, setSecurityLogs] = useState<any[]>([])
  const [bannedList, setBannedList] = useState<any[]>([])
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [statsData, chats, security, banned, subs] = await Promise.all([
        getAdminStats(),
        getChatLogs(),
        getSecurityLogs(),
        getBannedBusinesses(),
        getChatbotSubscriptions(),
      ])
      setStats(statsData)
      setChatLogs(chats)
      setSecurityLogs(security)
      setBannedList(banned)
      setSubscriptions(subs)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    }
    setLoading(false)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'chats', label: 'Chat Logs', icon: MessageSquare },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'banned', label: 'Banned', icon: Ban },
    { id: 'subscriptions', label: 'Subscriptions', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-navy p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/20">
              <Shield className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Monitoring</h1>
              <p className="text-white/60 text-sm">Secret Dashboard - Do not share this URL</p>
            </div>
          </div>
          <Button onClick={loadData} variant="outline" className="text-white border-white/30">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="blue" />
              <StatCard icon={Building2} label="Total Businesses" value={stats.totalBusinesses} color="purple" />
              <StatCard icon={Ban} label="Banned Businesses" value={stats.totalBanned} color="red" />
              <StatCard icon={MessageSquare} label="Chat Messages" value={stats.totalChatMessages} color="cyan" />
            </div>
          )}

          {activeTab === 'chats' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Chat Logs</h3>
              {chatLogs.length === 0 ? (
                <p className="text-white/60 text-center py-8">No chat logs yet</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {chatLogs.map((log) => (
                    <div key={log.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-white/50">User: {log.userId}</span>
                        <span className="text-xs text-white/50">
                          {log.createdAt && format(new Date(log.createdAt), 'PPp')}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-2">
                        <span className="text-cyan font-medium">User:</span> {log.chatMessage}
                      </p>
                      <p className="text-white/60 text-sm">
                        <span className="text-purple font-medium">AI:</span> {log.aiResponse}
                      </p>
                      <p className="text-xs text-white/40 mt-2">IP: {log.ipAddress}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Security Events</h3>
              {securityLogs.length === 0 ? (
                <p className="text-white/60 text-center py-8">No security events</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {securityLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`rounded-xl p-4 border ${
                        log.isSuspicious 
                          ? 'bg-red-500/10 border-red-500/30' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {log.isSuspicious && <AlertTriangle className="h-4 w-4 text-red-400" />}
                          <span className={`text-sm font-medium ${log.isSuspicious ? 'text-red-400' : 'text-white'}`}>
                            {log.eventType}
                          </span>
                        </div>
                        <span className="text-xs text-white/50">
                          {log.createdAt && format(new Date(log.createdAt), 'PPp')}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">{log.description}</p>
                      {log.actionTaken && (
                        <p className="text-xs text-orange mt-2">Action: {log.actionTaken}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'banned' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Banned Businesses</h3>
              {bannedList.length === 0 ? (
                <p className="text-white/60 text-center py-8">No banned businesses</p>
              ) : (
                <div className="space-y-3">
                  {bannedList.map((ban) => (
                    <div key={ban.id} className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">Business ID: {ban.businessId}</p>
                          <p className="text-red-400 text-sm">{ban.reason}</p>
                          <p className="text-xs text-white/50 mt-1">
                            Banned: {ban.bannedAt && format(new Date(ban.bannedAt), 'PPp')}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={async () => {
                            await unbanBusiness(ban.id)
                            loadData()
                          }}
                          className="text-white border-white/30"
                        >
                          Unban
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Chatbot Subscriptions</h3>
              {subscriptions.length === 0 ? (
                <p className="text-white/60 text-center py-8">No subscriptions yet</p>
              ) : (
                <div className="space-y-3">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">User: {sub.userId}</p>
                          <p className="text-white/60 text-sm">Usage: {sub.usageCount}/10 free messages</p>
                          <p className={`text-sm ${sub.isSubscribed ? 'text-green-400' : 'text-orange'}`}>
                            {sub.isSubscribed ? `Pro (${sub.subscriptionType})` : 'Free Plan'}
                          </p>
                        </div>
                        {!sub.isSubscribed && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={async () => {
                                await upgradeUserChatbot(sub.userId, 'monthly')
                                loadData()
                              }}
                              className="bg-purple text-white text-xs"
                            >
                              Monthly
                            </Button>
                            <Button 
                              size="sm"
                              onClick={async () => {
                                await upgradeUserChatbot(sub.userId, 'yearly')
                                loadData()
                              }}
                              className="bg-cyan text-white text-xs"
                            >
                              Yearly
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Secret URL Notice */}
        <p className="text-center text-white/30 text-xs mt-8">
          Secret Admin URL: /admin-x7k9m2 - Do not share
        </p>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: string }) {
  const colors = {
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple/20 text-purple',
    red: 'bg-red-500/20 text-red-400',
    cyan: 'bg-cyan/20 text-cyan',
  }
  
  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <div className={`inline-flex p-3 rounded-xl ${colors[color as keyof typeof colors]} mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  )
}
