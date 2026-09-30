import type { Metadata } from 'next';
import LeadCaptureForm from './LeadCaptureForm';

export const metadata: Metadata = {
  title: 'Inglês para Entrevista de Emprego | Pare de Travar na Hora H',
  description:
    'Aprenda o método usado por profissionais para responder com confiança qualquer pergunta em inglês na entrevista de emprego.',
};

export default function InglesEntrevistaLP() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO / ATENÇÃO */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Você já perdeu a vaga dos sonhos por travar no inglês na entrevista?
            </h1>
            <p className="text-lg text-slate-300 mb-6">
              Aprenda o método usado por profissionais para responder com confiança{' '}
              <strong>qualquer pergunta em inglês</strong> — mesmo que você trave até em
              &quot;How are you?&quot; hoje.
            </p>
            <a
              href="#kit-gratis"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
            >
              QUERO O KIT GRÁTIS ↓
            </a>
          </div>
          <div id="kit-gratis">
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* IDENTIFICAÇÃO */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-6">Se você já...</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex gap-3">
            <span className="text-blue-600">●</span>
            Decorou respostas em português e travou tentando traduzir na hora
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600">●</span>
            Foi reprovado numa vaga ótima só pela parte de inglês
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600">●</span>
            Sente o coração acelerar quando o recrutador muda pro inglês
          </li>
        </ul>
        <p className="mt-6 text-xl font-semibold">...este método foi feito pra você.</p>
      </section>

      {/* AGITAÇÃO */}
      <section className="bg-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-lg leading-relaxed">
            Cada mês sem resolver isso é um processo seletivo a menos, uma promoção a
            menos, um salário em dólar que fica na gaveta. O mercado não vai esperar
            você &quot;aprender inglês algum dia&quot;.
          </p>
        </div>
      </section>

      {/* MECANISMO ÚNICO */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-4">Método D.I.R.</h2>
        <p className="text-lg leading-relaxed">
          <strong>D</strong>iagnóstico → <strong>I</strong>mersão em Cenário Real →{' '}
          <strong>R</strong>epetição com Feedback. Você não estuda gramática solta, você
          treina a ENTREVISTA que vai enfrentar, na área em que você atua.
        </p>
      </section>

      {/* PROVA SOCIAL */}
      <section className="bg-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <blockquote className="border-l-4 border-blue-600 pl-6 italic text-lg text-slate-700">
            &quot;Treinei 3 vezes com o método e fechei uma proposta 40% maior, em
            inglês, numa multi.&quot;
            <footer className="mt-2 text-sm not-italic text-slate-500">
              — depoimento ilustrativo, a coletar de alunos reais
            </footer>
          </blockquote>
        </div>
      </section>

      {/* OFERTA */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-4">
          Inglês Fluente para Entrevista — Do Currículo à Proposta
        </h2>
        <ul className="space-y-2 text-lg mb-6 list-disc list-inside">
          <li>Currículo e LinkedIn em inglês otimizados para ATS</li>
          <li>Banco de 100+ perguntas por área (TI, vendas, marketing, engenharia...)</li>
          <li>Simulações de entrevista gravadas com feedback</li>
          <li>Vocabulário técnico por setor</li>
          <li>Negociação salarial em inglês (scripts prontos)</li>
          <li>Bônus: cola de bolso + grupo de prática</li>
        </ul>
        <p className="text-3xl font-extrabold mb-2">
          R$ 97 <span className="text-lg font-normal text-slate-400 line-through ml-2">R$ 297</span>
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Bônus da mentoria em grupo válido só para quem comprar até o fim desta turma.
        </p>
        <a
          href="#kit-gratis"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
        >
          QUERO PARAR DE TRAVAR NA ENTREVISTA →
        </a>
      </section>

      <footer className="text-center text-xs text-slate-400 py-8">
        Máquina Low Ticket — Vertical Inglês
      </footer>
    </div>
  );
}
