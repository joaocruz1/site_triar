"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Clock,
  AlertCircle,
  CalendarIcon as CalendarComponent,
  ChevronLeft,
  ChevronRight,
  Bell,
  Calendar,
  Info,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ObrigacaoFiscal {
  id: number
  nome: string
  data: Date
  descricao: string
  tipo: "federal" | "estadual" | "municipal" | "trabalhista"
  recorrencia: "mensal" | "trimestral" | "anual" | "especifica"
}

export default function CalendarioFiscal() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showEventDetails, setShowEventDetails] = useState(false)

  // Gerar obrigações fiscais para o mês atual
  const gerarObrigacoesFiscais = (mes: Date): ObrigacaoFiscal[] => {
    const ano = mes.getFullYear()
    const mesNumero = mes.getMonth()

    // Obrigações fixas mensais
    const obrigacoes: ObrigacaoFiscal[] = [
      {
        id: 1,
        nome: "DARF - PIS/COFINS",
        data: new Date(ano, mesNumero, 25),
        descricao: "Pagamento das contribuições PIS/COFINS referentes ao mês anterior.",
        tipo: "federal",
        recorrencia: "mensal",
      },
      {
        id: 2,
        nome: "DARF - IRPJ/CSLL",
        data: new Date(ano, mesNumero, mesNumero % 3 === 0 ? 30 : 31),
        descricao: "Pagamento do IRPJ e CSLL para empresas tributadas pelo Lucro Presumido (último dia útil do mês).",
        tipo: "federal",
        recorrencia: "trimestral",
      },
      {
        id: 3,
        nome: "GPS - INSS",
        data: new Date(ano, mesNumero, 20),
        descricao: "Pagamento da Guia da Previdência Social referente à competência do mês anterior.",
        tipo: "federal",
        recorrencia: "mensal",
      },
      {
        id: 4,
        nome: "FGTS",
        data: new Date(ano, mesNumero, 7),
        descricao: "Recolhimento do FGTS referente à folha de pagamento do mês anterior.",
        tipo: "trabalhista",
        recorrencia: "mensal",
      },
      {
        id: 5,
        nome: "DAS - Simples Nacional",
        data: new Date(ano, mesNumero, 20),
        descricao: "Pagamento do Documento de Arrecadação do Simples Nacional referente ao mês anterior.",
        tipo: "federal",
        recorrencia: "mensal",
      },
      {
        id: 6,
        nome: "ICMS",
        data: new Date(ano, mesNumero, 10),
        descricao: "Recolhimento do ICMS para contribuintes do regime normal.",
        tipo: "estadual",
        recorrencia: "mensal",
      },
      {
        id: 7,
        nome: "ISS",
        data: new Date(ano, mesNumero, 15),
        descricao: "Recolhimento do ISS para prestadores de serviços.",
        tipo: "municipal",
        recorrencia: "mensal",
      },
    ]

    // Adicionar obrigações específicas por mês
    if (mesNumero === 1) {
      // Fevereiro
      obrigacoes.push({
        id: 101,
        nome: "DIRF",
        data: new Date(ano, 1, 28),
        descricao: "Entrega da Declaração do Imposto de Renda Retido na Fonte referente ao ano anterior.",
        tipo: "federal",
        recorrencia: "anual",
      })
    }

    if (mesNumero === 2) {
      // Março
      obrigacoes.push({
        id: 102,
        nome: "Início DIRPF",
        data: new Date(ano, 2, 1),
        descricao: "Início do prazo para entrega da Declaração de Imposto de Renda Pessoa Física.",
        tipo: "federal",
        recorrencia: "anual",
      })
    }

    if (mesNumero === 4) {
      // Maio
      obrigacoes.push({
        id: 103,
        nome: "Fim DIRPF",
        data: new Date(ano, 4, 31),
        descricao: "Fim do prazo para entrega da Declaração de Imposto de Renda Pessoa Física.",
        tipo: "federal",
        recorrencia: "anual",
      })
    }

    if (mesNumero === 6) {
      // Julho
      obrigacoes.push({
        id: 104,
        nome: "ECF",
        data: new Date(ano, 6, 31),
        descricao: "Entrega da Escrituração Contábil Fiscal referente ao ano-calendário anterior.",
        tipo: "federal",
        recorrencia: "anual",
      })
    }

    return obrigacoes
  }

  const obrigacoes = gerarObrigacoesFiscais(currentMonth)

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)

    // Verificar se há eventos nesta data
    const eventosNaData = obrigacoes.filter((obrigacao) => isSameDay(obrigacao.data, date))

    if (eventosNaData.length > 0) {
      setShowEventDetails(true)
    } else {
      setShowEventDetails(false)
    }
  }

  // Gerar dias do mês atual
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Obter eventos do dia selecionado
  const eventosDodia = selectedDate ? obrigacoes.filter((obrigacao) => isSameDay(obrigacao.data, selectedDate)) : []

  // Obter próximos eventos
  const hoje = new Date()
  const proximosEventos = obrigacoes
    .filter((obrigacao) => obrigacao.data >= hoje)
    .sort((a, b) => a.data.getTime() - b.data.getTime())
    .slice(0, 3)

  return (
    <AnimateOnScroll variant="fade-up" duration={0.8}>
      <Card className="border-none shadow-xl overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] text-white p-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Calendário Fiscal</CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Acompanhe as principais datas e obrigações fiscais
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              {/* Cabeçalho do calendário */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevMonth}
                    className="h-9 w-9 p-0 rounded-full border-gray-200 hover:border-[#00A7E1] hover:text-[#00A7E1]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                    className="h-9 w-9 p-0 rounded-full border-gray-200 hover:border-[#00A7E1] hover:text-[#00A7E1]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Dias da semana */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded-lg p-2">
                <div className="py-1">Dom</div>
                <div className="py-1">Seg</div>
                <div className="py-1">Ter</div>
                <div className="py-1">Qua</div>
                <div className="py-1">Qui</div>
                <div className="py-1">Sex</div>
                <div className="py-1">Sáb</div>
              </div>

              {/* Calendário */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                  <div key={`empty-start-${index}`} className="h-12 p-1"></div>
                ))}

                {monthDays.map((day) => {
                  // Verificar se há eventos neste dia
                  const eventosNoDia = obrigacoes.filter((obrigacao) => isSameDay(obrigacao.data, day))

                  const isSelected = selectedDate && isSameDay(day, selectedDate)
                  const isCurrentDay = isToday(day)

                  return (
                    <motion.button
                      key={day.toString()}
                      className={`h-12 p-1 rounded-lg relative transition-all ${
                        isSelected
                          ? "bg-[#00A7E1] text-white shadow-md"
                          : isCurrentDay
                            ? "bg-[#00A7E1]/10 text-[#00A7E1] border border-[#00A7E1]/30"
                            : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
                      }`}
                      onClick={() => handleDateClick(day)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className={`text-sm ${isSelected ? "font-medium" : ""}`}>{format(day, "d")}</span>

                      {eventosNoDia.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                          {eventosNoDia.slice(0, 3).map((evento, index) => (
                            <div
                              key={`dot-${evento.id}`}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected
                                  ? "bg-white"
                                  : evento.tipo === "federal"
                                    ? "bg-red-500"
                                    : evento.tipo === "estadual"
                                      ? "bg-green-500"
                                      : evento.tipo === "municipal"
                                        ? "bg-amber-500"
                                        : "bg-purple-500"
                              }`}
                            ></div>
                          ))}
                          {eventosNoDia.length > 3 && (
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-gray-500"}`}
                            ></div>
                          )}
                        </div>
                      )}
                    </motion.button>
                  )
                })}

                {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                  <div key={`empty-end-${index}`} className="h-12 p-1"></div>
                ))}
              </div>

              {/* Legenda */}
              <div className="flex flex-wrap gap-4 text-xs bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Federal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Estadual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>Municipal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Trabalhista</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              {/* Detalhes do dia selecionado */}
              <AnimatePresence mode="wait">
                {showEventDetails && selectedDate ? (
                  <motion.div
                    key="event-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 p-4 rounded-xl border shadow-sm"
                  >
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-[#00A7E1]">
                      <CalendarComponent className="h-4 w-4" />
                      {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </h3>

                    {eventosDodia.length > 0 ? (
                      <div className="space-y-3">
                        {eventosDodia.map((evento) => (
                          <motion.div
                            key={evento.id}
                            className="bg-white p-4 rounded-lg border shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{evento.nome}</h4>
                              <Badge
                                className={`
                                  ${
                                    evento.tipo === "federal"
                                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                                      : evento.tipo === "estadual"
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : evento.tipo === "municipal"
                                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                          : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                  }
                                `}
                              >
                                {evento.tipo}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{evento.descricao}</p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Não há obrigações fiscais para esta data.</p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="upcoming-events"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-[#00A7E1]/5 to-[#0089b8]/5 p-4 rounded-xl border shadow-sm"
                  >
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-[#00A7E1]">
                      <Bell className="h-4 w-4" />
                      Próximas Obrigações
                    </h3>

                    {proximosEventos.length > 0 ? (
                      <div className="space-y-3">
                        {proximosEventos.map((evento, index) => (
                          <motion.div
                            key={evento.id}
                            className="bg-white p-4 rounded-lg border shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{evento.nome}</h4>
                              <Badge
                                className={`
                                  ${
                                    evento.tipo === "federal"
                                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                                      : evento.tipo === "estadual"
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : evento.tipo === "municipal"
                                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                          : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                  }
                                `}
                              >
                                {evento.tipo}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                              <Clock className="h-3 w-3" />
                              <span>{format(evento.data, "dd/MM/yyyy")}</span>
                            </div>
                            <p className="text-sm text-gray-600">{evento.descricao}</p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Não há obrigações fiscais próximas.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-md mt-0.5">
                    <Info className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Lembrete Importante</h4>
                    <p className="text-sm text-blue-700">
                      Este calendário é apenas uma referência. As datas podem variar conforme o regime tributário, porte
                      da empresa e legislação específica. Consulte sempre seu contador para confirmação.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md"
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Agendar Consultoria Fiscal
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500 border-t">
          <div className="flex items-center gap-2 w-full justify-center">
            <AlertCircle className="h-3 w-3 text-gray-400" />
            <span>Mantenha-se em dia com suas obrigações fiscais para evitar multas e penalidades.</span>
          </div>
        </CardFooter>
      </Card>
    </AnimateOnScroll>
  )
}
