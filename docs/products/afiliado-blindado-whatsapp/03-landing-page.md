# 🖥️ Landing Page — Afiliado Blindado

> Copy completa nos 14 blocos definidos em `docs/marketing/playbook-low-ticket-hotmart.md`. Pronta para virar `hero_section`/`benefits_section`/etc. em `landing_pages` via `LandingPageEngine.ts`.

---

### 1. Headline

> ## Faça sua primeira venda como afiliado em até 7 dias — mesmo sem aparecer e sem gastar 1 real em anúncio

### 2. Subheadline

**Para quem é**: pessoas que já ouviram falar em ganhar dinheiro como afiliado, têm WhatsApp e Instagram, mas nunca conseguiram vender porque acham que precisa de tráfego pago ou aparecer em vídeo.

**Para quem NÃO é**: quem procura fórmula mágica sem aplicar nada. Aqui tem sistema — e sistema exige 30 minutos por dia.

### 3. Bloco de prova imediata

> *"Print de comissão real ou depoimento em vídeo curto (15-30s) de um comprador aplicando o Módulo 4 e fechando a primeira venda em 3 dias."*
(placeholder até coleta de prova social real — nunca usar depoimento fake)

### 4. Bloco de Dor (agitação)

Você já:
- Colocou o link de afiliado na bio e esperou alguém clicar sozinho?
- Ficou com vergonha de mandar mensagem pro seus contatos porque parece "spam"?
- Achou que precisava de milhares de seguidores ou dinheiro pra anúncio pra começar?
- Comprou um curso genérico de afiliados que só falava de "mentalidade" e nenhum script pronto?

Se sim: o problema nunca foi você. Foi a falta de um **sistema** de abordagem.

### 5. Bloco de Virada

Existe um jeito mais simples: contatos não são todos iguais. Uns estão frios, outros mornos, outros já quentes prontos pra comprar — e cada um precisa de uma abordagem diferente. O **Método Afiliado Blindado** te dá o roteiro exato pra cada estágio, usando só o WhatsApp e o Instagram que você já tem.

### 6. O que você recebe

- ✅ Sistema completo dos 3 estágios de contato (frio → morno → quente)
- ✅ **30+ scripts prontos** de abordagem, qualificação e fechamento
- ✅ Sua primeira mensagem de venda pronta pra mandar **hoje mesmo**
- ✅ Sistema de automação leve (etiquetas, respostas rápidas, catálogo)
- ✅ Calendário de 30 dias de conteúdo pronto pra Stories e Feed
- ✅ Banco de 60 artes editáveis
- ✅ Planilha de controle de comissões

### 7. Prova social

*(Seção populada após os primeiros 5-10 compradores — coletar via script de pós-venda do Módulo 4. Formato: prints de conversa + resultado, nome + foto com autorização.)*

### 8. Sobre quem entrega

Método construído a partir da aplicação real da regra 60/40 de ofertas digitais e do sistema de vendas em linha reta — não teoria de curso genérico, mas estrutura testada de conversa que qualifica antes de vender.

### 9. Oferta e Ancoragem de preço

> ~~De R$ 197~~ **por R$ 47** à vista (ou 12x no cartão)

### 10. Bônus

1. 🎁 Banco de 60 artes editáveis para Stories/Feed
2. 🎁 Planilha de controle de comissões e follow-up
3. 🎁 Grupo de suporte no WhatsApp por 30 dias

### 11. Garantia

> 🛡️ **Garantia incondicional de 7 dias.** Aplicou os scripts do Módulo 4 e não fez nenhuma venda? Devolvemos 100% do valor, sem perguntas.

### 12. FAQ

**"Preciso aparecer em vídeo?"**
Não. Todo o sistema funciona com texto (Status, Stories com print/texto, mensagens no WhatsApp).

**"Preciso ter seguidores?"**
Não. O sistema foi desenhado pra quem tem poucos contatos, mas quer trabalhar eles direito.

**"Vou receber suporte?"**
Sim, grupo de suporte por 30 dias incluso nos bônus.

**"E se eu não souber qual produto promover?"**
O Módulo 1 ensina o checklist de escolha de produto/oferta.

**"Quanto tempo por dia eu preciso dedicar?"**
A rotina sugerida (Módulo 5) é de 30 minutos por dia.

### 13. CTA final

> ## 👉 Quero começar minha primeira venda em 7 dias — R$ 47

*(Botão repetido: "Garantir meu acesso agora")*

### 14. Rodapé

Suporte: [e-mail/whatsapp de suporte] · Termos de uso · Política de privacidade · Este produto não garante resultados financeiros — resultados dependem de aplicação individual.

---

## Notas de implementação (`hero_section` / `benefits_section` JSON)

```json
{
  "hero_section": {
    "headline": "Faça sua primeira venda como afiliado em até 7 dias — mesmo sem aparecer e sem gastar 1 real em anúncio",
    "subheadline": "Para quem tem WhatsApp e Instagram e nunca conseguiu vender como afiliado por achar que precisa de tráfego pago.",
    "ctaText": "Quero garantir meu acesso"
  },
  "benefits_section": [
    "Sistema dos 3 estágios de contato (frio, morno, quente)",
    "30+ scripts prontos de abordagem, qualificação e fechamento",
    "Sua primeira mensagem de venda pronta pra mandar hoje",
    "Automação leve com etiquetas e respostas rápidas",
    "Calendário de 30 dias de conteúdo pronto",
    "Banco de 60 artes editáveis + planilha de comissões"
  ]
}
```
