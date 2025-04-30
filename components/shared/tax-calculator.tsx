"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calculator,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Building2,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Calendar,
  BadgePercent,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function TaxCalculator() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    regime: "simples",
    faturamento: "",
    setor: "comercio",
    funcionarios: "0",
  })
  const [result, setResult] = useState<{
    impostoAtual: number
    economiaEstimada: number
    percentual: number
  } | null>(null)
  const [animateValue, setAnimateValue] = useState({
    impostoAtual: 0,
    economiaEstimada: 0,
    economiaAnual: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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
    const { name, value } = e.target

    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "")

    setFormData((prev) => ({ ...prev, [name]: numericValue }))
  }

  const calculateTax = () => {
    // Simulação de cálculo de impostos
    const faturamentoNum = Number.parseFloat(formData.faturamento) || 0

    let aliquota = 0

    // Alíquotas simplificadas para simulação
    if (formData.regime === "simples") {
      if (formData.setor === "comercio") aliquota = 0.08
      else if (formData.setor === "servicos") aliquota = 0.12
      else aliquota = 0.1
    } else if (formData.regime === "lucro_presumido") {
      if (formData.setor === "comercio") aliquota = 0.12
      else if (formData.setor === "servicos") aliquota = 0.18
      else aliquota = 0.15
    } else {
      if (formData.setor === "comercio") aliquota = 0.15
      else if (formData.setor === "servicos") aliquota = 0.2
      else aliquota = 0.17
    }

    // Adiciona complexidade baseada no número de funcionários
    const funcionariosNum = Number.parseInt(formData.funcionarios) || 0
    aliquota += funcionariosNum * 0.002

    const impostoAtual = faturamentoNum * aliquota
    const economiaEstimada = impostoAtual * 0.25 // Estimativa de economia de 25%

    setResult({
      impostoAtual,
      economiaEstimada,
      percentual: aliquota * 100,
    })

    setStep(3)
  }

  // Animação dos valores
  useEffect(() => {
    if (result) {
      const duration = 1500 // duração da animação em ms
      const steps = 60 // número de passos da animação
      const interval = duration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimateValue({
          impostoAtual: Math.floor((result.impostoAtual * progress) / 100),
          economiaEstimada: Math.floor((result.economiaEstimada * progress) / 100),
          economiaAnual: Math.floor((result.economiaEstimada * 12 * progress) / 100),
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [result])

  const nextStep = () => {
    if (step < 2) setStep(step + 1)
    else calculateTax()
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const isStepValid = () => {
    if (step === 1) {
      return formData.regime && formData.faturamento && Number.parseFloat(formData.faturamento) > 0
    }
    if (step === 2) {
      return formData.setor && formData.funcionarios
    }
    return true
  }

  const getRegimeLabel = () => {
    switch (formData.regime) {
      case "simples":
        return "Simples Nacional"
      case "lucro_presumido":
        return "Lucro Presumido"
      case "lucro_real":
        return "Lucro Real"
      default:
        return ""
    }
  }

  const getSetorLabel = () => {
    switch (formData.setor) {
      case "comercio":
        return "Comércio"
      case "servicos":
        return "Serviços"
      case "industria":
        return "Indústria"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border-none rounded-lg overflow-hidden bg-white">
      <CardHeader className="bg-[#00A7E1] text-white p-4 border-b-0">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-white" />
          <div>
            <CardTitle className="text-lg">Calculadora de Economia Fiscal</CardTitle>
            <p className="text-white/80 text-sm">Descubra quanto sua empresa pode economizar em impostos</p>
          </div>
        </div>
      </CardHeader>

      {/* Progress Steps */}
      <div className="px-4 pt-4">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                  step >= i ? "bg-[#00A7E1] text-white" : "bg-gray-100 text-gray-400",
                )}
              >
                {i === 1 && <DollarSign className="h-4 w-4" />}
                {i === 2 && <Building2 className="h-4 w-4" />}
                {i === 3 && <BarChart3 className="h-4 w-4" />}
              </div>
              <span
                className={cn("text-xs font-medium transition-colors", step >= i ? "text-[#00A7E1]" : "text-gray-400")}
              >
                {i === 1 && "Financeiro"}
                {i === 2 && "Empresa"}
                {i === 3 && "Resultado"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full mb-4">
          <motion.div
            className="bg-[#00A7E1] h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <CardContent className="p-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="regime" className="flex items-center gap-1.5 text-sm">
                  <BadgePercent className="h-3.5 w-3.5 text-[#00A7E1]" />
                  Regime Tributário Atual
                </Label>
                <Select value={formData.regime} onValueChange={(value) => handleSelectChange("regime", value)}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 h-10">
                    <SelectValue placeholder="Selecione o regime" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg border-gray-200">
                    <SelectItem value="simples">Simples Nacional</SelectItem>
                    <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                    <SelectItem value="lucro_real">Lucro Real</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="faturamento" className="flex items-center gap-1.5 text-sm">
                  <TrendingUp className="h-3.5 w-3.5 text-[#00A7E1]" />
                  Faturamento Mensal Médio
                </Label>
                <div className="relative">
                  <Input
                    id="faturamento"
                    name="faturamento"
                    value={formData.faturamento ? formatCurrency(formData.faturamento) : ""}
                    onChange={handleCurrencyInput}
                    placeholder="R$ 0,00"
                    className="pl-8 text-right h-10 bg-gray-50 border-gray-200"
                  />
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-md mt-2 border border-blue-100">
                <p className="text-xs text-blue-700 flex items-start gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Informe o faturamento médio mensal dos últimos 12 meses para um cálculo mais preciso.</span>
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="setor" className="flex items-center gap-1.5 text-sm">
                  <Building2 className="h-3.5 w-3.5 text-[#00A7E1]" />
                  Setor de Atuação
                </Label>
                <Select value={formData.setor} onValueChange={(value) => handleSelectChange("setor", value)}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 h-10">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg border-gray-200">
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="funcionarios" className="flex items-center gap-1.5 text-sm">
                  <Users className="h-3.5 w-3.5 text-[#00A7E1]" />
                  Número de Funcionários
                </Label>
                <div className="relative">
                  <Input
                    id="funcionarios"
                    name="funcionarios"
                    value={formData.funcionarios}
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    placeholder="0"
                    className="pl-8 h-10 bg-gray-50 border-gray-200"
                  />
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md mt-2 border border-gray-100">
                <h4 className="font-medium text-gray-700 text-sm mb-1.5">Resumo</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Regime tributário:</span>
                    <span className="font-medium">{getRegimeLabel()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Faturamento mensal:</span>
                    <span className="font-medium">{formatCurrency(formData.faturamento)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && result && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="text-center mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-3"
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-0.5">Resultado da Simulação</h3>
                <p className="text-gray-500 text-xs">Com base nas informações fornecidas</p>
              </div>

              <div className="space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-50 p-3 rounded-md border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BadgePercent className="h-4 w-4 text-gray-700" />
                    <p className="text-gray-700 text-sm font-medium">Carga tributária atual (estimada)</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(animateValue.impostoAtual)}
                    </p>
                    <div className="bg-gray-200 px-2 py-0.5 rounded text-xs font-medium">
                      {result.percentual.toFixed(1)}%
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-green-50 p-3 rounded-md border border-green-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-green-700 text-sm font-medium">Economia potencial com planejamento</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold text-green-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(animateValue.economiaEstimada)}
                    </p>
                    <div className="bg-green-100 px-2 py-0.5 rounded text-xs font-medium text-green-700">por mês</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#e6f7fd] p-3 rounded-md border border-[#00A7E1]/20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-[#00A7E1]" />
                    <p className="text-[#0089b8] text-sm font-medium">Economia anual estimada</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold text-[#00A7E1]">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(animateValue.economiaAnual)}
                    </p>
                    <div className="bg-[#00A7E1]/10 px-2 py-0.5 rounded text-xs font-medium text-[#0089b8]">
                      em 12 meses
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 mt-1">
                <h4 className="font-medium text-gray-700 text-sm mb-1.5">Dados da simulação</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Regime tributário:</p>
                    <p className="font-medium">{getRegimeLabel()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Faturamento:</p>
                    <p className="font-medium">{formatCurrency(formData.faturamento)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Setor:</p>
                    <p className="font-medium">{getSetorLabel()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Funcionários:</p>
                    <p className="font-medium">{formData.funcionarios}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
        {step > 1 && step < 3 ? (
          <Button variant="outline" onClick={prevStep} className="flex items-center gap-1 text-sm h-9 px-3">
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="bg-[#00A7E1] hover:bg-[#0089b8] text-white h-9 px-4 text-sm"
          >
            {step === 2 ? "Calcular" : "Próximo"}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#00A7E1] hover:bg-[#0089b8] text-white h-9 px-4 text-sm"
          >
            Fale com um especialista
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
