import markdown, subprocess, os, csv

REPO = "/home/user/maquinalowticket/content/relacionamento/01-reconquista-pos-traicao"
OUT = f"{REPO}/pdf"
os.makedirs(OUT, exist_ok=True)
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"

CSS = """
@page { size: A4; margin: 20mm 18mm 22mm 18mm; }
* { box-sizing: border-box; }
body { font-family: Georgia, 'Times New Roman', serif; color: #2a1216; line-height: 1.55; font-size: 12.5pt; }
.cover { height: 100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;
  background: linear-gradient(160deg, #2c1920, #1a0f14); color:#f5e9e9; margin:-20mm -18mm -22mm -18mm; padding:20mm; page-break-after: always; }
.cover .kicker { color:#e8b84b; letter-spacing:3px; text-transform:uppercase; font-family: Arial, sans-serif; font-size:12pt; margin-bottom:24px; font-weight:bold;}
.cover h1 { font-size:34pt; line-height:1.2; margin-bottom:20px; max-width:480px; }
.cover .sub { color:#c9a9ad; font-size:14pt; max-width:420px; margin-bottom:40px;}
.cover .badge { font-family: Arial, sans-serif; font-size: 11pt; color:#e8b84b; border:1px solid #e8b84b; border-radius:20px; padding:8px 22px; display:inline-block;}
h1 { color:#8c1626; font-size:22pt; border-bottom:3px solid #e8b84b; padding-bottom:8px; margin-top:0; page-break-before: always;}
h1:first-of-type { page-break-before: avoid; }
h2 { color:#8c1626; font-size:16pt; margin-top:28px; }
h3 { color:#a02030; font-size:13pt; font-family: Arial, sans-serif; margin-top:20px;}
p { margin: 10px 0; text-align: justify; }
blockquote { background:#f7ecec; border-left:4px solid #8c1626; margin:16px 0; padding:12px 18px; font-style:italic; color:#5a2a30;}
ul, ol { margin: 8px 0 8px 22px; }
li { margin-bottom:6px; }
strong { color:#6e1420; }
table { width:100%; border-collapse:collapse; margin:14px 0; font-size:10.5pt; font-family:Arial,sans-serif;}
th { background:#8c1626; color:#fff; padding:8px; text-align:left; }
td { border:1px solid #e0c8ca; padding:8px; vertical-align:top;}
tr:nth-child(even) td { background:#faf3f3; }
hr { border:none; border-top:1px solid #e0c8ca; margin:24px 0; }
code { background:#f2e4e5; padding:1px 5px; border-radius:3px; font-size:11pt;}
.footer-note { font-family: Arial, sans-serif; font-size:9pt; color:#a9888c; text-align:center; margin-top:40px; border-top:1px solid #e0c8ca; padding-top:12px;}
.disclaimer-box { background:#3a2a12; color:#f0d99a; font-family: Arial, sans-serif; font-size:10pt; padding:14px 18px; border-radius:6px; margin:20px 0;}
"""

def md_to_html_body(md_path):
    text = open(md_path, encoding="utf-8").read()
    return markdown.markdown(text, extensions=["tables", "fenced_code"])

def wrap_html(title, cover_kicker, cover_title, cover_sub, cover_badge, body_html, disclaimer=True):
    disc = ""
    if disclaimer:
        disc = ('<div class="disclaimer-box">Este material é educativo e não substitui acompanhamento '
                'psicológico profissional. Em caso de sofrimento intenso, procure também um profissional '
                'de saúde mental.</div>')
    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>{title}</title><style>{CSS}</style></head><body>
<div class="cover">
  <div class="kicker">{cover_kicker}</div>
  <h1 style="color:#f5e9e9;border:none;">{cover_title}</h1>
  <div class="sub">{cover_sub}</div>
  <div class="badge">{cover_badge}</div>
</div>
{disc}
{body_html}
<div class="footer-note">Método Recomeço — Máquina Low Ticket · Todos os direitos reservados</div>
</body></html>"""

def render_pdf(html_str, out_path):
    tmp_html = out_path.replace(".pdf", ".tmp.html")
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_str)
    subprocess.run([
        CHROME, "--headless", "--disable-gpu", "--no-sandbox",
        f"--print-to-pdf={out_path}", "--no-pdf-header-footer",
        "--virtual-time-budget=10000",
        tmp_html
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(tmp_html)
    print("OK:", out_path)

# ---------- 1. LEAD MAGNET (FREE) ----------
lm_body = md_to_html_body(f"{REPO}/free/lead-magnet-diagnostico-PDF.md")
html = wrap_html(
    title="O Diagnóstico dos 5 Sinais",
    cover_kicker="Material Gratuito · Método Recomeço",
    cover_title="O Diagnóstico dos 5 Sinais",
    cover_sub="Seu relacionamento tem chance de reconquista ou é hora de seguir em frente?",
    cover_badge="ACESSO GRATUITO",
    body_html=lm_body,
)
render_pdf(html, f"{OUT}/01-GRATUITO-Diagnostico-5-Sinais.pdf")

# ---------- 2. EBOOK COMPLETO (PAGO) ----------
modules = [
    "pago/modulo-1-primeiros-socorros.md",
    "pago/modulo-2-reconstrucao-atracao.md",
    "pago/modulo-3-conversa-decisiva.md",
    "pago/modulo-4-superacao.md",
    "pago/bonus-kit-30-frases.md",
]
intro_md = """# Bem-vindo(a) ao Método Recomeço

Este material foi criado para te dar clareza e um caminho estruturado depois de uma das experiências mais dolorosas que um relacionamento pode atravessar: a traição.

Ao longo dos próximos 21 dias, você vai passar por 4 fases:

1. **Primeiros Socorros Emocionais** (dias 1-3) — estabilização
2. **Reconstrução da Atração** (dias 4-14) — se houver espaço para isso
3. **A Conversa Decisiva** (dias 15-21) — decisão com informação real
4. **Se a Reconquista Não For o Caminho** — superação com dignidade

Você não precisa saber agora qual vai ser o resultado final. Precisa só do próximo passo certo — e é isso que este material te dá, um dia de cada vez.

**Como usar este material**: leia cada módulo na ordem, mas não tenha pressa de "terminar rápido". Os prazos de cada fase (72h, 14 dias, 21 dias) são referências, não uma corrida. Use o checklist ao fim de cada módulo antes de avançar.
"""
body_parts = [markdown.markdown(intro_md, extensions=["tables"])]
for m in modules:
    body_parts.append(md_to_html_body(f"{REPO}/{m}"))
ebook_body = "\n<hr>\n".join(body_parts)

html = wrap_html(
    title="Método Recomeço — Ebook Completo",
    cover_kicker="Conteúdo Exclusivo do Aluno",
    cover_title="Método Recomeço",
    cover_sub="Como Reconquistar Quem Te Traiu (ou Superar em 21 Dias)",
    cover_badge="ÁREA DE MEMBROS",
    body_html=ebook_body,
)
render_pdf(html, f"{OUT}/02-PAGO-Metodo-Recomeco-Ebook-Completo.pdf")

# ---------- 3. PLANILHA DE ACOMPANHAMENTO (PAGO, versão imprimível) ----------
rows = list(csv.reader(open(f"{REPO}/pago/planilha-acompanhamento-21-dias.csv", encoding="utf-8")))
header, data = rows[0], rows[1:]
table_html = "<table><thead><tr>" + "".join(f"<th>{h}</th>" for h in header) + "</tr></thead><tbody>"
for r in data:
    table_html += "<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>"
table_html += "</tbody></table>"

planilha_body = f"""
<h1>Planilha de Acompanhamento — 21 Dias</h1>
<p>Preencha diariamente para acompanhar seu progresso ao longo do Método Recomeço. Marque S/N nas colunas indicadas e anote uma nota curta sobre o dia.</p>
{table_html}
"""
html = wrap_html(
    title="Planilha de Acompanhamento 21 Dias",
    cover_kicker="Bônus · Método Recomeço",
    cover_title="Planilha de Acompanhamento",
    cover_sub="21 dias, dia a dia — versão para imprimir e preencher à mão",
    cover_badge="BÔNUS",
    body_html=planilha_body,
    disclaimer=False,
)
render_pdf(html, f"{OUT}/03-BONUS-Planilha-21-Dias.pdf")

print("\nTodos os PDFs gerados em:", OUT)
