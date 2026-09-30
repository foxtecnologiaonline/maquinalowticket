import re, os, sys
import markdown as md
from weasyprint import HTML

BASE = "/home/user/maquinalowticket/content/pets"
OUT = f"{BASE}/pdf"
os.makedirs(f"{OUT}/gratis", exist_ok=True)
os.makedirs(f"{OUT}/completo", exist_ok=True)

NICHES = [
    {
        "slug": "adestramento-de-filhotes",
        "kicker": "Máquina Low Ticket · Nicho Pets",
        "title": "Adestramento de Filhotes em 7 Dias",
        "subtitle": "Método caseiro para eliminar mordida, xixi fora do lugar e latido excessivo — sem gritar, sem bater e sem pagar fortuna em adestrador presencial.",
        "content_file": f"{BASE}/conteudo/01-adestramento-conteudo-modulos.md",
        "price": "R$47", "bump_name": "Kit de Comandos de Emergência", "bump_price": "R$27",
        "c1": "#ff9f45", "c2": "#ffc078", "bg": "#0f1115", "panel": "#171a21", "text": "#f3f4f6", "muted": "#a3a9b7", "accent_text": "#1a1200",
    },
    {
        "slug": "nutricao-caseira-caes",
        "kicker": "Máquina Low Ticket · Nicho Pets",
        "title": "Nutrição Caseira para Cães",
        "subtitle": "Guia caseiro para alimentar seu cão de forma balanceada e segura, sem gastar fortuna em ração premium.",
        "content_file": f"{BASE}/conteudo/02-nutricao-conteudo-modulos.md",
        "price": "R$37", "bump_name": "Tabela de Substituição de Ingredientes", "bump_price": "R$19",
        "c1": "#5fd67a", "c2": "#9ff2b3", "bg": "#0e1512", "panel": "#141d19", "text": "#f1f5f2", "muted": "#9fb0a6", "accent_text": "#062b12",
    },
    {
        "slug": "cuidados-pets-idosos",
        "kicker": "Máquina Low Ticket · Nicho Pets",
        "title": "Cuidados com Pets Idosos",
        "subtitle": "Protocolo completo de conforto e qualidade de vida para o seu pet idoso, com sinais de alerta e adaptação de rotina.",
        "content_file": f"{BASE}/conteudo/03-idosos-conteudo-modulos.md",
        "price": "R$47", "bump_name": "Checklist de Sinais de Alerta", "bump_price": "R$27",
        "c1": "#7aa2ff", "c2": "#b9cdff", "bg": "#0f1420", "panel": "#161d2c", "text": "#f2f4f8", "muted": "#a3acc2", "accent_text": "#0a1330",
    },
]

MODULE_RE = re.compile(r"^## (🆓|💰) MÓDULO \d+.*?— (.*)$", re.MULTILINE)
BONUS_RE = re.compile(r"^## 💰 BÔNUS — (.*)$", re.MULTILINE)

def parse_modules(text):
    """Split content file into ordered list of {kind, title, body_md}."""
    lines = text.split("\n")
    modules = []
    current = None
    for line in lines:
        m = re.match(r"^## (🆓|💰) (MÓDULO \d+.*?— .*|BÔNUS — .*)$", line)
        if m:
            if current:
                modules.append(current)
            kind = "free" if m.group(1) == "🆓" else "paid"
            title = m.group(2)
            current = {"kind": kind, "title": title, "body": []}
        elif line.startswith("# ") or line.startswith("---"):
            continue
        else:
            if current:
                current["body"].append(line)
    if current:
        modules.append(current)
    return modules

LIST_START_RE = re.compile(r"^(\d+\.\s|[-*]\s)")

def ensure_blank_line_before_lists(text):
    """python-markdown needs a blank line before a list starts; our source
    sometimes has '**Label:**' immediately followed by '1. item' with no
    blank line, which makes it parse as one run-on paragraph instead of
    a proper <ol>/<ul>."""
    lines = text.split("\n")
    out = []
    for i, line in enumerate(lines):
        is_list_item = bool(LIST_START_RE.match(line.strip()))
        prev_is_list_item = bool(LIST_START_RE.match(lines[i - 1].strip())) if i > 0 else False
        prev_blank = (i == 0) or (lines[i - 1].strip() == "")
        if is_list_item and not prev_is_list_item and not prev_blank:
            out.append("")
        out.append(line)
    return "\n".join(out)

def md_to_html(body_lines):
    text = "\n".join(body_lines).strip()
    text = ensure_blank_line_before_lists(text)
    return md.markdown(text, extensions=["extra"])

CSS_TEMPLATE = """
@page {{
  size: A4;
  margin: 2.2cm 2cm 2.2cm 2cm;
  @bottom-center {{ content: counter(page); font-size: 9pt; color: {muted}; }}
}}
@page cover {{ margin: 0; }}
body {{ font-family: 'Helvetica', Arial, sans-serif; color: #23262f; font-size: 11pt; line-height: 1.55; }}
.cover {{
  page: cover;
  height: 100vh; width: 100%;
  background: linear-gradient(160deg, {bg} 0%, #05070a 100%);
  color: {text};
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  text-align: center; padding: 3cm;
  page-break-after: always;
}}
.cover .kicker {{ letter-spacing: .12em; text-transform: uppercase; font-size: 11pt; color: {c2}; margin-bottom: 18px; font-weight: 700; }}
.cover h1 {{ font-size: 30pt; line-height: 1.25; margin: 0 0 18px; max-width: 15cm; }}
.cover .sub {{ font-size: 13pt; color: {muted}; max-width: 13cm; margin-bottom: 28px; }}
.cover .badge {{
  display: inline-block; background: linear-gradient(135deg, {c1}, {c2}); color: {accent_text};
  font-weight: 800; padding: 10px 22px; border-radius: 999px; font-size: 12pt;
}}
.toc {{ page-break-after: always; }}
.toc h2 {{ color: {c1}; }}
.toc ol {{ font-size: 12pt; line-height: 2; }}
h1.doctitle {{ color: {c1}; font-size: 20pt; }}
h2.module {{
  color: #ffffff; background: {bg}; padding: 10px 16px; border-radius: 8px;
  font-size: 15pt; margin-top: 0; page-break-before: always;
}}
h2.module.first {{ page-break-before: avoid; }}
.tag {{ display:inline-block; font-size:9pt; font-weight:700; letter-spacing:.05em; text-transform:uppercase;
  padding: 2px 10px; border-radius: 999px; margin-bottom: 8px; }}
.tag.free {{ background: #e7f6ec; color: #1c7a3d; }}
.tag.paid {{ background: #fff1e0; color: #a15c00; }}
p, li {{ font-size: 11pt; }}
strong {{ color: #111; }}
ul, ol {{ padding-left: 1.3em; margin: 10px 0; }}
li {{ margin-bottom: 8px; }}
p {{ margin: 0 0 12px; }}
hr {{ border: none; border-top: 1px solid #ddd; margin: 22px 0; }}
.cta-box {{
  background: {panel}22; border: 2px solid {c1}; border-radius: 12px; padding: 18px 22px; margin-top: 26px;
}}
.cta-box .preco {{ font-size: 20pt; font-weight: 900; color: #a15c00; }}
.footer-note {{ color: {muted}; font-size: 9pt; text-align: center; margin-top: 30px; }}
"""

def build_html(n, modules, mode):
    css = CSS_TEMPLATE.format(**n)
    is_free = mode == "gratis"
    cover_badge = f"Amostra Gratuita — {len([m for m in modules if m['kind']=='free'])} módulos" if is_free else f"Produto Completo — {n['price']}"

    parts = [f"<html><head><meta charset='utf-8'><style>{css}</style></head><body>"]
    parts.append(f"""
    <div class="cover">
      <div class="kicker">{n['kicker']}</div>
      <h1>{n['title']}</h1>
      <div class="sub">{n['subtitle']}</div>
      <div class="badge">{cover_badge}</div>
    </div>
    """)

    parts.append("<div class='toc'><h2>Sumário</h2><ol>")
    for m in modules:
        parts.append(f"<li>{m['title']}</li>")
    parts.append("</ol></div>")

    for i, m in enumerate(modules):
        tag_class = "free" if m["kind"] == "free" else "paid"
        tag_label = "Módulo Gratuito" if m["kind"] == "free" else "Módulo Completo"
        first_class = " first" if i == 0 else ""
        body_html = md_to_html(m["body"])
        parts.append(f"""
        <div>
          <span class="tag {tag_class}">{tag_label}</span>
          <h2 class="module{first_class}">{m['title']}</h2>
          {body_html}
        </div>
        """)

    if is_free:
        parts.append(f"""
        <div class="cta-box">
          <p style="margin:0 0 6px;font-weight:800;">Gostou do resultado até aqui?</p>
          <p style="margin:0 0 10px;">Esses módulos gratuitos são só a base. No <strong>{n['title']} — Versão Completa</strong> você recebe o método 100% completo, com todos os módulos avançados e bônus exclusivos.</p>
          <div class="preco">{n['price']}</div>
          <p style="margin:6px 0 0;">+ bônus especial: <strong>{n['bump_name']}</strong> por apenas +{n['bump_price']}</p>
        </div>
        """)

    parts.append(f"<div class='footer-note'>Máquina Low Ticket · {n['title']} · Conteúdo educacional. Consulte um profissional (veterinário) para casos específicos do seu pet.</div>")
    parts.append("</body></html>")
    return "".join(parts)

for n in NICHES:
    with open(n["content_file"], encoding="utf-8") as f:
        text = f.read()
    modules = parse_modules(text)
    free_modules = [m for m in modules if m["kind"] == "free"]
    all_modules = modules

    html_free = build_html(n, free_modules, "gratis")
    html_full = build_html(n, all_modules, "completo")

    out_free = f"{OUT}/gratis/{n['slug']}-amostra-gratis.pdf"
    out_full = f"{OUT}/completo/{n['slug']}-completo.pdf"

    HTML(string=html_free).write_pdf(out_free)
    HTML(string=html_full).write_pdf(out_full)
    print("OK", n["slug"], "->", out_free, out_full)
