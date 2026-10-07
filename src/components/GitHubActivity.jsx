import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

/* ─── GITHUB ACTIVITY ───
   Gráfico de contribuições dos últimos 12 meses + stats do perfil.
   O site modelo busca isso num backend próprio; aqui usamos APIs públicas
   (github-contributions-api.jogruber.de e api.github.com), ambas com CORS
   liberado. */
const LEVEL_COLORS = [
  'rgba(0, 255, 170, 0.08)',
  'rgba(0, 255, 170, 0.25)',
  'rgba(0, 255, 170, 0.5)',
  'rgba(0, 255, 170, 0.75)',
  '#00ffaa',
];

const MONTH_LABELS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/* Agrupa os dias em colunas semanais (dom = topo), como no GitHub */
function buildWeeks(days) {
  if (days.length === 0) return [];
  const weeks = [];
  let current = new Array(days[0].weekday).fill(null); // offset do primeiro dia
  for (const day of days) {
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
    current.push(day);
  }
  if (current.length > 0) weeks.push(current);
  return weeks;
}

function StatCard({ value, label }) {
  return (
    <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-background)] p-4 text-center">
      <p className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">{value}</p>
      <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-1">{label}</p>
    </div>
  );
}

export default function GitHubActivity({ username, profileUrl }) {
  const [state, setState] = useState({ loading: true, weeks: [], stats: null, error: false });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [convRes, userRes] = await Promise.all([
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}`),
          fetch(`https://api.github.com/users/${username}`),
        ]);
        if (!convRes.ok) throw new Error('Falha ao carregar contribuições');

        const conv = await convRes.json();

        // Últimos 12 meses, em ordem crescente
        const days = (conv.contributions || [])
          .slice()
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(-365)
          .map(d => {
            const [y, m, dd] = d.date.split('-').map(Number);
            return {
              date: d.date,
              count: d.count,
              level: Math.min(d.level, 4),
              weekday: new Date(y, m - 1, dd).getDay(),
            };
          });

        const total = days.reduce((sum, d) => sum + d.count, 0);

        let stats = { repos: '—', followers: '—' };
        if (userRes.ok) {
          const user = await userRes.json();
          stats = { repos: user.public_repos, followers: user.followers };
        }

        if (!cancelled) {
          setState({ loading: false, weeks: buildWeeks(days), stats: { ...stats, total }, error: false });
        }
      } catch {
        if (!cancelled) setState({ loading: false, weeks: [], stats: null, error: true });
      }
    };

    load();
    return () => { cancelled = true; };
  }, [username]);

  if (state.loading) {
    // Skeleton igual ao do site modelo
    return (
      <div className="mt-6 animate-pulse">
        <div className="h-32 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-background)]" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-background)] p-6 text-center">
        <p className="text-sm font-mono text-[var(--color-text-secondary)] mb-3">
          Não foi possível carregar a atividade do GitHub agora.
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono font-medium text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Ver perfil no GitHub →
        </a>
      </div>
    );
  }

  const { weeks, stats } = state;

  // Rótulos de mês: mostra o mês quando ele muda de coluna para coluna
  const { labels: monthLabels } = weeks.reduce(
    (acc, week) => {
      const first = week.find(Boolean);
      if (!first) return { ...acc, labels: [...acc.labels, ''] };
      const month = Number(first.date.split('-')[1]) - 1;
      const label = month !== acc.lastMonth ? MONTH_LABELS[month] : '';
      return { lastMonth: month, labels: [...acc.labels, label] };
    },
    { lastMonth: -1, labels: [] }
  );

  const formatDay = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-3">
        <StatCard value={stats.total} label="Contribuições (últimos 12 meses)" />
        <StatCard value={stats.repos} label="Repositórios públicos" />
        <StatCard value={stats.followers} label="Seguidores" />
      </div>

      {/* Gráfico de contribuições */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-background)] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="text-sm font-mono text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-text-primary)] font-semibold">{stats.total}</span>{' '}
            contribuições nos últimos 12 meses
          </p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono font-medium text-[var(--color-accent)]
                       hover:text-[var(--color-text-primary)] transition-colors group"
          >
            <FaGithub className="w-4 h-4" />
            <span>{username}</span>
            <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
          </a>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-max">
            {/* Colunas semanais */}
            <div className="flex gap-[3px]">
              {weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {/* Rótulo de mês (altura fixa p/ alinhar com as células) */}
                  <span className="h-3 text-[10px] leading-3 font-mono text-[var(--color-text-secondary)]">
                    {monthLabels[i]}
                  </span>
                  {week.map((day, j) =>
                    day ? (
                      <div
                        key={j}
                        title={`${day.count} contribuiç${day.count === 1 ? 'ão' : 'ões'} em ${formatDay(day.date)}`}
                        className="w-3 h-3 rounded-[2px] transition-transform hover:scale-125 cursor-default"
                        style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                      />
                    ) : (
                      <div key={j} className="w-3 h-3" />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex items-center justify-end gap-1.5 mt-4 text-[10px] font-mono text-[var(--color-text-secondary)]">
          <span className="mr-1">Menos</span>
          {LEVEL_COLORS.map((color, i) => (
            <span key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: color }} />
          ))}
          <span className="ml-1">Mais</span>
        </div>
      </div>
    </div>
  );
}

