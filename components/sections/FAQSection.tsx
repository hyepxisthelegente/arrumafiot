
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

export function FAQSection() {
  const faqs = [
    {
      question: "Como envio minhas fotos?",
      answer: "Você recebe um link seguro para upload, que funciona em qualquer celular ou computador. Basta clicar e enviar."
    },
    {
      question: "Em qual formato receberei minhas fotos?",
      answer: "Você recebe arquivos em alta resolução (.JPG ou .PNG), prontos para postar, imprimir ou usar profissionalmente."
    },
    {
      question: "Onde recebo meu ensaio pronto?",
      answer: "No seu e-mail (ou WhatsApp, se preferir), com link seguro para download."
    },
    {
      question: "E se eu não receber?",
      answer: "Nosso suporte reenviará imediatamente ou reembolsará seu pedido, sem burocracia."
    },
    {
      question: "Preciso instalar algum programa?",
      answer: "Não. Todo o processo é online e simples, como mandar fotos no WhatsApp."
    },
    {
      question: "Quantas fotos devo enviar?",
      answer: "Entre 3 e 8 fotos com boa luz. Quanto mais variedade, melhor será o resultado final. Recomendamos fotos com diferentes ângulos e expressões."
    },
    {
      question: "Posso escolher mais de um estilo?",
      answer: "Sim! Dependendo do seu plano, você pode escolher até 7 estilos diferentes. Cada estilo oferece uma abordagem única para suas fotos profissionais."
    },
    {
      question: "E se eu não gostar do resultado?",
      answer: "Tem revisão incluída em todos os planos. A gente ajusta com você até ficar do seu jeito. Sua satisfação é nossa prioridade."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 md:mb-16 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 px-2">
            <span className="text-primary">FAQ</span> – Perguntas Frequentes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground px-2">
            Tire suas dúvidas antes de começar
          </p>
        </div>

        <div className="fade-in px-4 md:px-0">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gradient-card rounded-lg border border-card-border px-4 md:px-6 hover:shadow-card transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16 fade-in px-4">
          <SmoothScrollLink href="#pricing" className="inline-block">
            <button className="bg-primary text-primary-foreground font-semibold text-sm md:text-base hover:bg-primary-hover hover:shadow-glow hover:-translate-y-0.5 hover:scale-105 h-12 md:h-14 rounded-lg px-6 md:px-10 text-base md:text-lg transition-all duration-300 w-full max-w-xs md:w-auto">
              Todas Dúvidas Esclarecidas? Vamos Começar!
            </button>
          </SmoothScrollLink>
        </div>
      </div>
    </section>
  );
}
