import type { Case } from './types';

// Generated from the approved prototype (cases 01-03) and the Laravel repo at 191d380 (case 04).
// Code is verbatim except for the common indentation, which is removed.
export const cases: Case[] = [
  {
    id: "myfinance",
    index: { pt: "01 / 04 · api + web + mobile", en: "01 / 04 · api + web + mobile" },
    name: "MyFinance",
    pitch: {
      pt: "Finanças da casa com vários logins por família, plano de quitação de dívidas e importação de documentos.",
      en: "Household finances with several logins per family, a debt payoff plan and document import.",
    },
    chips: [
      "Node · Express",
      "TypeScript",
      "PostgreSQL",
      "React",
      "Flutter",
      "OpenAPI · Zod",
      "Groq · Gemini",
    ],
    nums: [
      { value: "182", label: { pt: "arquivos de teste", en: "test files" } },
      { value: "7", label: { pt: "jobs de CI", en: "CI jobs" } },
      { value: "36", label: { pt: "migrations", en: "migrations" } },
      { value: "76", label: { pt: "testes Flutter", en: "Flutter tests" } },
    ],
    links: [
      { label: { pt: "Ver online", en: "Live app" }, href: "https://my-finance-ebon-one.vercel.app" },
    ],
    note: { pt: "repositório privado", en: "private repository" },
    alt: {
      pt: "Tela inicial do MyFinance com o saldo do mês, contas e gráficos, com dados fictícios.",
      en: "MyFinance home screen with the month balance, bills and charts, using fictitious data.",
    },
    shots: [
      { key: "h", src: "/apps/mf-inicio.webp", w: 2560, h: 2914 },
      { key: "c", src: "/apps/mf-cpf.webp", w: 2560, h: 2164 },
      { key: "i", src: "/apps/mf-import.webp", w: 2560, h: 3084 },
    ],
    device: {
      tag: { pt: "app Flutter · Android/iOS", en: "Flutter app · Android/iOS" },
      shots: [
        { key: "m1", src: "/apps/mf-m-home.webp", w: 1170, h: 2532 },
        { key: "m2", src: "/apps/mf-m-cal.webp", w: 1170, h: 2532 },
        { key: "m3", src: "/apps/mf-m-receitas.webp", w: 1170, h: 2532 },
      ],
    },
    steps: [
      { k: "h", ov: true, url: "myfinance · /inicio" },
      {
        k: "h",
        r: [544, 163, 1968, 297],
        lift: [[544, 163, 468, 297], [1044, 163, 468, 297], [1544, 163, 468, 297], [2044, 163, 468, 297]],
      },
      {
        k: "h",
        r: [544, 493, 1133, 680],
      },
      {
        k: "h",
        r: [1377, 2315, 1135, 524],
      },
      {
        k: "c",
        click: [247, 915],
        out: true,
        r: [544, 721, 1968, 377],
        url: "myfinance · /quitacao-cpf",
      },
      {
        k: "i",
        click: [247, 1433],
        out: true,
        r: [562, 441, 1916, 258],
        url: "myfinance · /importar",
      },
      { k: "i", ov: true, device: true },
    ],
    cards: [
      {
        kicker: { pt: "arquitetura", en: "architecture" },
        title: { pt: "Um contrato, dois clientes.", en: "One contract, two clients." },
        text: {
          pt: "A API Express gera o `openapi.json` dos schemas Zod; o web em React tipa as chamadas a partir dele e o app Flutter consome as mesmas rotas. No CI, o oasdiff reprova o PR que quebrar o contrato.",
          en: "The Express API generates `openapi.json` from the Zod schemas; the React web app types its calls from it and the Flutter app uses the same routes. In CI, oasdiff fails any PR that breaks the contract.",
        },
        code: [
          {
            file: ".github/workflows/ci.yml",
            lang: "yaml",
            start: 96,
            hl: [99, 100],
            code: "- name: oasdiff breaking (base → PR)\n  if: steps.base.outputs.existe == 'true'\n  run: >-\n    docker run --rm -v \"$PWD:/specs:ro\" -w /specs tufin/oasdiff:v1.33.0\n    breaking openapi-base.json backend/openapi.json --fail-on ERR\n    --err-ignore backend/oasdiff-ignore.txt",
          },
        ],
      },
      {
        kicker: { pt: "domínio", en: "domain" },
        title: { pt: "Dinheiro calculado num domínio puro.", en: "Money computed in a pure domain." },
        text: {
          pt: "Saldo, entradas e saídas saem de funções sem I/O, com arredondamento explícito em centavos. O servidor recebe uma cópia gerada desse módulo (`domain:sync`) e um teste barra se ela divergir.",
          en: "Balance, income and expenses come from functions with no I/O, with explicit rounding to cents. The server gets a generated copy of this module (`domain:sync`) and a test fails if the copy drifts.",
        },
        code: [
          {
            file: "frontend/src/finance.ts",
            lang: "ts",
            start: 189,
            hl: [189],
            code: "const entradas = round2(recorrente + extras);\nconst fixas = somaValores(\n  m.fixas.filter((f) => !f.foraSaldo),\n  (f) => f.valor,\n);\nconst variaveis = somaValores(\n  m.variaveis.filter((v) => !v.foraSaldo),\n  (v) => v.valor,\n);\nconst parcelas = somaValores(\n  s.dividas.filter((d) => !d.foraSaldo && dividaAtivaNoMes(d, k)),\n  (d) => d.valorParcela,\n);",
          },
        ],
      },
      {
        kicker: { pt: "testes", en: "tests" },
        title: { pt: "Um arquivo de casos, web e app.", en: "One file of cases, web and app." },
        text: {
          pt: "O card \"Contas do mês\" sai de `contasDoMes()`. Os 18 vetores de `fixtures/finance-cases.json` testam essa função no Vitest e o widget do card no `flutter test`: se um cliente divergir, o teste quebra.",
          en: "The \"Contas do mês\" (bills this month) card comes from `contasDoMes()`. The 18 vectors in `fixtures/finance-cases.json` test this function in Vitest and the card widget in `flutter test`: if one client drifts, the test breaks.",
        },
        code: [
          {
            file: "frontend/src/finance.test.ts",
            lang: "ts",
            start: 92,
            hl: [93],
            code: "it(\"contas do mês: previsto × realizado\", () => {\n  const r = contasDoMes(s, c.month, c.today);\n  money(r.previsto, e.contas.previsto);\n  money(r.pago, e.contas.pago);\n  money(r.pendente, e.contas.pendente);\n  money(r.atrasado, e.contas.atrasado);",
          },
          {
            file: "mobile/test/screens/contas_do_mes_card_test.dart",
            lang: "dart",
            start: 83,
            code: "final cases = (jsonDecode(File('../fixtures/finance-cases.json').readAsStringSync())['cases'] as List)",
          },
        ],
      },
      {
        kicker: { pt: "regra de negócio", en: "business rule" },
        title: { pt: "Bordas da regra testadas.", en: "The edges of the rule are tested." },
        text: {
          pt: "Renda comprometida: até 30% é saudável, até 50% é atenção, acima disso é crítico. Os valores exatos de borda (0,30 e 0,50) estão nos vetores compartilhados.",
          en: "Committed income: up to 30% is healthy, up to 50% needs attention, above that is critical. The exact edge values (0.30 and 0.50) are in the shared vectors.",
        },
        code: [
          {
            file: "frontend/src/finance.ts",
            lang: "ts",
            start: 252,
            hl: [253, 254],
            code: "export function faixaComprometido(comprometido: number): FaixaComprometido {\n  if (comprometido > COMPROMETIDO_ATENCAO_ATE) return { faixa: \"critico\", rotulo: \"Crítico\" };\n  if (comprometido > COMPROMETIDO_SAUDAVEL_ATE) return { faixa: \"atencao\", rotulo: \"Atenção\" };\n  return { faixa: \"saudavel\", rotulo: \"Saudável\" };\n}",
          },
        ],
      },
      {
        kicker: { pt: "produto", en: "product" },
        title: { pt: "Das negativadas ao CPF limpo.", en: "From bad debts to a clean credit record." },
        text: {
          pt: "Dívidas negativadas (importáveis do extrato Serasa/SPC) viram um plano: desconto negociado, progresso e o mês em que o CPF fica limpo, que é o vencimento da última pendente.",
          en: "Debts reported to credit bureaus (importable from the Serasa/SPC statement) become a plan: negotiated discount, progress and the month the CPF is clean, which is the due date of the last pending debt.",
        },
        code: [
          {
            file: "frontend/src/finance.ts",
            lang: "ts",
            start: 160,
            hl: [163],
            code: "export function cpfLimpoKey(s: AppState): string | null {\n  const pend = s.negativadas.filter((n) => !n.pago);\n  if (!pend.length) return null;\n  return pend.map((n) => n.mes).sort((a, b) => monthDiff(a, b))[0] ?? null;\n}",
          },
        ],
      },
      {
        kicker: { pt: "ia com fallback", en: "ai with fallback" },
        title: { pt: "OCR local primeiro, IA só no que faltar.", en: "Local OCR first, AI only for what is missing." },
        text: {
          pt: "O servidor lê o documento localmente (pdfplumber/Tesseract + regex). A IA só entra se essa leitura falhar e houver consentimento LGPD: tenta Groq, cai para Gemini e valida a resposta. Nada é gravado antes da revisão.",
          en: "The server reads the document locally (pdfplumber/Tesseract + regex). AI only steps in if that fails and the user gave LGPD consent: it tries Groq, falls back to Gemini and validates the answer. Nothing is saved before the user reviews it.",
        },
        code: [
          {
            file: "backend/src/ai/cadeia.ts",
            lang: "ts",
            start: 33,
            hl: [40],
            code: "try {\n  const bruto =\n    provedor === \"groq\"\n      ? await gerarJsonComGroq(pedido.groq.system, pedido.groq.mensagem)\n      : await gerarJsonComGemini(pedido.gemini.mensagem, pedido.gemini.schema);\n  return validar(bruto);\n} catch (err) {\n  if (ultimo && provedor === \"gemini\") throw erroDoGemini(err);",
          },
        ],
      },
      {
        kicker: { pt: "mobile · flutter", en: "mobile · flutter" },
        title: { pt: "App nativo que abre sem rede.", en: "A native app that opens offline." },
        text: {
          pt: "Flutter com Riverpod sobre a mesma API. O último estado de cada mês fica num cache LRU local, e os tokens ficam no Keychain/Keystore (flutter_secure_storage).",
          en: "Flutter with Riverpod on the same API. The last state of each month stays in a local LRU cache, and tokens live in the Keychain/Keystore (flutter_secure_storage).",
        },
        code: [
          {
            file: "mobile/lib/core/storage/offline_cache.dart",
            lang: "dart",
            start: 36,
            hl: [42, 43],
            code: "final key = _stateKey(householdId, month);\nawait prefs.setString(key, jsonEncode({'savedAt': (agora ?? DateTime.now()).toIso8601String(), 'state': json}));\n// Índice em ordem de uso (mais recente no fim); poda os mais antigos.\nfinal indice = [...?prefs.getStringList(_indiceKey)]\n  ..remove(key)\n  ..add(key);\nwhile (indice.length > maxMeses) {\n  await prefs.remove(indice.removeAt(0));\n}\nawait prefs.setStringList(_indiceKey, indice);",
          },
        ],
      },
    ],
  },
  {
    id: "agenda-facil",
    index: { pt: "02 / 04 · saas multi-tenant", en: "02 / 04 · multi-tenant saas" },
    name: "Agenda Fácil",
    pitch: {
      pt: "Agendamento e gestão para salões, clínicas e barbearias. Cada estúdio é um tenant isolado no banco.",
      en: "Booking and management for salons, clinics and barbershops. Each studio is an isolated tenant in the database.",
    },
    chips: [
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL · RLS",
      "Edge Functions",
      "Stripe",
      "WhatsApp API",
    ],
    nums: [
      { value: "9", label: { pt: "ADRs", en: "ADRs" } },
      { value: "9", label: { pt: "testes SQL", en: "SQL tests" } },
      { value: "12", label: { pt: "testes TS", en: "TS tests" } },
      { value: "12", label: { pt: "edge functions", en: "edge functions" } },
    ],
    links: [
      { label: { pt: "Ver online", en: "Live app" }, href: "https://agenda-facil.vercel.app" },
      { label: { pt: "GitHub", en: "GitHub" }, href: "https://github.com/DevAndreNarcizo/Agenda_Facil" },
    ],
    alt: {
      pt: "Painel do Agenda Fácil com os agendamentos do dia e indicadores, com dados fictícios.",
      en: "Agenda Fácil dashboard with the day's appointments and metrics, using fictitious data.",
    },
    shots: [
      { key: "d", src: "/apps/af-dash.webp", w: 2560, h: 1600 },
      { key: "c", src: "/apps/af-cal.webp", w: 2560, h: 1600 },
      { key: "a", src: "/apps/af-analytics.webp", w: 2560, h: 1600 },
      { key: "b", src: "/apps/af-book.webp", w: 2560, h: 1880 },
    ],
    device: {
      tag: { pt: "PWA instalável", en: "installable PWA" },
      shots: [
        { key: "m1", src: "/apps/af-m-home.webp", w: 1170, h: 2532 },
        { key: "m2", src: "/apps/af-m-book.webp", w: 1170, h: 3120 },
      ],
    },
    steps: [
      { k: "d", ov: true, url: "agenda-facil · /dashboard" },
      {
        k: "d",
        r: [528, 339, 1968, 228],
        lift: [[528.0, 339, 486.0, 228], [1022.0, 339, 486.0, 228], [1516.0, 339, 486.0, 228], [2010.0, 339, 486.0, 228]],
      },
      {
        k: "d",
        r: [1827, 624, 669, 740],
      },
      {
        k: "c",
        click: [243, 272],
        out: true,
        ov: true,
        url: "agenda-facil · /dashboard/calendar",
      },
      {
        k: "a",
        click: [260, 576],
        r: [528, 624, 964, 708],
        url: "agenda-facil · /dashboard/analytics",
      },
      {
        k: "b",
        r: [608, 424, 1344, 1392],
        url: "agenda-facil · /reservar/studio-aurora-demo",
      },
      { k: "b", ov: true, device: true },
    ],
    cards: [
      {
        kicker: { pt: "multi-tenant", en: "multi-tenant" },
        title: { pt: "Cada estúdio isolado no banco.", en: "Each studio isolated in the database." },
        text: {
          pt: "O isolamento entre tenants é feito por políticas RLS no Postgres, não no front. Um teste SQL entra como dono, admin e funcionário de um estúdio, falha se algum enxergar dado de outro e exige que inserir no outro estúdio seja recusado.",
          en: "Tenant isolation is done by RLS policies in Postgres, not in the front end. A SQL test signs in as owner, admin and employee of one studio, fails if any of them sees another studio's data and requires inserts into the other studio to be refused.",
        },
        code: [
          {
            file: "supabase/tests/rls-isolation.sql",
            lang: "sql",
            start: 127,
            hl: [129, 130],
            code: "PERFORM set_config('request.jwt.claim.sub', test_user_id::text, true);\n\nIF (SELECT count(*) FROM public.organizations) <> 1 THEN\n  RAISE EXCEPTION 'RLS falhou: usuário % visualizou organizações de outro tenant', test_user_id;\nEND IF;",
          },
        ],
      },
      {
        kicker: { pt: "sql", en: "sql" },
        title: { pt: "Indicadores calculados no Postgres.", en: "Metrics computed in Postgres." },
        text: {
          pt: "Os cards vêm de uma RPC que resume o período (dia ou mês) no banco, em vez de contar no navegador. `SECURITY INVOKER` com `search_path` vazio: respeita o RLS de quem chama.",
          en: "The cards come from an RPC that summarizes the period (day or month) in the database instead of counting in the browser. `SECURITY INVOKER` with an empty `search_path`: it respects the caller's RLS.",
        },
        code: [
          {
            file: "supabase/migrations/20261004000001_panel_…sql",
            lang: "sql",
            start: 282,
            hl: [286, 287],
            code: "SELECT\n  COUNT(*)::bigint,\n  COUNT(*) FILTER (WHERE a.status = 'pending')::bigint,\n  COUNT(*) FILTER (WHERE a.status = 'completed')::bigint,\n  COALESCE(SUM(EXTRACT(EPOCH FROM (a.end_time - a.start_time)) / 60), 0)::bigint,\n  COALESCE(SUM(COALESCE(NULLIF(a.amount_paid, 0), s.price, 0)) FILTER (WHERE a.payment_status = 'paid'), 0)::numeric\nFROM public.appointments a\nLEFT JOIN public.services s ON s.id = a.service_id\nWHERE a.organization_id = (SELECT private.current_organization_id())\n  AND a.status <> 'cancelled'\n  AND a.start_time >= p_start\n  AND a.start_time < p_end;",
          },
        ],
      },
      {
        kicker: { pt: "filas", en: "queues" },
        title: { pt: "Confirmou, o lembrete sai sozinho.", en: "Once confirmed, the reminder goes out by itself." },
        text: {
          pt: "Agendamento confirmado recebe lembrete no WhatsApp 24 h antes. Um job horário enche uma outbox; cada execução reserva seu lote com `FOR UPDATE SKIP LOCKED` e lease, e `UNIQUE (appointment_id, template_name)` impede envio duplicado.",
          en: "A confirmed appointment gets a WhatsApp reminder 24 h before. An hourly job fills an outbox; each run claims its batch with `FOR UPDATE SKIP LOCKED` and a lease, and `UNIQUE (appointment_id, template_name)` prevents duplicate sends.",
        },
        code: [
          {
            file: "supabase/migrations/20260815_000012_reminder_…sql",
            lang: "sql",
            start: 69,
            hl: [80],
            code: "WITH candidates AS (\n  SELECT id\n  FROM public.message_deliveries\n  WHERE status IN ('pending', 'failed')\n    AND channel = 'whatsapp'\n    AND template_name = 'appointment_reminder'\n    AND scheduled_for <= now()\n    AND next_attempt_at <= now()\n    AND attempts < max_attempts\n  ORDER BY scheduled_for, created_at\n  LIMIT p_limit\n  FOR UPDATE SKIP LOCKED\n), claimed AS (",
          },
        ],
      },
      {
        kicker: { pt: "concorrência", en: "concurrency" },
        title: { pt: "Horário duplo é impossível.", en: "Double booking is impossible." },
        text: {
          pt: "Uma exclusion constraint GiST impede dois atendimentos sobrepostos para o mesmo profissional, mesmo com duas reservas no mesmo milissegundo. O teste SQL tenta a segunda e espera o erro 23P01.",
          en: "A GiST exclusion constraint blocks two overlapping appointments for the same professional, even with two bookings in the same millisecond. The SQL test tries the second one and expects error 23P01.",
        },
        code: [
          {
            file: "supabase/migrations/20260815_000006_agenda_…sql",
            lang: "sql",
            start: 22,
            hl: [24],
            code: "ALTER TABLE public.appointments\n  ADD CONSTRAINT appointments_employee_time_no_overlap\n  EXCLUDE USING gist (organization_id WITH =, employee_id WITH =, tstzrange(start_time, end_time, '[)') WITH &&)\n  WHERE (employee_id IS NOT NULL AND status IN ('pending', 'confirmed'));",
          },
          {
            file: "supabase/tests/agenda-operational.sql",
            lang: "sql",
            start: 160,
            hl: [162],
            code: "  RAISE EXCEPTION 'Sobreposição não foi bloqueada.';\nEXCEPTION\n  WHEN SQLSTATE '23P01' THEN NULL;",
          },
        ],
      },
      {
        kicker: { pt: "analytics", en: "analytics" },
        title: { pt: "Agregação no banco, não no navegador.", en: "Aggregated in the database, not the browser." },
        text: {
          pt: "Receita por mês, mix de serviços e horários de pico são RPCs agregadas no fuso de Brasília, filtradas pelo tenant de quem chama. O front só desenha.",
          en: "Revenue per month, service mix and peak hours are RPCs aggregated in the Brasília time zone, filtered by the caller's tenant. The front end only draws.",
        },
        code: [
          {
            file: "supabase/migrations/20261004000001_panel_…sql",
            lang: "sql",
            start: 197,
            hl: [198, 202],
            code: "SELECT\n  to_char(a.start_time AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM') AS month,\n  COALESCE(SUM(COALESCE(NULLIF(a.amount_paid, 0), s.price, 0)), 0)::numeric AS revenue\nFROM public.appointments a\nLEFT JOIN public.services s ON s.id = a.service_id\nWHERE a.organization_id = (SELECT private.current_organization_id())\n  AND a.status = 'completed'\n  AND a.start_time >= date_trunc('month', now() AT TIME ZONE 'America/Sao_Paulo') AT TIME ZONE 'America/Sao_Paulo' - interval '23 months'\nGROUP BY 1\nORDER BY 1;",
          },
        ],
      },
      {
        kicker: { pt: "api pública", en: "public api" },
        title: {
          pt: "Reserva sem login, sem expor a agenda.",
          en: "Booking without login, without exposing the schedule.",
        },
        text: {
          pt: "O cliente agenda por link. Os horários livres vêm de uma RPC que só devolve slots, valida o período no fuso do estúdio e exige confirmação de identidade por código no WhatsApp.",
          en: "Clients book through a link. Free times come from an RPC that only returns slots, checks the period in the studio's time zone and requires identity confirmation with a WhatsApp code.",
        },
        code: [
          {
            file: "supabase/migrations/20260815_000013_public_…sql",
            lang: "sql",
            start: 177,
            hl: [179],
            code: "v_now_local_date := (now() AT TIME ZONE v_timezone)::date;\n\nIF p_date < v_now_local_date OR p_date > v_now_local_date + 90 THEN\n  RAISE EXCEPTION 'Data fora do período permitido.' USING ERRCODE = '22023';\nEND IF;",
          },
        ],
      },
      {
        kicker: { pt: "mobile · pwa", en: "mobile · pwa" },
        title: { pt: "Instalável no celular.", en: "Installable on the phone." },
        text: {
          pt: "Manifest standalone e service worker: a casca do app abre mesmo sem rede, e as chamadas ao Supabase e ao Stripe nunca passam pelo cache. Não é app nativo: é o mesmo React responsivo.",
          en: "Standalone manifest and service worker: the app shell opens even offline, and calls to Supabase and Stripe never go through the cache. It is not a native app: it is the same responsive React.",
        },
        code: [
          {
            file: "public/sw.js",
            lang: "js",
            start: 48,
            hl: [52, 53],
            code: "// Para navegação SPA: sempre retornar index.html\n// Isso garante que rotas como /onboarding, /dashboard, etc. funcionem\nif (event.request.mode === 'navigate') {\n  event.respondWith(\n    fetch(event.request).catch(() => {\n      return caches.match('/index.html');\n    })\n  );\n  return;\n}",
          },
        ],
      },
    ],
  },
  {
    id: "foco-vida",
    index: { pt: "03 / 04 · produto do zero", en: "03 / 04 · product from scratch" },
    name: "Foco Vida",
    pitch: {
      pt: "Tarefas, compromissos, rotina e estudos num lugar só. JavaScript puro, sem framework.",
      en: "Tasks, appointments, routine and studies in one place. Plain JavaScript, no framework.",
    },
    chips: [
      "JavaScript · ES modules",
      "Supabase Auth",
      "Design tokens",
      "node --test",
      "Playwright",
    ],
    nums: [
      { value: "0", label: { pt: "deps npm em runtime", en: "runtime npm deps" } },
      { value: "52", label: { pt: "módulos", en: "modules" } },
      { value: "8", label: { pt: "suítes de teste", en: "test suites" } },
      { value: "6", label: { pt: "gates no verify", en: "gates in verify" } },
    ],
    links: [
      { label: { pt: "Ver online", en: "Live app" }, href: "https://foco-vida.vercel.app" },
    ],
    note: { pt: "repositório privado", en: "private repository" },
    alt: {
      pt: "Tela Hoje do Foco Vida com tarefas priorizadas e a agenda do dia, com dados fictícios.",
      en: "Foco Vida \"Today\" screen with prioritized tasks and the day schedule, using fictitious data.",
    },
    shots: [
      { key: "h", src: "/apps/fv-home.webp", w: 2560, h: 2576 },
      { key: "c", src: "/apps/fv-cal.webp", w: 2560, h: 2392 },
      { key: "s", src: "/apps/fv-study.webp", w: 2560, h: 2202 },
      { key: "f", src: "/apps/fv-focus.webp", w: 2560, h: 1600 },
    ],
    device: {
      tag: { pt: "responsivo · mesmo código", en: "responsive · same code" },
      shots: [
        { key: "m1", src: "/apps/fv-m-home.webp", w: 1170, h: 6180 },
      ],
    },
    steps: [
      { k: "h", ov: true, url: "foco-vida.vercel.app/#hoje" },
      {
        k: "h",
        r: [1759, 465, 729, 396],
      },
      {
        k: "c",
        click: [223, 651],
        out: true,
        ov: true,
        url: "foco-vida.vercel.app/#calendario",
      },
      {
        k: "s",
        click: [223, 923],
        out: true,
        r: [1020, 608, 700, 724],
        url: "foco-vida.vercel.app/#estudos",
      },
      {
        k: "f",
        click: [1454, 1185],
        r: [530, 200, 1500, 1120],
        url: "foco-vida.vercel.app/#foco",
      },
      { k: "f", ov: true, device: true },
    ],
    cards: [
      {
        kicker: { pt: "arquitetura", en: "architecture" },
        title: { pt: "Camadas checadas por script.", en: "Layers checked by a script." },
        text: {
          pt: "Sem framework, mas com regra: um gate reprova import que inverta camadas, `core/` tocando o navegador ou `innerHTML` fora de dois módulos.",
          en: "No framework, but with rules: a gate fails any import that inverts layers, `core/` touching the browser or `innerHTML` outside two modules.",
        },
        code: [
          {
            file: "scripts/check-layers.js",
            lang: "js",
            start: 29,
            code: "const FORBIDDEN_IMPORTS = {\n  core: ['app', 'ui', 'infra'],\n  infra: ['app', 'ui'],\n  ui: ['app', 'infra'],\n};",
          },
          {
            file: "scripts/check-layers.js",
            lang: "js",
            start: 94,
            hl: [94],
            code: "if (layer === 'core' && /\\bdocument\\.|\\blocalStorage\\b|\\bwindow\\./.test(code)) {\n  problems.push(`${relative}: core/ é puro e não pode tocar o navegador`);\n}",
          },
        ],
      },
      {
        kicker: { pt: "algoritmo", en: "algorithm" },
        title: { pt: "Prioridade calculada, não chutada.", en: "Priority computed, not guessed." },
        text: {
          pt: "Cada tarefa ganha nota de 0 a 100 por impacto, esforço e prazo, com pesos ajustáveis e presets (equilíbrio, ganhos rápidos, prazos primeiro).",
          en: "Each task gets a 0 to 100 score from impact, effort and deadline, with adjustable weights and presets (balance, quick wins, deadlines first).",
        },
        code: [
          {
            file: "public/core/scoring.js",
            lang: "js",
            start: 97,
            hl: [103],
            code: "export function score(task, weights, today = todayString()) {\n  const total = weights.impact + weights.effort + weights.urgency;\n  if (total <= 0) return 0;\n  const impactScore = ((task.impact - 1) / 4) * weights.impact;\n  const effortScore = ((5 - task.effort) / 4) * weights.effort;\n  const urgencyScore = urgency(task.due, today) * weights.urgency;\n  return 100 * (impactScore + effortScore + urgencyScore) / total;\n}",
          },
        ],
      },
      {
        kicker: { pt: "interoperabilidade", en: "interoperability" },
        title: { pt: "Exporta para qualquer calendário.", en: "Exports to any calendar." },
        text: {
          pt: "Gera `.ics` seguindo a RFC 5545: escape de texto, dobra de linha contada em bytes UTF-8 e quebra CRLF.",
          en: "Generates `.ics` following RFC 5545: text escaping, line folding counted in UTF-8 bytes and CRLF line breaks.",
        },
        code: [
          {
            file: "public/core/ics.js",
            lang: "js",
            start: 49,
            code: "export function exportICS(events) {\n  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Foco//Gestao da vida//PT-BR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];\n  events\n    .filter(e => !e.deletedAt)\n    .forEach(e => lines.push(\n      'BEGIN:VEVENT',\n      'UID:' + icsEscape(e.id) + '@foco.local',\n      'DTSTAMP:' + icsDate(new Date().toISOString()),\n      'DTSTART:' + icsDate(e.start),\n      'DTEND:' + icsDate(e.end),\n      'SUMMARY:' + icsEscape(e.title),",
          },
        ],
      },
      {
        kicker: { pt: "estado", en: "state" },
        title: { pt: "Cronômetro que não atrasa.", en: "A timer that does not drift." },
        text: {
          pt: "O tempo restante é derivado de `endAt`, não de um contador: aba em segundo plano, throttling do navegador ou celular bloqueado não acumulam erro.",
          en: "Remaining time is derived from `endAt`, not from a counter: a background tab, browser throttling or a locked phone do not add up errors.",
        },
        code: [
          {
            file: "public/core/timer.js",
            lang: "js",
            start: 13,
            hl: [15],
            code: "export function remainingSeconds(timer, now = Date.now()) {\n  if (!timer) return 0;\n  return timer.running ? Math.max(0, Math.min(timer.planned, Math.ceil((timer.endAt - now) / 1000))) : timer.remaining;\n}",
          },
        ],
      },
      {
        kicker: { pt: "resiliência", en: "resilience" },
        title: { pt: "Fecha a aba, o foco continua.", en: "Close the tab, the focus session goes on." },
        text: {
          pt: "Ao reabrir, o boot reconcilia o cronômetro e registra a sessão que terminou com o app fechado. Testes de navegador cobrem sessão vencida sem rede e sessão revogada.",
          en: "On reopening, boot reconciles the timer and records the session that ended while the app was closed. Browser tests cover an expired session without network and a revoked session.",
        },
        code: [
          {
            file: "public/main.js",
            lang: "js",
            start: 93,
            hl: [94, 95],
            code: "document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });\nif (getState().timer?.running && remainingSeconds(getState().timer) === 0) {\n  finishTimer(getState());\n  persist();\n}",
          },
        ],
      },
      {
        kicker: { pt: "design system", en: "design system" },
        title: { pt: "Tema claro e escuro gerados de tokens.", en: "Light and dark themes generated from tokens." },
        text: {
          pt: "O CSS de tema é gerado de `design/tokens/` e auditado no `verify`: paridade claro/escuro, contraste WCAG e nenhuma cor fora dos tokens. O mesmo código atende o celular.",
          en: "The theme CSS is generated from `design/tokens/` and audited in `verify`: light/dark parity, WCAG contrast and no color outside the tokens. The same code serves the phone.",
        },
        code: [
          {
            file: "scripts/build-tokens.js",
            lang: "js",
            start: 2,
            code: " * Gera `public/tokens.css` e `public/favicon.svg` a partir de `design/tokens/`\n * e, com `--check`, audita o resultado sem gravar nada: geração idêntica ao\n * disco, paridade claro/escuro, `components`/`alpha` coerentes com `hex`,\n * contraste WCAG dos pares fixos, `theme-color` de `index.html` e ausência de\n * cor literal fora dos tokens.",
          },
        ],
      },
    ],
  },
  {
    id: "laravel",
    index: { pt: "04 / 04 · api rest · laravel", en: "04 / 04 · rest api · laravel" },
    name: "Laravel API",
    pitch: {
      pt: "API REST de projetos e tarefas em Clean Architecture: o domínio não conhece o Laravel, e um teste prova isso.",
      en: "REST API for projects and tasks in Clean Architecture: the domain does not know Laravel, and a test proves it.",
    },
    chips: [
      "Laravel 11",
      "PHP 8.4",
      "PostgreSQL 16",
      "Redis",
      "RabbitMQ",
      "JWT",
      "OpenAPI 3.1",
      "Docker",
    ],
    nums: [
      { value: "128", label: { pt: "testes", en: "tests" } },
      { value: "83%", label: { pt: "cobertura", en: "coverage" } },
      { value: "14", label: { pt: "rotas no OpenAPI", en: "routes in OpenAPI" } },
      { value: "8", label: { pt: "nível PHPStan", en: "PHPStan level" } },
    ],
    links: [
      {
        label: { pt: "GitHub", en: "GitHub" },
        href: "https://github.com/DevAndreNarcizo/laravel-clean-architecture-api",
      },
    ],
    alt: {
      pt: "Documentação Swagger da API Laravel com as rotas de autenticação, projetos e tarefas.",
      en: "Swagger docs of the Laravel API with the auth, project and task routes.",
    },
    shots: [
      { key: "d", src: "/apps/l-docs.webp", w: 2560, h: 2540 },
      { key: "r", src: "/apps/l-refresh.webp", w: 2560, h: 1600 },
      { key: "l", src: "/apps/l-login.webp", w: 2560, h: 1600 },
      { key: "t", src: "/apps/l-tests.webp", w: 2560, h: 1632 },
    ],
    steps: [
      { k: "d", ov: true, url: "localhost:8080/docs" },
      {
        k: "d",
        r: [40, 80, 1860, 400],
      },
      {
        k: "d",
        r: [40, 1180, 2480, 660],
      },
      {
        k: "d",
        r: [40, 2060, 1300, 160],
      },
      {
        k: "r",
        click: [530, 870],
        out: true,
        r: [40, 40, 2480, 260],
        url: "localhost:8080/docs#/Auth/refreshToken",
      },
      {
        k: "l",
        r: [240, 780, 2240, 540],
        url: "localhost:8080/docs#/Auth/login",
      },
      {
        k: "t",
        r: [60, 1140, 1600, 360],
        url: "terminal · php artisan test",
      },
    ],
    cards: [
      {
        kicker: { pt: "arquitetura", en: "architecture" },
        title: { pt: "O domínio não conhece o Laravel.", en: "The domain does not know Laravel." },
        text: {
          pt: "Domain e Application ficam em `src/` sem nenhum import do framework. Um teste lê cada arquivo dessas camadas e falha se aparecer `Illuminate\\`, `App\\` ou uma camada externa.",
          en: "Domain and Application live in `src/` with no framework imports. A test reads every file in those layers and fails if `Illuminate\\`, `App\\` or an outer layer shows up.",
        },
        code: [
          {
            file: "tests/Unit/ArchitectureTest.php",
            lang: "php",
            start: 22,
            hl: [22],
            code: "$framework = ['Illuminate\\\\', 'App\\\\', 'Src\\\\Infrastructure\\\\', 'Src\\\\Interface\\\\'];\n\nreturn [\n    'Domain' => ['Domain', [...$framework, 'Src\\\\Application\\\\']],\n    'Application' => ['Application', $framework],",
          },
        ],
      },
      {
        kicker: { pt: "contrato", en: "contract" },
        title: { pt: "A documentação não envelhece.", en: "The docs cannot go stale." },
        text: {
          pt: "O teste compara as rotas registradas no Laravel com o `openapi.yaml`: rota nova sem documentação, ou documentação de rota que sumiu, quebra o build. São 14 rotas, todas no Swagger.",
          en: "The test compares the routes registered in Laravel with `openapi.yaml`: a new route without docs, or docs for a route that is gone, breaks the build. 14 routes, all in Swagger.",
        },
        code: [
          {
            file: "tests/Feature/OpenApiContractTest.php",
            lang: "php",
            start: 33,
            code: "foreach (Route::getRoutes() as $route) {\n    if (str_starts_with($route->uri(), 'api/')) {\n        foreach (array_diff($route->methods(), ['HEAD']) as $method) {\n            $registered[] = $method.' /'.$route->uri();\n        }",
          },
          {
            file: "tests/Feature/OpenApiContractTest.php",
            lang: "php",
            start: 44,
            hl: [45],
            code: "$this->assertCount(14, $registered);\n$this->assertSame($registered, $documented);",
          },
        ],
      },
      {
        kicker: { pt: "segurança", en: "security" },
        title: { pt: "Projeto de outro usuário é 404.", en: "Another user's project is a 404." },
        text: {
          pt: "Toda busca filtra pelo dono já na query (`findForOwner`): o id de outro usuário simplesmente não existe para quem pergunta. O teste tenta ler, alterar e apagar projetos e tarefas alheios e espera 404 em todas as rotas.",
          en: "Every lookup filters by owner in the query itself (`findForOwner`): another user's id simply does not exist for the caller. The test tries to read, change and delete someone else's projects and tasks and expects 404 on every route.",
        },
        code: [
          {
            file: "src/Infrastructure/Persistence/Eloquent/Repositories/EloquentTaskRepository.php",
            lang: "php",
            start: 35,
            hl: [39],
            code: "public function findForOwner(int $id, int $ownerId): ?Task\n{\n    $model = TaskModel::query()\n        ->whereKey($id)\n        ->whereIn('project_id', ProjectModel::query()->select('id')->where('owner_id', $ownerId))\n        ->first();",
          },
          {
            file: "tests/Feature/Api/OwnershipTest.php",
            lang: "php",
            start: 24,
            code: "$this->getJson(\"/api/v1/projects/{$project->id}\", $auth)->assertNotFound();\n$this->putJson(\"/api/v1/projects/{$project->id}\", ['name' => 'Hijacked'], $auth)->assertNotFound();\n$this->deleteJson(\"/api/v1/projects/{$project->id}\", [], $auth)->assertNotFound();",
          },
        ],
      },
      {
        kicker: { pt: "eventos", en: "events" },
        title: { pt: "Tarefa criada vira evento no RabbitMQ.", en: "A new task becomes a RabbitMQ event." },
        text: {
          pt: "O caso de uso só conhece a porta `TaskCreatedNotifier`. A implementação publica `task.created` num exchange topic durável, ligado à fila `task-created-email`, que um comando Artisan consome.",
          en: "The use case only knows the `TaskCreatedNotifier` port. The implementation publishes `task.created` to a durable topic exchange bound to the `task-created-email` queue, which an Artisan command consumes.",
        },
        code: [
          {
            file: "src/Application/Project/CreateTaskUseCase.php",
            lang: "php",
            start: 37,
            hl: [44],
            code: "$task = $this->tasks->save(new Task(\n    id: null,\n    projectId: $data->projectId,\n    title: $data->title,\n    description: $data->description,\n));\n\n$this->notifier->notify($task);",
          },
          {
            file: "src/Infrastructure/Messaging/RabbitMq.php",
            lang: "php",
            start: 43,
            hl: [45],
            code: "$this->channel->exchange_declare(self::EXCHANGE, 'topic', false, true, false);\n$this->channel->queue_declare(self::TASK_CREATED_QUEUE, false, true, false, false);\n$this->channel->queue_bind(self::TASK_CREATED_QUEUE, self::EXCHANGE, self::TASK_CREATED);",
          },
        ],
      },
      {
        kicker: { pt: "auth", en: "auth" },
        title: { pt: "Refresh token de uso único.", en: "Single-use refresh tokens." },
        text: {
          pt: "A rotação trava a linha (`lockForUpdate`) e emite o sucessor na mesma transação. Reusar um token já trocado revoga todas as sessões do usuário, porque é sinal de token vazado.",
          en: "Rotation locks the row (`lockForUpdate`) and issues the successor in the same transaction. Reusing a token that was already exchanged revokes all of the user's sessions, because it signals a leaked token.",
        },
        code: [
          {
            file: "src/Infrastructure/Auth/DatabaseRefreshTokenStore.php",
            lang: "php",
            start: 55,
            hl: [59],
            code: "$rotated = DB::transaction(function () use ($plain): ?array {\n    $row = DB::table('refresh_tokens')\n        ->where('token_hash', $this->hash($plain))\n        ->where('expires_at', '>', now())\n        ->lockForUpdate()\n        ->first();",
          },
          {
            file: "src/Infrastructure/Auth/DatabaseRefreshTokenStore.php",
            lang: "php",
            start: 67,
            hl: [68, 75],
            code: "if ($row->revoked_at !== null) {\n    $this->revokeWhere('user_id', (int) $row->user_id);\n\n    return null;\n}\n\n$this->revokeWhere('id', (int) $row->id);\n\nreturn ['user_id' => (int) $row->user_id, 'refresh_token' => $this->issue((int) $row->user_id)];",
          },
        ],
      },
      {
        kicker: { pt: "api", en: "api" },
        title: { pt: "Uma resposta, um formato.", en: "One response, one shape." },
        text: {
          pt: "Sucesso e erro saem do mesmo envelope: `success`, `data`, `error` e `meta`. O cliente trata qualquer rota do mesmo jeito, e o Swagger documenta exatamente isso.",
          en: "Success and error share one envelope: `success`, `data`, `error` and `meta`. Clients handle every route the same way, and Swagger documents exactly that.",
        },
        code: [
          {
            file: "src/Interface/Http/Resources/ApiResponse.php",
            lang: "php",
            start: 14,
            code: "return response()->json([\n    'success' => true,\n    'data' => $data,\n    'error' => null,\n    'meta' => ['timestamp' => now()->toISOString(), ...$meta],\n], $status);",
          },
          {
            file: "src/Interface/Http/Resources/ApiResponse.php",
            lang: "php",
            start: 25,
            code: "return response()->json([\n    'success' => false,\n    'data' => null,\n    'error' => compact('code', 'message', 'details'),\n    'meta' => ['timestamp' => now()->toISOString()],\n], $status);",
          },
        ],
      },
      {
        kicker: { pt: "qualidade", en: "quality" },
        title: { pt: "128 testes num Postgres de verdade.", en: "128 tests on a real Postgres." },
        text: {
          pt: "O CI roda Pint, PHPStan nível 8 e a suíte inteira contra o PostgreSQL 16, com cobertura mínima de 75% (hoje 83%). Cache, fila e RabbitMQ ficam em memória nos testes.",
          en: "CI runs Pint, PHPStan level 8 and the whole suite against PostgreSQL 16, with a 75% coverage floor (83% today). Cache, queue and RabbitMQ stay in memory during tests.",
        },
        code: [
          {
            file: ".github/workflows/ci.yml",
            lang: "yaml",
            start: 36,
            hl: [38],
            code: "- run: ./vendor/bin/pint --test\n# cache, fila, sessão e RabbitMQ ficam em memória (phpunit.xml); só o banco é o Postgres real\n- run: php artisan test --coverage --min=75\n  env:\n    DB_CONNECTION: pgsql",
          },
        ],
      },
    ],
  },
];
