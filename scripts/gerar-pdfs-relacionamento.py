"""Gera os PDFs (lead magnet, ebook pago, bonus) para um produto do nicho Relacionamento.
Uso: python3 gerar-pdfs-relacionamento.py <produto>
<produto> = reconquista | cnv | distancia
"""
import markdown, subprocess, os, csv, sys

BASE = "/home/user/maquinalowticket/content/relacionamento"
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"

THEMES = {
    "reconquista": dict(
        dir="01-reconquista-pos-traicao",
        primary="#8c1626", primary_dark="#6e1420", accent="#e8b84b",
        bg_cover_1="#2c1920", bg_cover_2="#1a0f14", text_light="#f5e9e9", muted="#c9a9ad",
        row_alt="#faf3f3", border="#e0c8ca",
        slug="Metodo-Recomeco",
        titulo="Método Recomeço",
        subtitulo_pago="Como Reconquistar Quem Te Traiu (ou Superar em 21 Dias)",
        lead_titulo="O Diagnóstico dos 5 Sinais",
        lead_subtitulo="Seu relacionamento tem chance de reconquista ou é hora de seguir em frente?",
        lead_md="free/lead-magnet-diagnostico-PDF.md",
        modulos=["pago/modulo-1-primeiros-socorros.md","pago/modulo-2-reconstrucao-atracao.md",
                 "pago/modulo-3-conversa-decisiva.md","pago/modulo-4-superacao.md","pago/bonus-kit-30-frases.md"],
        intro_md="""# Bem-vindo(a) ao Método Recomeço

Este material foi criado para te dar clareza e um caminho estruturado depois de uma das experiências mais dolorosas que um relacionamento pode atravessar: a traição.

Ao longo dos próximos 21 dias, você vai passar por 4 fases:

1. **Primeiros Socorros Emocionais** (dias 1-3) — estabilização
2. **Reconstrução da Atração** (dias 4-14) — se houver espaço para isso
3. **A Conversa Decisiva** (dias 15-21) — decisão com informação real
4. **Se a Reconquista Não For o Caminho** — superação com dignidade

Você não precisa saber agora qual vai ser o resultado final. Precisa só do próximo passo certo.
""",
        planilha_csv="pago/planilha-acompanhamento-21-dias.csv",
        planilha_titulo="Planilha de Acompanhamento — 21 Dias",
        planilha_subtitulo="21 dias, dia a dia — versão para imprimir e preencher à mão",
    ),
    "cnv": dict(
        dir="02-comunicacao-nao-violenta",
        primary="#1f6e63", primary_dark="#13463f", accent="#d9a441",
        bg_cover_1="#152426", bg_cover_2="#0f1a1c", text_light="#eaf3f2", muted="#a9c3c0",
        row_alt="#f2f8f7", border="#cde3e0",
        slug="Metodo-CNV-Casal",
        titulo="Método CNV Casal",
        subtitulo_pago="Chega de Brigar Pelos Mesmos Motivos — 14 Dias",
        lead_titulo="Qual é o Seu Padrão de Briga?",
        lead_subtitulo="(E o do seu parceiro) — descubra em 4 perguntas",
        lead_md="free/lead-magnet-PDF.md",
        modulos=["pago/modulo-1-diagnostico-do-casal.md","pago/modulo-2-estrutura-cnv.md",
                 "pago/modulo-3-conversas-dificeis.md","pago/modulo-4-manutencao.md",
                 "pago/bonus-50-frases-abertura.md","pago/bonus-audio-script-esfriar-cabeca.md"],
        intro_md="""# Bem-vindo(a) ao Método CNV Casal

Este material existe para transformar discussões recorrentes em conversas que de fato resolvem algo — em 14 dias, com estrutura prática, não teoria.

1. **Diagnóstico do Casal** (dias 1-2) — mapear gatilhos e padrões
2. **A Estrutura CNV** (dias 3-7) — Observação, Sentimento, Necessidade, Pedido
3. **Conversas Difíceis** (dias 8-11) — dinheiro, tarefas, família, intimidade
4. **Manutenção** (dias 12-14) — ritual semanal e reparação

Vocês não precisam de mais amor — precisam de um jeito melhor de conversar sobre o que já sentem.
""",
        planilha_csv="pago/planner-ritual-semanal.csv",
        planilha_titulo="Planner de Ritual Semanal",
        planilha_subtitulo="Check-in de casal — 8 semanas, para imprimir e preencher",
    ),
    "distancia": dict(
        dir="03-relacionamento-a-distancia",
        primary="#5b3a9e", primary_dark="#402a70", accent="#e8b84b",
        bg_cover_1="#1e1628", bg_cover_2="#150f1e", text_light="#f0eaf7", muted="#b8a9c9",
        row_alt="#f6f3fa", border="#ddd2ec",
        slug="Guia-Relacionamento-a-Distancia",
        titulo="Guia Relacionamento à Distância",
        subtitulo_pago="Comunicação, Confiança e um Plano Real Para o Reencontro",
        lead_titulo="Calculadora do Relacionamento à Distância",
        lead_subtitulo="Vocês têm estrutura para aguentar?",
        lead_md="free/lead-magnet-PDF.md",
        modulos=["pago/modulo-1-fundacao.md","pago/modulo-2-comunicacao.md",
                 "pago/modulo-3-confianca.md","pago/modulo-4-reencontro.md",
                 "pago/bonus-60-ideias-encontro-virtual.md","pago/bonus-checklist-sinais-de-alerta.md"],
        intro_md="""# Bem-vindo(a) ao Guia Relacionamento à Distância

Namoro à distância não precisa ser sobrevivência. Pode ser construção — com estrutura.

1. **Fundação** (semana 1) — as 3 fases do RAD e o contrato de relacionamento
2. **Comunicação à Distância** (semana 2) — rituais, ciúme, fuso horário
3. **Confiança e Segurança Emocional** (semana 3) — reconstrução e sinais de alerta
4. **O Caminho para o Reencontro** (semana 4) — planejamento prático e adaptação

A distância em si não define se o relacionamento vai dar certo — como vocês a atravessam, sim.
""",
        planilha_csv="pago/bonus-planilha-financeira-mudanca.csv",
        planilha_titulo="Planilha de Planejamento Financeiro",
        planilha_subtitulo="Visto, mudança, finanças e timeline — para preencher juntos",
    ),
}

def build_css(t):
    return f"""
@page {{ size: A4; margin: 20mm 18mm 22mm 18mm; }}
* {{ box-sizing: border-box; }}
body {{ font-family: Georgia, 'Times New Roman', serif; color: #221a1a; line-height: 1.55; font-size: 12.5pt; }}
.cover {{ height: 100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;
  background: linear-gradient(160deg, {t['bg_cover_1']}, {t['bg_cover_2']}); color:{t['text_light']}; margin:-20mm -18mm -22mm -18mm; padding:20mm; page-break-after: always; }}
.cover .kicker {{ color:{t['accent']}; letter-spacing:3px; text-transform:uppercase; font-family: Arial, sans-serif; font-size:12pt; margin-bottom:24px; font-weight:bold;}}
.cover h1 {{ font-size:34pt; line-height:1.2; margin-bottom:20px; max-width:480px; color:{t['text_light']}; border:none;}}
.cover .sub {{ color:{t['muted']}; font-size:14pt; max-width:420px; margin-bottom:40px;}}
.cover .badge {{ font-family: Arial, sans-serif; font-size: 11pt; color:{t['accent']}; border:1px solid {t['accent']}; border-radius:20px; padding:8px 22px; display:inline-block;}}
h1 {{ color:{t['primary']}; font-size:22pt; border-bottom:3px solid {t['accent']}; padding-bottom:8px; margin-top:0; page-break-before: always;}}
h1:first-of-type {{ page-break-before: avoid; }}
h2 {{ color:{t['primary']}; font-size:16pt; margin-top:28px; }}
h3 {{ color:{t['primary_dark']}; font-size:13pt; font-family: Arial, sans-serif; margin-top:20px;}}
p {{ margin: 10px 0; text-align: justify; }}
blockquote {{ background:{t['row_alt']}; border-left:4px solid {t['primary']}; margin:16px 0; padding:12px 18px; font-style:italic; color:{t['primary_dark']};}}
ul, ol {{ margin: 8px 0 8px 22px; }}
li {{ margin-bottom:6px; }}
strong {{ color:{t['primary_dark']}; }}
table {{ width:100%; border-collapse:collapse; margin:14px 0; font-size:10pt; font-family:Arial,sans-serif;}}
th {{ background:{t['primary']}; color:#fff; padding:7px; text-align:left; }}
td {{ border:1px solid {t['border']}; padding:7px; vertical-align:top;}}
tr:nth-child(even) td {{ background:{t['row_alt']}; }}
hr {{ border:none; border-top:1px solid {t['border']}; margin:24px 0; }}
code {{ background:{t['row_alt']}; padding:1px 5px; border-radius:3px; font-size:11pt;}}
.footer-note {{ font-family: Arial, sans-serif; font-size:9pt; color:{t['muted']}; text-align:center; margin-top:40px; border-top:1px solid {t['border']}; padding-top:12px;}}
.disclaimer-box {{ background:#2a2412; color:#f0d99a; font-family: Arial, sans-serif; font-size:10pt; padding:14px 18px; border-radius:6px; margin:20px 0;}}
"""

def md_to_html_body(path):
    text = open(path, encoding="utf-8").read()
    return markdown.markdown(text, extensions=["tables", "fenced_code"])

def wrap_html(t, css, cover_kicker, cover_title, cover_sub, cover_badge, body_html, disclaimer=True):
    disc = ""
    if disclaimer:
        disc = ('<div class="disclaimer-box">Este material é educativo e não substitui acompanhamento '
                'psicológico profissional. Em caso de sofrimento intenso, procure também um profissional '
                'de saúde mental.</div>')
    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>{cover_title}</title><style>{css}</style></head><body>
<div class="cover">
  <div class="kicker">{cover_kicker}</div>
  <h1>{cover_title}</h1>
  <div class="sub">{cover_sub}</div>
  <div class="badge">{cover_badge}</div>
</div>
{disc}
{body_html}
<div class="footer-note">{t['titulo']} — Máquina Low Ticket · Todos os direitos reservados</div>
</body></html>"""

def render_pdf(html_str, out_path):
    tmp_html = out_path.replace(".pdf", ".tmp.html")
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_str)
    subprocess.run([
        CHROME, "--headless", "--disable-gpu", "--no-sandbox",
        f"--print-to-pdf={out_path}", "--no-pdf-header-footer",
        "--virtual-time-budget=10000", tmp_html
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(tmp_html)
    print("OK:", out_path)

def build(product_key):
    t = THEMES[product_key]
    repo = f"{BASE}/{t['dir']}"
    out = f"{repo}/pdf"
    os.makedirs(out, exist_ok=True)
    css = build_css(t)

    # 1. Lead magnet
    lm_body = md_to_html_body(f"{repo}/{t['lead_md']}")
    html = wrap_html(t, css, "Material Gratuito", t['lead_titulo'], t['lead_subtitulo'], "ACESSO GRATUITO", lm_body)
    render_pdf(html, f"{out}/01-GRATUITO-{t['slug']}.pdf")

    # 2. Ebook pago
    body_parts = [markdown.markdown(t['intro_md'], extensions=["tables"])]
    for m in t['modulos']:
        body_parts.append(md_to_html_body(f"{repo}/{m}"))
    ebook_body = "\n<hr>\n".join(body_parts)
    html = wrap_html(t, css, "Conteúdo Exclusivo do Aluno", t['titulo'], t['subtitulo_pago'], "ÁREA DE MEMBROS", ebook_body)
    render_pdf(html, f"{out}/02-PAGO-{t['slug']}-Ebook-Completo.pdf")

    # 3. Planilha/bônus em CSV -> PDF
    rows = list(csv.reader(open(f"{repo}/{t['planilha_csv']}", encoding="utf-8")))
    header, data = rows[0], rows[1:]
    table_html = "<table><thead><tr>" + "".join(f"<th>{h}</th>" for h in header) + "</tr></thead><tbody>"
    for r in data:
        table_html += "<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>"
    table_html += "</tbody></table>"
    planilha_body = f"<h1>{t['planilha_titulo']}</h1><p>{t['planilha_subtitulo']}</p>{table_html}"
    html = wrap_html(t, css, "Bônus", t['planilha_titulo'], t['planilha_subtitulo'], "BÔNUS", planilha_body, disclaimer=False)
    render_pdf(html, f"{out}/03-BONUS-Planilha.pdf")

    print(f"\n{t['titulo']}: todos os PDFs gerados em {out}")

if __name__ == "__main__":
    keys = sys.argv[1:] or list(THEMES.keys())
    for k in keys:
        build(k)
