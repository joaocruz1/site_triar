"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MessageSquare, Share2, Bookmark, BookmarkCheck, ChevronLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import styles from "@/app/blog/[slug]/page.module.css"

interface BlogPostProps {
  slug: string
}

interface BlogPostData {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  author: {
    name: string
    role: string
    image: string
  }
  category: string
  tags: string[]
  commentCount: number
  slug?: string
}

interface BlogPosts {
  [key: string]: BlogPostData
}

export default function BlogPost({ slug }: BlogPostProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([])
  const [isSaved, setIsSaved] = useState(false)

  // Fetch post data based on slug
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const blogPosts: BlogPosts = {
        "planejamento-tributario-reducao-impostos": {
          id: 1,
          title: "Como o planejamento tributário pode reduzir a carga de impostos da sua empresa",
          excerpt: "Descubra estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade do seu negócio.",
          content: `
## O que é planejamento tributário?

O planejamento tributário é um conjunto de medidas legais que visam diminuir o pagamento de tributos. Trata-se de um direito garantido ao contribuinte, conforme já decidiu o Supremo Tribunal Federal.

Diferente da sonegação fiscal, que é crime, o planejamento tributário utiliza meios legais para reduzir a carga tributária, aproveitando benefícios fiscais e incentivos previstos na legislação.

## Por que o planejamento tributário é importante?

No Brasil, a carga tributária é uma das mais altas do mundo, chegando a aproximadamente 33% do PIB. Para empresas, isso significa que uma parte significativa do faturamento é destinada ao pagamento de impostos.

Com um planejamento tributário eficiente, é possível:

- Reduzir legalmente o pagamento de impostos
- Evitar autuações fiscais
- Aumentar a lucratividade do negócio
- Melhorar o fluxo de caixa
- Tornar a empresa mais competitiva no mercado

## Principais estratégias de planejamento tributário

### 1. Escolha do regime tributário adequado

A escolha entre Simples Nacional, Lucro Presumido ou Lucro Real pode gerar economia significativa. Cada regime tem suas particularidades e a opção mais vantajosa depende de diversos fatores como faturamento, margem de lucro e segmento de atuação.

### 2. Aproveitamento de incentivos fiscais

Existem diversos incentivos fiscais disponíveis, como os relacionados à inovação tecnológica (Lei do Bem), incentivos regionais (SUDENE, SUDAM), incentivos setoriais, entre outros.

### 3. Reorganização societária

Fusões, cisões, incorporações e outras formas de reorganização societária podem ser utilizadas para otimizar a carga tributária, desde que haja propósito negocial legítimo.

### 4. Gestão de créditos tributários

O aproveitamento adequado de créditos tributários, especialmente em relação a tributos não-cumulativos como PIS, COFINS e ICMS, pode representar economia significativa.

## Como implementar um planejamento tributário eficiente

1. **Análise da situação atual**: Avalie a atual estrutura tributária da empresa
2. **Identificação de oportunidades**: Identifique possíveis economias fiscais
3. **Elaboração de estratégias**: Desenvolva um plano de ação
4. **Implementação**: Coloque as estratégias em prática
5. **Monitoramento**: Acompanhe os resultados e faça ajustes quando necessário

## Conclusão

O planejamento tributário é uma ferramenta essencial para a saúde financeira das empresas. Com a orientação adequada de profissionais especializados, é possível reduzir significativamente a carga tributária de forma legal e segura, contribuindo para o crescimento e a competitividade do seu negócio.

Lembre-se: economizar em impostos não é apenas sobre pagar menos, mas sobre pagar o justo, conforme previsto na legislação.
          `,
          image: "/placeholder.svg?height=600&width=1200",
          date: "15 de abril de 2023",
          readTime: "5 min de leitura",
          author: {
            name: "Carlos Oliveira",
            role: "Contador Sênior",
            image: "/placeholder.svg?height=100&width=100",
          },
          category: "Tributário",
          tags: ["Impostos", "Planejamento", "Economia"],
          commentCount: 8,
        },
        "mudancas-legislacao-contabil-2023": {
          id: 2,
          title: "As principais mudanças na legislação contábil para 2023",
          excerpt: "Fique por dentro das principais alterações na legislação contábil e fiscal que entram em vigor em 2023 e como elas afetam o seu negócio.",
          content: `
## Introdução às mudanças legislativas de 2023

O ano de 2023 traz consigo diversas alterações importantes na legislação contábil e fiscal brasileira. Estas mudanças impactam diretamente a rotina das empresas e exigem adaptação rápida para garantir a conformidade com as novas regras.

## Principais alterações na legislação contábil

### 1. Novas regras para o eSocial

O eSocial continua seu processo de implementação com novas funcionalidades e obrigatoriedades. Em 2023, o sistema passa a integrar mais eventos e se torna obrigatório para um número maior de empresas.

### 2. Mudanças no SPED Contábil

A Escrituração Contábil Digital (ECD) apresenta novos layouts e informações obrigatórias, exigindo atualização dos sistemas contábeis e maior detalhamento nas informações prestadas.

### 3. Alterações nas regras de depreciação

Novas diretrizes para cálculo e registro de depreciação de ativos, alinhando-se às normas internacionais de contabilidade (IFRS).

### 4. Implementação da LGPD na contabilidade

A Lei Geral de Proteção de Dados impacta diretamente os processos contábeis, exigindo maior cuidado no tratamento de dados pessoais de colaboradores, clientes e fornecedores.

## Mudanças na legislação fiscal

### 1. Alterações nas alíquotas de impostos

Diversos tributos tiveram suas alíquotas revisadas, com destaque para mudanças no ICMS em vários estados e alterações nas contribuições previdenciárias.

### 2. Novas regras para o Simples Nacional

Atualização de limites, alíquotas e procedimentos para empresas optantes pelo Simples Nacional, impactando diretamente o planejamento tributário.

### 3. Mudanças na tributação de operações internacionais

Novas regras para tributação de importações e exportações, com foco no combate à evasão fiscal e alinhamento às diretrizes da OCDE.

## Como se preparar para as mudanças

1. **Mantenha-se informado**: Acompanhe regularmente as atualizações legislativas
2. **Invista em capacitação**: Treine sua equipe para lidar com as novas exigências
3. **Atualize seus sistemas**: Garanta que seu software contábil esteja preparado para as mudanças
4. **Consulte especialistas**: Conte com o apoio de profissionais especializados para implementar as adaptações necessárias

## Conclusão

As mudanças na legislação contábil e fiscal para 2023 representam desafios significativos para as empresas brasileiras. No entanto, com planejamento adequado e suporte profissional, é possível não apenas se adequar às novas regras, mas também identificar oportunidades de otimização fiscal e contábil.

Manter-se em conformidade com a legislação é fundamental para evitar penalidades e garantir a saúde financeira do seu negócio no longo prazo.
          `,
          image: "/placeholder.svg?height=600&width=1200",
          date: "28 de março de 2023",
          readTime: "7 min de leitura",
          author: {
            name: "Ana Silva",
            role: "Especialista em Legislação",
            image: "/placeholder.svg?height=100&width=100",
          },
          category: "Legislação",
          tags: ["Legislação", "Atualização", "Contabilidade"],
          commentCount: 5,
        },
        "contabilidade-digital-transformacao-tecnologica": {
          id: 3,
          title: "Contabilidade digital: como a tecnologia está transformando o setor",
          excerpt: "Conheça as principais tendências tecnológicas que estão revolucionando a contabilidade e como elas podem beneficiar o seu negócio.",
          content: `
## A revolução digital na contabilidade

A contabilidade, uma das profissões mais antigas do mundo, está passando por uma transformação digital sem precedentes. As novas tecnologias estão mudando radicalmente a forma como os profissionais contábeis trabalham e como as empresas gerenciam suas finanças.

## Principais tecnologias que estão transformando a contabilidade

### 1. Computação em nuvem

Os sistemas de contabilidade baseados em nuvem permitem acesso remoto aos dados financeiros, facilitando o trabalho à distância e a colaboração entre equipes. Além disso, oferecem maior segurança e redução de custos com infraestrutura de TI.

### 2. Automação de processos

Tarefas repetitivas como lançamentos contábeis, conciliação bancária e geração de relatórios estão sendo automatizadas, permitindo que os contadores foquem em atividades estratégicas e de maior valor agregado.

### 3. Inteligência Artificial e Machine Learning

Algoritmos avançados estão sendo utilizados para análise preditiva, detecção de fraudes e tomada de decisões baseadas em dados. A IA também está revolucionando a auditoria, permitindo a análise de 100% das transações, em vez de amostragens.

### 4. Blockchain

A tecnologia blockchain promete revolucionar a contabilidade ao oferecer registros imutáveis e transparentes, reduzindo a necessidade de reconciliações e aumentando a confiabilidade das informações financeiras.

## Benefícios da contabilidade digital

### Para contadores:
- Redução de tarefas manuais e repetitivas
- Mais tempo para análises estratégicas e consultoria
- Possibilidade de atender mais clientes com a mesma estrutura
- Melhoria na qualidade e precisão dos serviços

### Para empresas:
- Acesso em tempo real às informações financeiras
- Redução de custos operacionais
- Tomada de decisões mais ágil e baseada em dados
- Maior conformidade com obrigações fiscais
- Melhor gestão de fluxo de caixa

## Desafios da transformação digital

Apesar dos benefícios, a transformação digital na contabilidade também apresenta desafios:

1. **Necessidade de capacitação**: Profissionais precisam desenvolver novas habilidades
2. **Investimento em tecnologia**: Aquisição e implementação de novos sistemas
3. **Segurança de dados**: Proteção contra vazamentos e ataques cibernéticos
4. **Resistência à mudança**: Adaptação a novos processos e formas de trabalho

## O futuro da contabilidade

A contabilidade do futuro será cada vez mais estratégica e menos operacional. Os contadores atuarão como consultores de negócios, utilizando dados e análises avançadas para orientar decisões empresariais.

Algumas tendências para os próximos anos incluem:

- Contabilidade em tempo real
- Integração total entre sistemas financeiros, fiscais e gerenciais
- Uso de realidade aumentada para visualização de dados
- Contabilidade preditiva baseada em IA

## Conclusão

A transformação digital na contabilidade não é apenas uma tendência passageira, mas uma revolução que está redefinindo o setor. Empresas e profissionais que abraçarem essas mudanças estarão melhor posicionados para prosperar no novo cenário econômico.

Investir em tecnologia e capacitação é essencial para aproveitar ao máximo os benefícios da contabilidade digital e garantir a competitividade no mercado.
          `,
          image: "/placeholder.svg?height=600&width=1200",
          date: "10 de março de 2023",
          readTime: "6 min de leitura",
          author: {
            name: "Roberto Santos",
            role: "Especialista em Tecnologia Contábil",
            image: "/placeholder.svg?height=100&width=100",
          },
          category: "Tecnologia",
          tags: ["Digital", "Inovação", "Tecnologia"],
          commentCount: 12,
        },
        "guia-simples-nacional-vantagens-desvantagens": {
          id: 4,
          title: "Guia completo sobre o Simples Nacional: vantagens e desvantagens",
          excerpt: "Entenda o que é o Simples Nacional, quem pode optar por esse regime tributário e quais são suas vantagens e desvantagens.",
          content: `
## O que é o Simples Nacional?

O Simples Nacional é um regime tributário diferenciado, simplificado e favorecido, aplicável às Microempresas (ME) e Empresas de Pequeno Porte (EPP). Foi instituído pela Lei Complementar nº 123/2006 e representa uma forma simplificada e unificada de recolhimento de tributos, por meio da aplicação de percentuais favorecidos sobre a receita bruta.

## Quem pode optar pelo Simples Nacional?

Para ser optante do Simples Nacional, a empresa precisa:

- Ser classificada como Microempresa (faturamento anual até R$ 360 mil) ou Empresa de Pequeno Porte (faturamento anual entre R$ 360 mil e R$ 4,8 milhões)
- Não exercer atividades impedidas pela legislação
- Não ter sócio que participe com mais de 10% do capital de outra empresa não optante, desde que o faturamento global ultrapasse R$ 4,8 milhões
- Não ser filial ou representante de empresa estrangeira
- Não ter débitos com o INSS ou com as Fazendas Públicas Federal, Estadual ou Municipal

## Vantagens do Simples Nacional

### 1. Simplificação tributária

O principal benefício do Simples Nacional é a unificação de oito tributos (IRPJ, CSLL, PIS, COFINS, IPI, CPP, ICMS e ISS) em uma única guia de pagamento, o DAS (Documento de Arrecadação do Simples Nacional).

### 2. Redução da carga tributária

Para muitas empresas, especialmente as de menor porte, o Simples Nacional representa uma carga tributária menor em comparação com outros regimes.

### 3. Simplificação contábil

As empresas optantes têm obrigações contábeis simplificadas, embora ainda precisem manter escrituração contábil regular.

### 4. Menos burocracia

Redução significativa nas obrigações acessórias, com menos declarações e documentos a serem entregues aos órgãos fiscalizadores.

### 5. Facilidade de regularização

O Simples Nacional oferece condições especiais para parcelamento de dívidas tributárias.

## Desvantagens do Simples Nacional

### 1. Limitação de faturamento

O limite de faturamento anual de R$ 4,8 milhões pode ser restritivo para empresas em crescimento.

### 2. Restrições de atividades

Diversas atividades não podem optar pelo Simples Nacional, como empresas que atuam no setor financeiro, consultorias e algumas categorias de serviços profissionais.

### 3. Limitações de créditos tributários

Empresas que fornecem para outras no Lucro Real não geram créditos de PIS e COFINS, o que pode torná-las menos competitivas em determinados mercados.

### 4. Alíquotas progressivas

À medida que o faturamento aumenta, as alíquotas também sobem, podendo tornar o regime menos vantajoso para empresas com maior receita.

### 5. Restrições na participação societária

Limitações quanto à participação em outras empresas podem restringir estratégias de expansão e diversificação.

## Como calcular os impostos no Simples Nacional

O cálculo do Simples Nacional é baseado na receita bruta acumulada nos 12 meses anteriores ao período de apuração. Com base nesse valor, aplica-se a alíquota correspondente à faixa de faturamento, conforme tabelas específicas para cada anexo.

A fórmula básica é:
\`\`\`
Valor devido = (Receita Bruta × Alíquota) - Parcela a Deduzir
\`\`\`

## Conclusão

O Simples Nacional pode ser extremamente vantajoso para muitas empresas, especialmente as de menor porte e com estruturas mais simples. No entanto, não é a melhor opção para todos os negócios.

A decisão sobre o regime tributário deve ser baseada em uma análise detalhada da situação específica da empresa, considerando não apenas o aspecto tributário imediato, mas também os planos de crescimento e as estratégias de longo prazo.

Recomenda-se sempre consultar um contador especializado para avaliar qual o regime mais vantajoso para o seu negócio, considerando todas as particularidades e projeções futuras.
          `,
          image: "/placeholder.svg?height=600&width=1200",
          date: "22 de fevereiro de 2023",
          readTime: "8 min de leitura",
          author: {
            name: "Juliana Costa",
            role: "Consultora Tributária",
            image: "/placeholder.svg?height=100&width=100",
          },
          category: "Tributário",
          tags: ["Simples Nacional", "Tributação", "MEI"],
          commentCount: 15,
        },
        "preparacao-auditoria-fiscal": {
          id: 5,
          title: "Como preparar sua empresa para uma auditoria fiscal",
          excerpt: "Dicas práticas para preparar sua empresa para uma auditoria fiscal e evitar problemas com o Fisco.",
          content: `
## A importância de estar preparado para auditorias fiscais

Auditorias fiscais são procedimentos realizados pelas autoridades tributárias para verificar o cumprimento das obrigações fiscais pelas empresas. Estar preparado para esses eventos é fundamental para evitar multas, juros e até mesmo processos administrativos ou judiciais.

## Sinais de que sua empresa pode ser alvo de uma auditoria fiscal

Alguns fatores aumentam as chances de uma empresa ser selecionada para auditoria:

- Inconsistências nas declarações fiscais
- Variações significativas de faturamento entre períodos
- Alto volume de operações com empresas do Simples Nacional
- Margens de lucro muito diferentes da média do setor
- Denúncias de irregularidades
- Histórico de infrações fiscais

## Como se preparar para uma auditoria fiscal

### 1. Mantenha a documentação organizada

Todos os documentos fiscais, contábeis e societários devem estar organizados e facilmente acessíveis. Isso inclui:

- Notas fiscais de entrada e saída
- Comprovantes de pagamento de tributos
- Livros fiscais e contábeis
- Contratos com clientes e fornecedores
- Documentos societários (contrato social, alterações, atas)
- Documentos trabalhistas e previdenciários

### 2. Realize auditorias internas periódicas

Auditorias internas preventivas ajudam a identificar e corrigir problemas antes que eles sejam detectados pelo Fisco. Considere:

- Revisão de procedimentos fiscais
- Verificação de cálculos de impostos
- Análise de créditos tributários
- Conferência de obrigações acessórias

### 3. Mantenha-se atualizado sobre a legislação

A legislação tributária muda constantemente. É essencial:

- Acompanhar as alterações legislativas
- Participar de cursos e treinamentos
- Contar com assessoria jurídica e contábil especializada
- Assinar informativos e publicações do setor

### 4. Invista em tecnologia

Sistemas de gestão fiscal e contábil ajudam a:

- Automatizar cálculos de impostos
- Gerar relatórios precisos
- Manter registros detalhados
- Reduzir erros humanos
- Facilitar o cumprimento de obrigações acessórias

### 5. Prepare sua equipe

Todos os colaboradores envolvidos em processos fiscais devem:

- Conhecer os procedimentos corretos
- Saber como agir durante uma fiscalização
- Entender a importância da conformidade fiscal
- Estar preparados para responder questionamentos

## Durante a auditoria fiscal

Se sua empresa for selecionada para uma auditoria, siga estas orientações:

1. **Mantenha a calma**: Auditorias são procedimentos normais e não significam necessariamente que há irregularidades
2. **Seja cooperativo**: Facilite o trabalho dos auditores, fornecendo os documentos solicitados
3. **Seja preciso**: Responda apenas o que foi perguntado, de forma clara e objetiva
4. **Documente tudo**: Mantenha registro de todos os documentos entregues e solicitações feitas
5. **Conte com profissionais**: Tenha contadores e advogados presentes durante o processo

## Após a auditoria

Independentemente do resultado:

1. **Analise os apontamentos**: Entenda os problemas identificados
2. **Implemente melhorias**: Corrija processos para evitar reincidências
3. **Considere regularizações**: Avalie programas de regularização fiscal se necessário
4. **Documente as ações corretivas**: Mantenha registro das medidas tomadas

## Conclusão

Estar preparado para auditorias fiscais não é apenas uma questão de conformidade, mas também uma estratégia de gestão de riscos. Empresas que mantêm suas obrigações fiscais em dia e possuem processos bem estruturados enfrentam esses procedimentos com tranquilidade e minimizam os riscos de penalidades.

Investir em organização, tecnologia e conhecimento é muito mais econômico do que arcar com multas, juros e processos decorrentes de irregularidades fiscais.
          `,
          image: "/placeholder.svg?height=600&width=1200",
          date: "5 de fevereiro de 2023",
          readTime: "6 min de leitura",
          author: {
            name: "Carlos Oliveira",
            role: "Contador Sênior",
            image: "/placeholder.svg?height=100&width=100",
          },
          category: "Fiscal",
          tags: ["Auditoria", "Fiscal", "Compliance"],
          commentCount: 3,
        },
      }

      const foundPost = blogPosts[slug]
      if (foundPost) {
        setPost(foundPost)
        
        const related = Object.values(blogPosts)
          .filter((p) => p.id !== foundPost.id && 
            (p.category === foundPost.category || 
             p.tags.some(tag => foundPost.tags.includes(tag))))
          .slice(0, 3)
        
        setRelatedPosts(related)
      } else {
        router.push("/blog/not-found")
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug, router])

  // Check saved status when post is loaded
  useEffect(() => {
    if (post) {
      const savedPosts = localStorage.getItem("savedPosts")
      if (savedPosts) {
        const savedPostsArray = JSON.parse(savedPosts)
        setIsSaved(savedPostsArray.includes(post.id))
      }
    }
  }, [post])

  // Toggle save post
  const toggleSavePost = () => {
    if (!post) return

    const savedPosts = localStorage.getItem("savedPosts")
    let savedPostsArray = savedPosts ? JSON.parse(savedPosts) : []

    if (isSaved) {
      savedPostsArray = savedPostsArray.filter((id: number) => id !== post.id)
    } else {
      savedPostsArray.push(post.id)
    }

    localStorage.setItem("savedPosts", JSON.stringify(savedPostsArray))
    setIsSaved(!isSaved)
  }

  // Share post
  const sharePost = () => {
    if (!post) return

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-full mb-6" />
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-[400px] w-full mb-8 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <AnimateOnScroll variant="fade-up" duration={0.8}>
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 hover:bg-[#00A7E1]/10 hover:text-[#00A7E1]"
              onClick={() => router.push("/blog")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para o blog
            </Button>

            <article>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Link href={`/blog/categoria/${post.category.toLowerCase()}`}>
                    <Badge className="bg-[#00A7E1]/10 text-[#00A7E1] hover:bg-[#00A7E1]/20 border-none">
                      {post.category}
                    </Badge>
                  </Link>
                  {post.tags.map((tag: string) => (
                    <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`}>
                      <Badge variant="outline" className="hover:bg-gray-100">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-sm text-gray-500">{post.author.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-8 rounded-xl overflow-hidden">
                <Image 
                  src={post.image || "/placeholder.svg"} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{post.commentCount} comentários</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full" 
                    onClick={sharePost}
                  >
                    <Share2 className="h-4 w-4 text-gray-500 hover:text-[#00A7E1]" />
                    <span className="sr-only">Compartilhar</span>
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full" 
                    onClick={toggleSavePost}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-4 w-4 text-[#00A7E1]" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-gray-500 hover:text-[#00A7E1]" />
                    )}
                    <span className="sr-only">{isSaved ? "Salvo" : "Salvar"}</span>
                  </Button>
                </div>
              </div>

              <div 
                className="prose prose-lg max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-semibold
                  prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-8
                  prose-h3:mt-6 
                  prose-p:text-gray-700 prose-p:text-lg 
                  prose-li:text-gray-700 prose-li:text-lg
                  prose-a:text-[#00A7E1] prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#0077a8]
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
                  prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-[#00A7E1] prose-blockquote:pl-4 prose-blockquote:text-gray-500 prose-blockquote:italic
                  prose-table:w-full prose-table:border-collapse
                  prose-th:bg-gray-50 prose-th:p-3 prose-th:border prose-th:border-gray-200
                  prose-td:p-3 prose-td:border prose-td:border-gray-200
                  prose-img:rounded-lg prose-img:my-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 pt-6 border-t">
                <h3 className="text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`}>
                      <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#00A7E1]/10 hover:text-[#00A7E1] transition-colors">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-12 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-6">Artigos Relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug || relatedPost.id}`}>
                        <motion.div
                          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                          whileHover={{ y: -5 }}
                        >
                          <div className="relative h-40 w-full">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-lg mb-2 line-clamp-2">{relatedPost.title}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{relatedPost.date}</span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </AnimateOnScroll>
        </div>

        <div className="space-y-12">
          <BlogCategories />
          <BlogNewsletter />
        </div>
      </div>
    </div>
  )
}