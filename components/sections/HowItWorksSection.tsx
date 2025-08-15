
import { Package, Camera, Clock } from "lucide-react";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Package,
      title: "Escolha seu pacote",
      description: "Do básico ao premium, todos incluem entrega rápida, qualidade profissional e suporte se precisar. Você só escolhe o que combina com seu objetivo — o resto é com a gente."
    },
    {
      icon: Camera,
      title: "Envie suas fotos e referências",
      description: "Com um link seguro, você envia suas selfies ou fotos de referência em segundos, direto do celular ou computador. Pode adicionar inspirações de estilo. Não precisa instalar nada."
    },
    {
      icon: Clock,
      title: "Receba suas fotos IMEDIATAMENTE",
      description: "Você recebe um e-mail/WhatsApp com link seguro para baixar suas fotos em alta resolução, prontas para usar. Caso precise, reenviamos até você confirmar que está tudo certo."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 md:mb-16 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 px-2">
            <span className="text-primary">Como Funciona</span> (Passo a Passo)
          </h2>
          <div className="bg-gradient-card border border-card-border rounded-lg p-6 md:p-8 mt-8 max-w-4xl mx-auto">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-left">
              Após realizar a compra, você será redirecionado automaticamente para um formulário seguro onde poderá anexar suas fotos.
              O envio é simples: basta escolher as imagens direto do seu celular ou computador e, se quiser, adicionar referências de estilo para personalizar seu ensaio.
              Nosso sistema recebe seus arquivos com total segurança e em poucos minutos você recebe suas fotos prontas no seu e-mail ou WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center fade-in px-4 md:px-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-4 md:mb-6 flex justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                </div>
                <div className="absolute top-0 right-0 sm:-top-2 sm:-right-2 w-6 h-6 md:w-8 md:h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xs md:text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center fade-in px-4">
          <p className="text-base md:text-lg text-muted-foreground italic mb-6 md:mb-8">
            "É isso. Sem complicação. Sem sair de casa."
          </p>
          <SmoothScrollLink href="#pricing" className="inline-block">
            <button className="bg-primary text-primary-foreground font-semibold text-sm md:text-base hover:bg-primary-hover hover:shadow-glow hover:-translate-y-0.5 hover:scale-105 h-12 md:h-14 rounded-lg px-6 md:px-10 text-base md:text-lg transition-all duration-300 w-full max-w-xs md:w-auto">
              Começar Meu Ensaio Agora
            </button>
          </SmoothScrollLink>
        </div>
      </div>
    </section>
  );
}
