"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, ChevronDown, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isMarkdown?: boolean
}

interface QuickReply {
  id: string
  text: string
  query?: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem("triarChatMessages")
    if (savedMessages && JSON.parse(savedMessages).length > 0) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))
      setMessages(parsedMessages)
    } else {
      // Initialize with welcome message if no saved messages
      const welcomeMessage: Message = {
        id: 1,
        text: "Olá! Sou o assistente virtual da Triar Contabilidade. Como posso ajudar você hoje?",
        sender: "bot",
        timestamp: new Date(),
        isMarkdown: true,
      }
      setMessages([welcomeMessage])

      // Set initial quick replies
      setQuickReplies([
        { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
        { id: "pricing", text: "Preços", query: "Quais são os preços?" },
        { id: "contact", text: "Contato", query: "Como posso entrar em contato?" },
      ])
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("triarChatMessages", JSON.stringify(messages))
    }
  }, [messages])

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus on input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      setUnreadCount(0)
    }
  }, [isOpen])

  // Update unread count when new bot messages arrive and chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === "bot") {
      setUnreadCount((prev) => prev + 1)
    }
  }, [messages, isOpen])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setQuickReplies([])

    // Simulate bot response with typing indicator
    const typingTime = 1000 + Math.random() * 1500
    setTimeout(() => {
      const { response, suggestedReplies } = getBotResponse(inputValue)

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
        isMarkdown: true,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Set quick replies if any
      if (suggestedReplies && suggestedReplies.length > 0) {
        setQuickReplies(suggestedReplies)
      }
    }, typingTime)
  }

  const handleQuickReply = (query: string) => {
    setInputValue(query)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: "Chat reiniciado. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
      isMarkdown: true,
    }
    setMessages([welcomeMessage])
    localStorage.removeItem("triarChatMessages")

    // Reset quick replies
    setQuickReplies([
      { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
      { id: "pricing", text: "Preços", query: "Quais são os preços?" },
      { id: "contact", text: "Contato", query: "Como posso entrar em contato?" },
    ])
  }

  // Enhanced bot response function with suggested quick replies
  const getBotResponse = (userInput: string): { response: string; suggestedReplies?: QuickReply[] } => {
    const input = userInput.toLowerCase().trim()

    // Dictionary of intents and responses with suggested quick replies
    const responses: Record<string, { text: string; replies?: QuickReply[] }> = {
      // Greetings
      "olá|ola|oi|e aí|bom dia|boa tarde|boa noite": {
        text: "Olá! Sou o assistente virtual da Triar Contabilidade. Como posso ajudar você hoje?",
        replies: [
          { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
          { id: "pricing", text: "Preços", query: "Quais são os preços?" },
          { id: "contact", text: "Contato", query: "Como posso entrar em contato?" },
        ],
      },

      // Thanks
      "obrigad[ao]|valeu|agradeço|grato": {
        text: "De nada! Estou aqui para ajudar. Se tiver mais alguma dúvida, é só perguntar.",
        replies: [
          { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
          { id: "pricing", text: "Preços", query: "Quais são os preços?" },
          { id: "feedback", text: "Dar feedback", query: "Quero dar um feedback" },
        ],
      },

      // Goodbyes
      "tchau|até mais|adeus|fui|vou embora": {
        text: "Até logo! Se precisar de mais alguma informação, estarei aqui. Tenha um ótimo dia!",
        replies: [
          { id: "feedback", text: "Dar feedback", query: "Quero dar um feedback" },
          { id: "restart", text: "Reiniciar chat", query: "Reiniciar conversa" },
        ],
      },

      // Pricing
      "orçamento|orcamento|preço|preco|valor|quanto custa|quanto é|tabela de preços": {
        text: "## Orçamento Personalizado\n\nPara solicitar um orçamento personalizado, você pode:\n\n1. Preencher nosso formulário online em [triarcontabilidade.com.br/orcamento](https://triarcontabilidade.com.br/orcamento)\n2. Ligar para (11) 9999-9999\n3. Enviar um e-mail para orcamento@triarcontabilidade.com.br\n\nUm consultor entrará em contato em até 4 horas úteis com uma proposta detalhada.",
        replies: [
          { id: "mei", text: "Preços para MEI", query: "Preços para MEI" },
          { id: "simples", text: "Simples Nacional", query: "Preços para Simples Nacional" },
          { id: "contact", text: "Falar com consultor", query: "Quero falar com um consultor" },
        ],
      },

      // Services
      "serviço|servico|serviços|servicos|oferecem|fazem|quais serviços": {
        text: "## Nossos Serviços Contábeis\n\n- **Contabilidade Empresarial Completa**\n- **Departamento Fiscal e Tributário**\n- **Planejamento Tributário Estratégico**\n- **Abertura, Alteração e Baixa de Empresas**\n- **Departamento Pessoal e RH**\n- **Consultoria Contábil e Financeira**\n\nGostaria que eu detalhasse algum serviço específico?",
        replies: [
          { id: "fiscal", text: "Depto. Fiscal", query: "Detalhes sobre departamento fiscal" },
          { id: "abertura", text: "Abertura de empresa", query: "Como funciona abertura de empresa?" },
          { id: "pricing", text: "Preços", query: "Quais são os preços?" },
        ],
      },

      // MEI
      "mei|microempreendedor individual|micro empresário|micro empresa": {
        text: "## Pacote para MEI\n\nPara MEIs oferecemos um pacote completo que inclui:\n- Declaração Anual do MEI (DASN-SIMEI)\n- Emissão de notas fiscais\n- Orientação fiscal e contábil\n- Acesso à plataforma online\n\n**Valor: R$ 89,90/mês**\n\nDeseja mais informações ou agendar um horário com nosso especialista em MEI?",
        replies: [
          { id: "mei-docs", text: "Documentos MEI", query: "Quais documentos preciso para MEI?" },
          { id: "mei-upgrade", text: "Crescer MEI", query: "Como crescer além do MEI?" },
          { id: "contact", text: "Falar com especialista", query: "Quero falar com especialista em MEI" },
        ],
      },

      // Deadlines
      "prazo|tempo|demora|quanto tempo|urgente|urgência": {
        text: "## Nossos Prazos\n\nNossos prazos variam conforme o serviço:\n\n- **Abertura de empresa:** 5 a 15 dias úteis\n- **Entrega de obrigações mensais:** 3 dias úteis\n- **Declarações anuais:** conforme cronograma oficial\n- **Consultorias:** agendamento em até 48h\n\nPara casos urgentes, temos o serviço expresso com acréscimo de 30%. Posso verificar o prazo exato para seu caso específico?",
        replies: [
          { id: "express", text: "Serviço expresso", query: "Como funciona o serviço expresso?" },
          { id: "deadlines", text: "Prazos fiscais", query: "Quais são os prazos fiscais?" },
          { id: "contact", text: "Falar com consultor", query: "Quero falar com um consultor" },
        ],
      },

      // Contact
      "contato|telefone|email|e-mail|whatsapp|falar com alguém|atendimento|humano": {
        text: "## Canais de Contato\n\nVocê pode nos contatar por:\n\n📞 **Telefone:** (11) 9999-9999\n📱 **WhatsApp:** (11) 98888-8888\n📧 **E-mail:** contato@triarcontabilidade.com.br\n\n**Horário de atendimento:**\nSegunda a sexta: 9h às 18h\nSábado: 9h às 13h\n\nDeseja que eu conecte você agora com um de nossos consultores?",
        replies: [
          { id: "whatsapp", text: "WhatsApp", query: "Quero o link do WhatsApp" },
          { id: "schedule", text: "Agendar horário", query: "Quero agendar um horário" },
          { id: "location", text: "Endereço", query: "Qual o endereço do escritório?" },
        ],
      },

      // Location
      "endereço|endereco|localização|localizacao|onde ficam|escritório|escritorio|visitar": {
        text: "## Nosso Endereço\n\nNosso escritório principal está localizado:\n\n📍 **Av. Paulista, 1000 - 10º andar**\n**Bela Vista - São Paulo/SP**\n**CEP: 01310-100**\n\nEstamos próximos à estação de metrô Trianon-MASP. Trabalhamos também com atendimento remoto por videochamada. Gostaria de agendar uma visita?",
        replies: [
          { id: "map", text: "Ver no mapa", query: "Ver localização no mapa" },
          { id: "schedule", text: "Agendar visita", query: "Quero agendar uma visita" },
          { id: "remote", text: "Atendimento remoto", query: "Como funciona o atendimento remoto?" },
        ],
      },

      // Documents
      "documento|documentos|necessário|necessario|preciso de|lista de documentos": {
        text: "## Documentos Necessários\n\nOs documentos necessários variam por serviço. De modo geral, você precisará de:\n\n- **Documentos pessoais** (RG, CPF)\n- **Comprovante de residência**\n- **Contrato social** ou requerimento de MEI\n- **Últimas declarações** (se já for empresa)\n\nPosso enviar a lista completa por e-mail ou WhatsApp? Qual seu endereço eletrônico preferido?",
        replies: [
          { id: "docs-mei", text: "Docs para MEI", query: "Documentos para MEI" },
          { id: "docs-ltda", text: "Docs para LTDA", query: "Documentos para LTDA" },
          { id: "email-docs", text: "Receber por email", query: "Quero receber a lista por email" },
        ],
      },

      // Tax questions
      "imposto|impostos|tributo|fiscal|declaração|declaracao|dar|simples nacional|lucro presumido": {
        text: "## Consultoria Fiscal\n\nPara questões fiscais, precisamos saber:\n\n1. Qual o porte da sua empresa?\n2. Qual o regime tributário atual?\n3. Qual sua atividade principal?\n\nCom essas informações, posso direcionar sua dúvida para o especialista adequado. Poderia me informar esses detalhes?",
        replies: [
          { id: "simples", text: "Simples Nacional", query: "Dúvidas sobre Simples Nacional" },
          { id: "lucro", text: "Lucro Presumido", query: "Dúvidas sobre Lucro Presumido" },
          { id: "tax-planning", text: "Planejamento Tributário", query: "Como funciona o planejamento tributário?" },
        ],
      },

      // Restart chat
      "reiniciar|limpar|começar de novo|nova conversa": {
        text: "Deseja reiniciar nossa conversa? Todos os históricos serão apagados.",
        replies: [
          { id: "confirm-restart", text: "Sim, reiniciar", query: "Sim, quero reiniciar" },
          { id: "cancel-restart", text: "Não, cancelar", query: "Não, quero continuar a conversa" },
        ],
      },

      // Confirm restart
      "sim, quero reiniciar": {
        text: "Chat reiniciado. Como posso ajudar você hoje?",
        replies: [
          { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
          { id: "pricing", text: "Preços", query: "Quais são os preços?" },
          { id: "contact", text: "Como posso entrar em contato?" },
        ],
      },
    }

    // Check for specific intents first
    for (const [pattern, response] of Object.entries(responses)) {
      const regex = new RegExp(pattern.split("|").join("|"), "i")
      if (regex.test(input)) {
        // Special case for restart confirmation
        if (pattern === "sim, quero reiniciar") {
          clearChat()
        }
        return {
          response: response.text,
          suggestedReplies: response.replies,
        }
      }
    }

    // Default responses with suggestions
    const defaultResponses = [
      {
        text: "Entendi sua dúvida, mas para responder com precisão, você poderia fornecer mais detalhes?",
        replies: [
          { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
          { id: "pricing", text: "Preços", query: "Quais são os preços?" },
          { id: "contact", text: "Como posso entrar em contato?" },
        ],
      },
      {
        text: "Sobre qual aspecto da contabilidade você gostaria de saber mais? Por exemplo: impostos, abertura de empresa, documentos necessários...",
        replies: [
          { id: "taxes", text: "Impostos", query: "Dúvidas sobre impostos" },
          { id: "company", text: "Abrir empresa", query: "Como abrir uma empresa?" },
          { id: "docs", text: "Documentos", query: "Quais documentos preciso?" },
        ],
      },
      {
        text: "Posso ajudar com informações sobre: orçamentos, serviços contábeis, prazos ou documentos necessários. Sobre qual desses temas é sua dúvida?",
        replies: [
          { id: "budget", text: "Orçamentos", query: "Preciso de um orçamento" },
          { id: "services", text: "Serviços", query: "Quais serviços vocês oferecem?" },
          { id: "deadlines", text: "Prazos", query: "Quais são os prazos?" },
          { id: "docs", text: "Documentos", query: "Quais documentos preciso?" },
        ],
      },
    ]

    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
    return {
      response: randomResponse.text,
      suggestedReplies: randomResponse.replies,
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoje"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ontem"
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
    }
  }

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = []
    let currentDate = ""
    let currentGroup: Message[] = []

    messages.forEach((message) => {
      const messageDate = formatDate(message.timestamp)

      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup })
        }
        currentDate = messageDate
        currentGroup = [message]
      } else {
        currentGroup.push(message)
      }
    })

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup })
    }

    return groups
  }

  return (
    <TooltipProvider>
      <div className="chatbot-container">
        {/* Floating chat button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0056D2] to-[#00A7E1] hover:shadow-lg shadow-md transition-all relative"
                  >
                    <MessageCircle className="h-7 w-7 text-white" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white shadow-sm">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Assistente Virtual Triar</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 md:w-[450px]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="chatbot-title"
            >
              <Card className="border border-gray-200 shadow-2xl overflow-hidden rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-[#0056D2] to-[#00A7E1] text-white p-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-white/30 shadow-md">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Triar Bot" />
                        <AvatarFallback className="bg-[#0089b8] text-white">TB</AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg" id="chatbot-title">
                        Assistente Triar
                      </h3>
                      <p className="text-xs text-white/80 flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Online • Resposta em instantes
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                          onClick={clearChat}
                          aria-label="Reiniciar conversa"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Reiniciar conversa</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                          onClick={() => setIsOpen(false)}
                          aria-label="Minimizar"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Minimizar</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                          onClick={() => setIsOpen(false)}
                          aria-label="Fechar"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Fechar</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div
                    ref={chatContainerRef}
                    className="max-h-[400px] p-4 bg-gradient-to-b from-gray-50 to-white overflow-y-auto"
                  >
                    {groupMessagesByDate().map((group, groupIndex) => (
                      <div key={groupIndex} className="mb-4">
                        <div className="flex justify-center mb-3">
                          <Badge
                            variant="outline"
                            className="bg-white text-gray-500 text-xs px-3 py-1 shadow-sm border-gray-200"
                          >
                            {group.date}
                          </Badge>
                        </div>

                        {group.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {message.sender === "bot" && (
                              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 ring-2 ring-white shadow-sm">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback className="bg-[#0056D2] text-white">TB</AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`max-w-[85%] rounded-lg p-3 shadow-md ${
                                message.sender === "user"
                                  ? "bg-gradient-to-r from-[#0056D2] to-[#00A7E1] text-white rounded-br-none"
                                  : "bg-white border-[#e0e0e0] border rounded-bl-none"
                              }`}
                            >
                              {message.isMarkdown ? (
                                <div
                                  className={cn(
                                    "prose prose-sm max-w-none",
                                    message.sender === "user" ? "prose-invert" : "",
                                    "prose-headings:my-2 prose-p:my-1 prose-ul:my-1 prose-li:my-0",
                                  )}
                                >
                                  <ReactMarkdown>{message.text}</ReactMarkdown>
                                </div>
                              ) : (
                                <p className="text-sm whitespace-pre-line">{message.text}</p>
                              )}
                              <p
                                className={`text-xs mt-1 text-right ${
                                  message.sender === "user" ? "text-white/70" : "text-gray-400"
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                            {message.sender === "user" && (
                              <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0 ring-2 ring-white shadow-sm">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback className="bg-[#6366F1] text-white">U</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex mb-4 justify-start">
                        <Avatar className="h-8 w-8 mr-2 flex-shrink-0 ring-2 ring-white shadow-sm">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                          <AvatarFallback className="bg-[#0056D2] text-white">TB</AvatarFallback>
                        </Avatar>
                        <div className="bg-white border rounded-lg rounded-bl-none p-3 shadow-md">
                          <div className="flex space-x-1 items-center">
                            <motion.div
                              className="w-2 h-2 bg-[#0056D2] rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1.5,
                                delay: 0,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-[#0089b8] rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1.5,
                                delay: 0.2,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-[#00A7E1] rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1.5,
                                delay: 0.4,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {!isTyping && quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4 mt-2">
                        {quickReplies.map((reply) => (
                          <Button
                            key={reply.id}
                            variant="outline"
                            size="sm"
                            className="bg-white hover:bg-[#f0f9ff] text-[#0056D2] border-[#0056D2]/30 text-xs py-1 h-auto rounded-full shadow-sm transition-all hover:shadow"
                            onClick={() => reply.query?  handleQuickReply(reply.query) : handleQuickReply("")}
                          >
                            {reply.text}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="p-3 border-t bg-white">
                  <div className="flex w-full gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Digite sua mensagem..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 border-[#0056D2]/30 focus-visible:ring-[#0056D2]/50 rounded-full pl-4 shadow-sm"
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={inputValue.trim() === ""}
                          className="bg-[#0056D2] hover:bg-[#0045a8] text-white rounded-full shadow-sm transition-all hover:shadow"
                          aria-label="Enviar mensagem"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Enviar mensagem</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="w-full text-center mt-2">
                    <p className="text-[10px] text-gray-400">Triar Contabilidade © {new Date().getFullYear()}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}
