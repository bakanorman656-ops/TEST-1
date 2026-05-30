'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AIAssistantProps {
  userName: string
  upcomingReminders: number
}

export function AIAssistant({ userName, upcomingReminders }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, input, setInput, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi ${userName}! You have ${upcomingReminders} upcoming payment reminders. Let me know if you need anything!`,
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() && status !== 'streaming') {
      sendMessage({ content: input })
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Helper to extract text from message parts
  const getMessageText = (message: typeof messages[0]) => {
    if (!message.parts || !Array.isArray(message.parts)) {
      return ''
    }
    return message.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('')
  }

  if (!isExpanded) {
    return (
      <div className="bg-card rounded-xl p-4 border border-border/50">
        <h4 className="font-semibold text-foreground mb-4">AI Bot Assistant</h4>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 mb-4">
            <Image
              src="/images/ai-robot.png"
              alt="AI Assistant"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Hi {userName}! You have {upcomingReminders} upcoming payment reminders. Let me know if you need anything!
          </p>
          <Button 
            onClick={() => setIsExpanded(true)}
            className="w-full gradient-purple-pink text-white border-0"
          >
            Ask Me Anything
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl border border-border/50 flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/images/ai-robot.png"
              alt="AI Assistant"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">AI Assistant</h4>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsExpanded(false)}
        >
          Minimize
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl text-sm ${
                message.role === 'user'
                  ? 'bg-purple text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              {getMessageText(message) || message.content}
            </div>
          </div>
        ))}
        {status === 'streaming' && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-xl">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={status === 'streaming'}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || status === 'streaming'}
            className="gradient-purple-pink text-white border-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
