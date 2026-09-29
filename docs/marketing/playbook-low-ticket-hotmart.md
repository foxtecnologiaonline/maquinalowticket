# 🎯 Playbook de Vendas Low Ticket — Metodologia Hotmart (60/40 + Linha Reta)

> Documento de referência estratégica para a Máquina Low Ticket. Define a metodologia de produto, copywriting, LP, tráfego pago e priorização de nichos usada em toda criação de oferta na fábrica. Serve de input para `FactoryEngine.ts`, `LandingPageEngine.ts` e para os templates de automação (FASE 2/3).

---

## 1. Metodologia do Produto (Regra 60/40)

Todo produto criado pela fábrica segue a mesma arquitetura de conteúdo, pensada para converter tráfego frio em cliente pagante dentro do próprio funil (sem depender de terceiros para fechar a venda):

| Camada | % do conteúdo | Onde entrega | Objetivo |
|---|---|---|---|
| **Isca / Free** | 60% do conteúdo total | Lead magnet, primeiras aulas, PDF, mini-curso | Gerar autoridade, resolver uma dor pequena e criar abertura psicológica para a dor maior (a que só o pago resolve) |
| **Produto Pago** | 40% restante (mas o que fecha o resultado) | Área de membros paga | Entregar o "como fazer completo", os templates prontos, o acompanhamento, o atalho |

### Regras de construção do 60% gratuito
1. **Deve ser 100% útil sozinho** — não é "trailer", é conteúdo real que resolve um problema pequeno e gera prova de competência.
2. **Sempre termina em um gap intencional** — mostra o "o quê" e o "por quê", mas não entrega o "como escalar/automatizar/replicar" completo. Esse gap é o gatilho de abertura de carrinho.
3. **Cada módulo free planta 1 gatilho mental** (ver seção 3) que é resgatado na oferta.
4. **CTA de saída em toda peça de conteúdo free** — nunca deixar conteúdo "solto" sem call-to-action para o próximo passo do funil.

### Regras de construção dos 40% pagos
1. Contém o que o free **prometeu mas não entregou**: os templates prontos, o passo a passo replicável, automações, scripts, checklist de execução.
2. Deve ter **"quick win" nas primeiras 24-48h** de acesso — o comprador precisa sentir a compra confirmada rápido (reduz reembolso).
3. Bônus de escassez/ancoragem (ex.: "acesso a templates" ou "grupo de suporte") para reforçar a percepção de valor vs. preço (R$29–R$997).

---

## 2. Sistema de Vendas em Linha Reta (Straight Line Persuasion) aplicado ao Funil

Adaptação do método de Jordan Belfort para o funil low ticket digital. O objetivo é conduzir o lead em **linha reta** do primeiro contato até o "sim", eliminando decisões laterais.

```
Tráfego (Ads/Orgânico)
   ↓
Página de Captura (1 promessa, 1 ação)
   ↓
Entrega da Isca (60% free) + Sequência de e-mails/WhatsApp
   ↓
Aquecimento (autoridade + prova social + agitação da dor)
   ↓
Página de Vendas (LP) — condução linear, sem menu, sem distração
   ↓
Oferta com Ancoragem + Escassez + Garantia
   ↓
Checkout (1 clique, upsell/order bump)
   ↓
Pós-venda (quick win + prova social nova = matéria-prima p/ próximo funil)
```

### Os 3 pilares que precisam estar "10" na mente do lead antes do CTA final
1. **O produto/oferta** — "isso resolve exatamente meu problema"
2. **Você/a marca** — "essa pessoa/empresa sabe do que fala"
3. **A confiança no mercado/nicho** — "isso funciona para gente como eu"

A LP e a sequência de e-mails devem, nessa ordem, elevar os 3 pilares — nunca pular direto para preço sem elevar autoridade e prova primeiro.

---

## 3. Gatilhos Mentais — Onde entra cada um no funil

| Gatilho | Uso no Free (60%) | Uso na LP/Oferta (40%) |
|---|---|---|
| **Autoridade** | Mostrar resultado/prova logo na abertura da isca | Depoimentos, prints de resultado, "quem sou eu" |
| **Prova Social** | Comentários/depoimentos no meio do conteúdo grátis | Seção de depoimentos + contador de alunos |
| **Escassez** | Não usar ainda (queimaria cedo) | Vagas limitadas / bônus por tempo limitado |
| **Urgência** | "Esse conteúdo sai do ar em X dias" (opcional) | Cronômetro de oferta / preço sobe às 23:59 |
| **Reciprocidade** | Entregar valor real sem pedir nada em troca | "Você já viu o que eu entrego de graça, imagina o completo" |
| **Novidade/Curiosidade** | Abrir loop que só fecha no pago | Título da LP e headline do anúncio |
| **Dor + Agitação** | Nomear o problema que o lead sente mas não sabe verbalizar | Bloco de "dor" logo abaixo do headline da LP |
| **Prova de método (unicidade)** | "Isso não é X clichê, é Y" | Nome próprio para o método (ex: "Método Fábrica") |
| **Garantia/Redução de risco** | — | Selo de garantia incondicional 7 dias |

---

## 4. Estrutura padrão de Landing Page (copywriting matador)

Ordem de blocos — usada pelo `LandingPageEngine.ts` (FASE 2) como template base:

1. **Headline** — promessa específica + prazo/resultado (dor nomeada + benefício claro)
2. **Subheadline** — para quem é / para quem não é (qualifica o lead)
3. **Vídeo ou bloco de prova imediata** (VSL curto ou prints de resultado)
4. **Bloco de Dor (agitação)** — 3 a 5 bullets do "problema que você vive hoje"
5. **Bloco de Virada** — "existe um jeito mais simples" → introduz o método
6. **O que você recebe** — bullets de entregáveis (não features, benefícios)
7. **Prova social** — depoimentos, prints, número de alunos/clientes
8. **Sobre quem entrega** — autoridade resumida (3-5 linhas)
9. **Oferta e Ancoragem de preço** — "de R$X por R$Y" + parcelamento
10. **Bônus** — 2 a 3 bônus com valor percebido alto e custo de entrega baixo
11. **Garantia** — incondicional, 7 dias, sem burocracia
12. **FAQ** — objeções reais respondidas (preço, tempo, nível técnico, suporte)
13. **CTA final** — repetido, sempre com o mesmo verbo de ação
14. **Rodapé** — termos, suporte, CNPJ (compliance)

### Fórmula de headline (usar como gerador padrão)
```
[Resultado desejado específico] + [Prazo ou condição] + [sem/mesmo que objeção comum]

Ex.: "Monte sua primeira oferta digital em 7 dias, mesmo sem aparecer e sem saber nada de tráfego pago"
```

---

## 5. Tráfego Pago — Estrutura de Campanhas

### Google Ads (Search + Performance Max)
- **Campanha 1 — Search Intenção Alta**: palavras de fundo de funil ("comprar curso de X", "[nicho] passo a passo", "como ganhar dinheiro com [nicho]")
- **Campanha 2 — Search Intenção Média**: palavras de dúvida/pesquisa ("[nicho] funciona", "vale a pena [nicho]", "[nicho] para iniciantes")
- **Campanha 3 — PMax**: alimentada com a lista de compradores + lookalike de leads da isca, para escalar quando já houver dados de conversão (pixel com >50 conversões/mês)
- **Estrutura de keywords**: sempre separar por *match type* (frase/exata) e nunca misturar intenção alta com intenção de topo no mesmo grupo de anúncios — isso derruba o Quality Score.

### Meta Ads (Instagram/Facebook)
- **Topo**: vídeo curto de dor + curiosidade → objetivo Leads/Mensagens (captura da isca)
- **Meio**: retargeting de quem consumiu a isca (visualizou vídeo 50%+, abriu e-mail) → anúncio de prova social
- **Fundo**: retargeting de quem visitou a LP e não comprou → anúncio de objeção/garantia/urgência

### Estrutura de Ad Sense / Conteúdo Orgânico como canal gratuito
- Blog/YouTube com conteúdo SEO ancorado nas mesmas keywords de intenção média do Google Ads (aproveita o mesmo mapeamento de palavras-chave sem custo de mídia)
- Cada peça de conteúdo orgânico termina no mesmo CTA da isca (60% free) — reaproveita o funil de e-mail/WhatsApp já existente

---

## 6. Afiliados via WhatsApp/Instagram (canal prioritário #1)

- Barreira de entrada baixa = maior volume de afiliados ativos = mais buscas de marca (branded search) gerando tráfego orgânico gratuito no Google
- Kit de afiliado deve conter: prints prontos, script de zap, headline pronta, link com UTM individual por afiliado
- Comissão agressiva no primeiro produto (low ticket) para gerar volume; margem recuperada no backend (upsell/produto de ticket maior)

---

## 7. Priorização de Nichos (playbook de expansão)

| Prioridade | Nicho | Racional |
|---|---|---|
| 🥇 1 | Afiliados via WhatsApp/Instagram sem verba | Barreira de entrada baixa → volume alto de divulgadores → mais buscas orgânicas de marca |
| 🥈 2 | Tráfego pago para iniciantes | Alta demanda de busca, mas mercado saturado — precisa de diferenciação forte de método/nome próprio |
| 🥉 3 | Marketing para profissional liberal | Nicho B2B menor, porém ticket médio potencialmente maior — bom para expansão vertical depois de validar o motor 60/40 |

**Ordem de execução recomendada**: validar o motor de funil (isca → LP → oferta) no Nicho 1 (menor CAC, maior alavancagem viral via afiliados) antes de replicar o mesmo template de produto para os Nichos 2 e 3.

---

## 8. Checklist de lançamento por produto (usar em todo `ProductFactoryInput`)

- [ ] Headline testada (mínimo 2 variações)
- [ ] Isca (60%) gravada/escrita e hospedada
- [ ] Sequência de e-mail/WhatsApp de aquecimento (mínimo 3 disparos) configurada
- [ ] LP com os 14 blocos da seção 4
- [ ] Prova social real coletada (não usar fake)
- [ ] Garantia e política de reembolso publicadas
- [ ] Pixel/UTM de rastreamento validado antes de subir verba
- [ ] Kit de afiliados pronto (prints + script + link com UTM)
- [ ] Campanha Google Ads com keywords segmentadas por intenção
- [ ] Campanha Meta Ads com topo/meio/fundo configurados

---

*Documento vivo — atualizar conforme dados reais de conversão de cada lançamento da fábrica.*
