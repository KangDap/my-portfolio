'use client';

import { GitHubCalendar } from 'react-github-calendar';

function getOrdinalSuffix(day: number) {
  if (day % 100 >= 11 && day % 100 <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatGitHubTooltipDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);
  const month = parsedDate.toLocaleString('en-US', { month: 'long' });
  const day = parsedDate.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

function formatContributionTooltip(activity: { count: number; date: string }) {
  const contributionLabel =
    activity.count === 1 ? 'contribution' : 'contributions';

  if (activity.count === 0) {
    return `No contributions on ${formatGitHubTooltipDate(activity.date)}.`;
  }

  return `${activity.count} ${contributionLabel} on ${formatGitHubTooltipDate(
    activity.date,
  )}.`;
}

export function GitHubActivitiesCalendar() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card/70 p-4 shadow-sm sm:p-6">
      <div className="flex min-w-max justify-center">
        <GitHubCalendar
          username="KangDap"
          colorScheme="dark"
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          showWeekdayLabels={true}
          labels={{
            totalCount: '{{count}} contributions in the last year',
          }}
          theme={{
            dark: [
              'var(--muted)',
              'color-mix(in oklch, var(--foreground) 24%, var(--background))',
              'color-mix(in oklch, var(--foreground) 42%, var(--background))',
              'color-mix(in oklch, var(--foreground) 62%, var(--background))',
              'var(--foreground)',
            ],
            light: [
              'var(--muted)',
              'color-mix(in oklch, var(--foreground) 24%, var(--background))',
              'color-mix(in oklch, var(--foreground) 42%, var(--background))',
              'color-mix(in oklch, var(--foreground) 62%, var(--background))',
              'var(--foreground)',
            ],
          }}
          tooltips={{
            activity: {
              text: formatContributionTooltip,
            },
            colorLegend: {
              text: (level) => `Activity level ${level + 1}`,
            },
          }}
        />
      </div>
    </div>
  );
}
