"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  BarChart2,
  Calculator,
  Check,
  HelpCircle,
  DollarSign,
  Building2,
  Users,
  Percent,
  BarChartIcon as ChartBar,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { Badge } from "@/components/ui/badge"

export default function RegimeTributarioComparador() {
  const [faturamentoMensal, setFaturamentoMensal] = useState("")
  const [lucroPresumido, setLucroPresumido] = useState(30)
  const [funcionarios, setFuncionarios] = useState("0")
  const [setor, setSetor] = useState("comercio")
  const [showResults, setShowResults] = useState(false)

  // Formatar entrada de moeda
  const formatCurrency = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "")

    // Converte para número e formata como moeda
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(Number(numericValue) / 100)

    return formatted
  }

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "")
    setFaturamentoMensal(numericValue)
  }

  const handleCalculate = () => {
    setShowResults(true)
  }

  // Cálculos dos impostos para cada regime
  const calcularImpostos = () => {
    const faturamento = Number(faturamentoMensal) / 100 || 0
    const funcionariosNum = Number(funcionarios) || 0
    const lucroPresumidoPerc = lucroPresumido / 100

    // Simples Nacional
    let aliquotaSimples = 0
    if (faturamento <= 180000 / 12) aliquotaSimples = 0.04
    else if (faturamento <= 360000 / 12) aliquotaSimples = 0.073
    else if (faturamento <= 720000 / 12) aliquotaSimples = 0.095
    else if (faturamento <= 1800000 / 12) aliquotaSimples = 0.107
    else if (faturamento <= 3600000 / 12) aliquotaSimples = 0.143
    else aliquotaSimples = 0.19

    // Ajuste por setor
    if (setor === "servicos") aliquotaSimples *= 1.2
    else if (setor === "industria") aliquotaSimples *= 1.1

    const impostoSimples = faturamento * aliquotaSimples

    // Lucro Presumido
    const aliquotaPresumido = 0.0925 // PIS/COFINS (3,65%) + ISS/ICMS (5,6% média)

    // IRPJ (15%) e CSLL (9%) sobre o lucro presumido
    const baseCalculo = faturamento * lucroPresumidoPerc
    const irpjCsll = baseCalculo * 0.24

    // Ajuste por setor
    let fatorSetorial = 1
    if (setor === "servicos") fatorSetorial = 1.15
    else if (setor === "industria") fatorSetorial = 1.05

    const impostoPresumido = (faturamento * aliquotaPresumido + irpjCsll) * fatorSetorial

    // Lucro Real
    // Simulação simplificada considerando um lucro real de 20% sobre faturamento
    const lucroReal = faturamento * 0.2
    const irpjCsllReal = lucroReal * 0.34 // IRPJ (15% + 10% adicional) e CSLL (9%)
    const pisCofinsReal = faturamento * 0.0925 // Regime não-cumulativo

    // Ajuste por setor e número de funcionários
    const fatorComplexidade = 1 + funcionariosNum * 0.005 // Cada funcionário aumenta a complexidade
    const impostoReal = (irpjCsllReal + pisCofinsReal) * fatorComplexidade

    // MEI (se aplicável)
    const impostoMei = faturamento <= 81000 / 12 ? 70 : Number.POSITIVE_INFINITY // Valor fixo aproximado

    return {
      simples: impostoSimples,
      presumido: impostoPresumido,
      real: impostoReal,
      mei: impostoMei,
      faturamento,
    }
  }

  const resultados = calcularImpostos()

  // Determinar o regime mais vantajoso
  const regimesOrdenados = [
    { nome: "Simples Nacional", valor: resultados.simples },
    { nome: "Lucro Presumido", valor: resultados.presumido },
    { nome: "Lucro Real", valor: resultados.real },
    { nome: "MEI", valor: resultados.faturamento <= 81000 / 12 ? resultados.mei : Number.POSITIVE_INFINITY },
  ].sort((a, b) => a.valor - b.valor)

  const melhorRegime = regimesOrdenados[0]

  return (
    <AnimateOnScroll variant="fade-up" duration={0.8}>
      <Card className="border-none shadow-xl overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] text-white p-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <ChartBar className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Comparador de Regimes Tributários</CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Compare os diferentes regimes tributários e descubra qual é o mais vantajoso para o seu negócio
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="simulador" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-gray-100/80 backdrop-blur-sm p-1 rounded-lg">
              <TabsTrigger
                value="simulador"
                className="data-[state=active]:bg-white data-[state=active]:text-[#00A7E1] data-[state=active]:shadow-sm rounded-md transition-all duration-300"
              >
                Simulador
              </TabsTrigger>
              <TabsTrigger
                value="comparativo"
                className="data-[state=active]:bg-white data-[state=active]:text-[#00A7E1] data-[state=active]:shadow-sm rounded-md transition-all duration-300"
              >
                Comparativo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simulador" className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="faturamento" className="text-sm font-medium flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-[#00A7E1]" />
                      Faturamento Mensal
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Informe o faturamento mensal médio da sua empresa</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Input
                      id="faturamento"
                      value={faturamentoMensal ? formatCurrency(faturamentoMensal) : ""}
                      onChange={handleCurrencyInput}
                      placeholder="R$ 0,00"
                      className="pl-10 text-right h-11 bg-gray-50 border-gray-200"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="setor" className="text-sm font-medium flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-[#00A7E1]" />
                      Setor de Atuação
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">O setor influencia diretamente nas alíquotas aplicáveis</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <select
                    id="setor"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 pl-10"
                    style={{ backgroundPosition: "right 0.75rem center" }}
                  >
                    <option value="comercio">Comércio</option>
                    <option value="servicos">Serviços</option>
                    <option value="industria">Indústria</option>
                  </select>
                  <div className="absolute mt-[-38px] ml-3 text-gray-500 pointer-events-none">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="funcionarios" className="text-sm font-medium flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-[#00A7E1]" />
                      Número de Funcionários
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Impacta nos custos trabalhistas e na complexidade fiscal</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Input
                      id="funcionarios"
                      type="number"
                      min="0"
                      value={funcionarios}
                      onChange={(e) => setFuncionarios(e.target.value)}
                      placeholder="0"
                      className="pl-10 h-11 bg-gray-50 border-gray-200"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="lucroPresumido" className="text-sm font-medium flex items-center gap-1.5">
                      <Percent className="h-4 w-4 text-[#00A7E1]" />
                      Margem de Lucro Presumido (%)
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Percentual de lucro sobre o faturamento para cálculo do Lucro Presumido
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <Input
                      id="lucroPresumido"
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={lucroPresumido}
                      onChange={(e) => setLucroPresumido(Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                    <Badge className="bg-[#00A7E1] hover:bg-[#00A7E1] text-white min-w-[3rem] justify-center">
                      {lucroPresumido}%
                    </Badge>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md h-11"
                disabled={!faturamentoMensal}
              >
                Calcular Comparativo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 pt-6 border-t"
                  >
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                      <BarChart2 className="h-5 w-5 text-[#00A7E1]" />
                      Resultado da Simulação
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {regimesOrdenados.map((regime, index) => {
                        // Não mostrar MEI se não for aplicável
                        if (regime.nome === "MEI" && resultados.faturamento > 81000 / 12) {
                          return null
                        }

                        const isBest = index === 0

                        return (
                          <motion.div
                            key={regime.nome}
                            className={`p-5 rounded-xl border ${
                              isBest
                                ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-md"
                                : "bg-white border-gray-200 hover:shadow-sm transition-shadow"
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h4 className={`font-medium text-lg ${isBest ? "text-green-700" : "text-gray-700"}`}>
                                {regime.nome}
                              </h4>
                              {isBest && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Mais vantajoso
                                </Badge>
                              )}
                            </div>
                            <div className={`flex items-baseline ${isBest ? "text-green-700" : "text-gray-700"}`}>
                              <span className="text-2xl font-bold">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(regime.valor)}
                              </span>
                              <span className="text-sm font-normal text-gray-500 ml-1">/mês</span>
                            </div>

                            {isBest && (
                              <div className="mt-3 text-xs text-green-600">
                                Economia estimada de até{" "}
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(regimesOrdenados[1]?.valor - regime.valor)}{" "}
                                por mês em relação ao segundo melhor regime.
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <h4 className="font-medium text-blue-800 mb-2 text-lg">Recomendação</h4>
                      <p className="text-blue-700">
                        Com base nos dados informados, o regime tributário mais vantajoso para sua empresa é o{" "}
                        <strong className="font-semibold">{melhorRegime.nome}</strong>. Para uma análise mais detalhada
                        e personalizada, recomendamos agendar uma consulta com nossos especialistas.
                      </p>
                    </motion.div>

                    <motion.div
                      className="text-center pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <Button
                        variant="outline"
                        className="border-[#00A7E1] text-[#00A7E1] hover:bg-[#00A7E1] hover:text-white transition-all"
                        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Agendar Consultoria Especializada
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="comparativo" className="space-y-6">
              <div className="overflow-x-auto rounded-xl border shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="p-4 text-left border-b font-medium text-gray-700">Características</th>
                      <th className="p-4 text-center border-b font-medium text-gray-700">MEI</th>
                      <th className="p-4 text-center border-b font-medium text-gray-700">Simples Nacional</th>
                      <th className="p-4 text-center border-b font-medium text-gray-700">Lucro Presumido</th>
                      <th className="p-4 text-center border-b font-medium text-gray-700">Lucro Real</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b">Faturamento Anual</td>
                      <td className="p-4 text-center border-b">Até R$ 81.000</td>
                      <td className="p-4 text-center border-b">Até R$ 4,8 milhões</td>
                      <td className="p-4 text-center border-b">Sem limite</td>
                      <td className="p-4 text-center border-b">Sem limite</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b">Complexidade Contábil</td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Muito Baixa</Badge>
                      </td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Baixa</Badge>
                      </td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Média</Badge>
                      </td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Alta</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b">Carga Tributária</td>
                      <td className="p-4 text-center border-b">Valor Fixo Mensal</td>
                      <td className="p-4 text-center border-b">Alíquota Única</td>
                      <td className="p-4 text-center border-b">Média</td>
                      <td className="p-4 text-center border-b">Variável</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b">Obrigações Acessórias</td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Mínimas</Badge>
                      </td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Reduzidas</Badge>
                      </td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Diversas</Badge>
                      </td>
                      <td className="p-4 text-center border-b">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Completas</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b">Ideal para</td>
                      <td className="p-4 text-center border-b">Autônomos e pequenos empreendedores</td>
                      <td className="p-4 text-center border-b">Pequenas e médias empresas</td>
                      <td className="p-4 text-center border-b">Empresas com margens altas</td>
                      <td className="p-4 text-center border-b">Grandes empresas ou com muitas despesas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <motion.div
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-md mt-0.5">
                    <HelpCircle className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Dica Profissional</h4>
                    <p className="text-sm text-blue-700">
                      A escolha do regime tributário ideal vai além dos cálculos simples. Fatores como projeção de
                      crescimento, sazonalidade do negócio e estratégia de longo prazo devem ser considerados. Nossa
                      equipe pode ajudar a fazer uma análise completa para sua empresa.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="text-center pt-2">
                <Button
                  className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md"
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Solicitar Consultoria Tributária
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500 border-t">
          <div className="flex items-center gap-2 w-full justify-center">
            <Calculator className="h-3 w-3 text-gray-400" />
            <span>Esta é uma simulação simplificada. Para uma análise precisa, consulte nossos especialistas.</span>
          </div>
        </CardFooter>
      </Card>
    </AnimateOnScroll>
  )
}
