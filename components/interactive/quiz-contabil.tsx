"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, RefreshCw, Brain, Trophy, Lightbulb } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { Badge } from "@/components/ui/badge"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function QuizContabil() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      text: "Qual regime tributário permite o pagamento de impostos com alíquota única sobre o faturamento?",
      options: ["Lucro Real", "Lucro Presumido", "Simples Nacional", "MEI"],
      correctAnswer: 2,
      explanation:
        "O Simples Nacional é um regime tributário que unifica o pagamento de diversos impostos (IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS e CPP) em uma única guia, com alíquota calculada sobre o faturamento.",
    },
    {
      id: 2,
      text: "Qual é o prazo para entrega da Declaração de Imposto de Renda de Pessoa Física (DIRPF)?",
      options: ["Janeiro a Março", "Março a Maio", "Junho a Agosto", "Outubro a Dezembro"],
      correctAnswer: 1,
      explanation:
        "A Declaração de Imposto de Renda de Pessoa Física (DIRPF) deve ser entregue anualmente entre os meses de março e maio do ano seguinte ao ano-calendário.",
    },
    {
      id: 3,
      text: "O que é o SPED?",
      options: [
        "Sistema de Pagamento Eletrônico de Débitos",
        "Sistema Público de Escrituração Digital",
        "Serviço de Processamento Empresarial de Dados",
        "Sistema de Proteção Eletrônica de Documentos",
      ],
      correctAnswer: 1,
      explanation:
        "O SPED (Sistema Público de Escrituração Digital) é um sistema informatizado que unifica as atividades de recepção, validação, armazenamento e autenticação de livros e documentos fiscais e contábeis.",
    },
    {
      id: 4,
      text: "Qual destes NÃO é um tributo federal?",
      options: [
        "Imposto de Renda (IR)",
        "Contribuição Social sobre o Lucro Líquido (CSLL)",
        "Imposto sobre Circulação de Mercadorias e Serviços (ICMS)",
        "Programa de Integração Social (PIS)",
      ],
      correctAnswer: 2,
      explanation:
        "O ICMS (Imposto sobre Circulação de Mercadorias e Serviços) é um tributo estadual, enquanto IR, CSLL e PIS são tributos federais.",
    },
    {
      id: 5,
      text: "Qual o limite de faturamento anual para um Microempreendedor Individual (MEI)?",
      options: ["R$ 60.000,00", "R$ 81.000,00", "R$ 120.000,00", "R$ 360.000,00"],
      correctAnswer: 1,
      explanation:
        "O limite de faturamento anual para um MEI é de R$ 81.000,00, o que corresponde a uma média mensal de R$ 6.750,00.",
    },
  ]

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || showExplanation) return

    setSelectedOption(optionIndex)

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowExplanation(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  const currentQuestionData = questions[currentQuestion]
  const progress = ((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100

  return (
    <AnimateOnScroll variant="fade-up" duration={0.8}>
      <Card className="border-none shadow-xl overflow-hidden max-w-2xl mx-auto bg-white">
        <CardHeader className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] text-white p-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Quiz de Conhecimentos Contábeis</CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Teste seus conhecimentos sobre contabilidade e tributação
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <Badge variant="outline" className="bg-[#00A7E1]/5 text-[#00A7E1] border-[#00A7E1]/20">
                Questão {currentQuestion + 1} de {questions.length}
              </Badge>
              <Badge
                variant="outline"
                className={`${score > 0 ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}
              >
                Pontuação: {score}/{quizCompleted ? questions.length : currentQuestion + (showExplanation ? 1 : 0)}
              </Badge>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00A7E1] to-[#0089b8]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-800">{currentQuestionData.text}</h3>
                </div>

                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={selectedOption !== null || showExplanation}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedOption === index
                          ? index === currentQuestionData.correctAnswer
                            ? "bg-green-50 border-green-300 shadow-sm"
                            : "bg-red-50 border-red-300 shadow-sm"
                          : selectedOption !== null && index === currentQuestionData.correctAnswer
                            ? "bg-green-50 border-green-300 shadow-sm"
                            : "bg-white border-gray-200 hover:border-[#00A7E1]/50 hover:shadow-sm"
                      }`}
                      whileHover={selectedOption === null && !showExplanation ? { scale: 1.01 } : {}}
                      whileTap={selectedOption === null && !showExplanation ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">{option}</span>
                        {selectedOption !== null &&
                          (index === currentQuestionData.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : selectedOption === index ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : null)}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-blue-50 p-4 rounded-xl border border-blue-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-1.5 rounded-md mt-0.5">
                          <Lightbulb className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">Explicação</h4>
                          <p className="text-sm text-blue-700">{currentQuestionData.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={handleNextQuestion}
                      className="w-full bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md"
                    >
                      {currentQuestion < questions.length - 1 ? (
                        <>
                          Próxima Questão <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Ver Resultado <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#00A7E1]/20 to-[#0089b8]/20 mb-4"
                >
                  <Trophy className="h-12 w-12 text-[#00A7E1]" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00A7E1] to-[#0089b8]">
                    Quiz Concluído!
                  </h3>
                  <p className="text-gray-600">
                    Você acertou <span className="font-bold text-[#00A7E1]">{score}</span> de{" "}
                    <span className="font-bold">{questions.length}</span> questões
                  </p>
                </div>

                <div className="py-4">
                  {score === questions.length ? (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-200 shadow-sm">
                      <h4 className="font-medium text-green-800 mb-2 text-lg">Excelente!</h4>
                      <p className="text-green-700">
                        Parabéns! Você acertou todas as questões. Seus conhecimentos contábeis estão em dia!
                      </p>
                    </div>
                  ) : score >= questions.length / 2 ? (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 shadow-sm">
                      <h4 className="font-medium text-blue-800 mb-2 text-lg">Bom trabalho!</h4>
                      <p className="text-blue-700">
                        Você tem um bom conhecimento sobre contabilidade. Continue aprendendo para se tornar um
                        especialista!
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200 shadow-sm">
                      <h4 className="font-medium text-amber-800 mb-2 text-lg">Continue aprendendo!</h4>
                      <p className="text-amber-700">
                        Você está no caminho certo, mas ainda há muito a aprender sobre contabilidade. Que tal agendar
                        uma consultoria?
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="border-[#00A7E1] text-[#00A7E1] hover:bg-[#00A7E1] hover:text-white transition-all"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md"
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Falar com um Especialista
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500 border-t">
          <div className="flex items-center gap-2 w-full justify-center">
            <HelpCircle className="h-3 w-3 text-gray-400" />
            <span>Mantenha-se atualizado com as mudanças na legislação contábil e fiscal.</span>
          </div>
        </CardFooter>
      </Card>
    </AnimateOnScroll>
  )
}
