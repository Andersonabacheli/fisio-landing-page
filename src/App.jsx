import { useState } from 'react'
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Heart, Sparkles, Shield, Users, Phone, Mail, MapPin, Menu, X, ChevronDown } from 'lucide-react'
import heroImage from './assets/fisioterapeuta-hero.png'
import tratamento1 from './assets/tratamento-1.webp'
import tratamento2 from './assets/tratamento-2.jpg'
import tratamento3 from './assets/tratamento-3.jpg'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  })
  const [openFaq, setOpenFaq] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || serviceId === 'SEU_SERVICE_ID' || templateId === 'SEU_TEMPLATE_ID') {
        console.error('As variáveis de ambiente do EmailJS não estão configuradas corretamente no arquivo .env.local');
        alert('O serviço de envio de e-mail não está configurado. Por favor, contate o administrador do site.');
        return;
    }

    emailjs.send(serviceId, templateId, formData, publicKey)
      .then((result) => {
          console.log(result.text);
          alert('Obrigada pelo contato! Sua mensagem foi enviada com sucesso.');
          setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
      }, (error) => {
          console.log(error.text);
          alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
      });
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const tratamentos = [
    {
      titulo: 'Fisioterapia Ortopédica',
      descricao: 'Tratamento especializado para lesões musculoesqueléticas, aliviando dores e restaurando a mobilidade com técnicas eficazes.',
      imagem: tratamento1
    },
    {
      titulo: 'Fisioterapia Neurológica',
      descricao: 'Reabilitação para pacientes com doenças neurológicas, promovendo independência e melhora na qualidade de vida.',
      imagem: tratamento2
    },
    {
      titulo: 'Reabilitação Pós-Cirúrgica',
      descricao: 'Cuidados personalizados para uma recuperação segura e eficiente após cirurgias ortopédicas e neurológicas.',
      imagem: tratamento3
    },
    {
      titulo: 'Pilates Terapêutico',
      descricao: 'Exercícios controlados que fortalecem o corpo, melhoram a postura e ajudam na prevenção de lesões.',
      imagem: tratamento1
    },
    {
      titulo: 'Terapia Manual',
      descricao: 'Técnicas especializadas para relaxamento muscular, alívio de tensões e restauração da mobilidade.',
      imagem: tratamento2
    }
  ]

  const depoimentos = [
    {
      nome: 'Camila Ferreira',
      texto: 'O Pilates Terapêutico fez toda a diferença na minha postura e bem-estar. A abordagem é incrível, sempre atenciosa e focada no que realmente precisamos!',
      cargo: 'Paciente'
    },
    {
      nome: 'Mariana Souza',
      texto: 'Comecei o tratamento após uma cirurgia no joelho e fiquei impressionada com a atenção e o profissionalismo. Minha recuperação foi muito mais rápida do que eu esperava!',
      cargo: 'Paciente'
    },
    {
      nome: 'Ricardo Almeida',
      texto: 'Sofria com dores crônicas nas costas e, depois das sessões de fisioterapia, minha qualidade de vida melhorou completamente. Extremamente competente e cuidadosa!',
      cargo: 'Paciente'
    }
  ]

  const faqs = [
    {
      pergunta: 'Como funciona a primeira consulta?',
      resposta: 'Na primeira consulta, realizo uma avaliação detalhada para entender suas necessidades e definir o melhor plano de tratamento personalizado para você.'
    },
    {
      pergunta: 'Quanto tempo dura cada sessão?',
      resposta: 'Cada sessão tem duração média de 50 minutos, podendo variar conforme o tipo de tratamento e as necessidades individuais do paciente.'
    },
    {
      pergunta: 'Quantas sessões são necessárias?',
      resposta: 'O número de sessões varia de acordo com o diagnóstico e a evolução de cada paciente. Após a avaliação inicial, elaboro um plano de tratamento com previsão de sessões.'
    },
    {
      pergunta: 'Aceita convênios?',
      resposta: 'Trabalho com diversos convênios médicos. Entre em contato para verificar se o seu plano está entre os aceitos.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container-custom flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <span className="text-xl font-bold text-primary">Fisioterapia</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('sobre')} className="text-foreground hover:text-primary transition-colors">
              Sobre Mim
            </button>
            <button onClick={() => scrollToSection('tratamentos')} className="text-foreground hover:text-primary transition-colors">
              Tratamentos
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-foreground hover:text-primary transition-colors">
              Depoimentos
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-foreground hover:text-primary transition-colors">
              Contato
            </button>
            <Button onClick={() => scrollToSection('contato')} className="bg-primary hover:bg-primary/90">
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col gap-4 p-4">
              <button onClick={() => scrollToSection('sobre')} className="text-left text-foreground hover:text-primary transition-colors">
                Sobre Mim
              </button>
              <button onClick={() => scrollToSection('tratamentos')} className="text-left text-foreground hover:text-primary transition-colors">
                Tratamentos
              </button>
              <button onClick={() => scrollToSection('depoimentos')} className="text-left text-foreground hover:text-primary transition-colors">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-left text-foreground hover:text-primary transition-colors">
                Contato
              </button>
              <Button onClick={() => scrollToSection('contato')} className="bg-primary hover:bg-primary/90 w-full">
                Agendar Consulta
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-16 px-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Recupere seu <span className="text-gradient">Bem-Estar</span> e Movimento
              </h1>
              <p className="text-lg text-muted-foreground">
                Fisioterapia especializada e personalizada, focada na sua recuperação e qualidade de vida. 
                Aqui você encontra cuidado, confiança e resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-lg"
                  onClick={() => scrollToSection('contato')}
                >
                  Agendar Consulta
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg border-primary text-primary hover:bg-primary/10"
                  onClick={() => scrollToSection('tratamentos')}
                >
                  Conheça os Tratamentos
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Fisioterapeuta profissional" 
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Mim Section */}
      <section id="sobre" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Conheça a <span className="text-gradient">Fisioterapeuta</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Com mais de 10 anos de experiência, sou uma profissional apaixonada por ajudar meus pacientes 
              a se recuperarem e alcançarem uma vida mais saudável e sem dores. Acredito que cada paciente 
              é único, e por isso, meu trabalho é personalizado. Meu compromisso vai além do tratamento da 
              dor – estou aqui para entender as suas necessidades, desenvolver um plano de recuperação 
              adequado e garantir que você alcance os melhores resultados possíveis.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 pt-8">
              <Card className="border-primary/20 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center space-y-2">
                  <Heart className="w-12 h-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Abordagem Personalizada</h3>
                  <p className="text-sm text-muted-foreground">Planos individualizados para cada paciente</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center space-y-2">
                  <Sparkles className="w-12 h-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Tecnologia de Ponta</h3>
                  <p className="text-sm text-muted-foreground">Equipamentos modernos para resultados rápidos</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center space-y-2">
                  <Shield className="w-12 h-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Cuidado Integral</h3>
                  <p className="text-sm text-muted-foreground">Foco em tratamento e prevenção</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center space-y-2">
                  <Users className="w-12 h-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Empatia e Acolhimento</h3>
                  <p className="text-sm text-muted-foreground">Ambiente acolhedor e compreensivo</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamentos Section */}
      <section id="tratamentos" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Nossos <span className="text-gradient">Tratamentos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuidado de cada paciente de forma individualizada, utilizando técnicas eficazes para 
              aliviar dores, restaurar a mobilidade e melhorar sua qualidade de vida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tratamentos.map((tratamento, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tratamento.imagem} 
                    alt={tratamento.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-primary">{tratamento.titulo}</h3>
                  <p className="text-muted-foreground">{tratamento.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => scrollToSection('contato')}
            >
              Agendar Avaliação
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              O Que Nossos <span className="text-gradient">Pacientes Dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-5 h-5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{depoimento.texto}"</p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">{depoimento.nome}</p>
                    <p className="text-sm text-muted-foreground">{depoimento.cargo}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-3xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Perguntas <span className="text-gradient">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold">{faq.pergunta}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.resposta}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Entre em <span className="text-gradient">Contato</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Agende sua consulta e dê o primeiro passo para uma vida com mais qualidade e equilíbrio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">E-mail</h3>
                    <p className="text-muted-foreground">contato@fisioterapia.com.br</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Endereço</h3>
                    <p className="text-muted-foreground">São Paulo, SP</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Segunda a Sexta-feira: 08h às 19h<br />
                      Atendimento com horário marcado
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium mb-2">Nome *</label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">E-mail *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium mb-2">Telefone *</label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium mb-2">Mensagem</label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Conte-nos sobre sua necessidade..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-8 h-8 fill-current" />
                <span className="text-xl font-bold">Fisioterapia</span>
              </div>
              <p className="text-primary-foreground/80">
                Cuidando da sua saúde e bem-estar com dedicação e profissionalismo.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('sobre')} className="block hover:underline text-primary-foreground/80 hover:text-primary-foreground">
                  Sobre Mim
                </button>
                <button onClick={() => scrollToSection('tratamentos')} className="block hover:underline text-primary-foreground/80 hover:text-primary-foreground">
                  Tratamentos
                </button>
                <button onClick={() => scrollToSection('depoimentos')} className="block hover:underline text-primary-foreground/80 hover:text-primary-foreground">
                  Depoimentos
                </button>
                <button onClick={() => scrollToSection('contato')} className="block hover:underline text-primary-foreground/80 hover:text-primary-foreground">
                  Contato
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>(11) 99999-9999</p>
                <p>contato@fisioterapia.com.br</p>
                <p>São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 Fisioterapia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
