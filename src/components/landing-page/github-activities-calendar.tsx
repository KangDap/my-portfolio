'use client';

import { Button } from '@/components/ui/button';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import {
  BookMarked,
  GitCommitHorizontal,
  GitPullRequest,
  GitPullRequestArrow,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

type GitHubActivitiesCalendarProps = {
  username: string;
};

type MonthlyContributionDay = {
  date: string;
  contributionCount: number;
};

type GitHubRepository = {
  nameWithOwner: string;
  url: string;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
};

type CommitRepositoryActivity = {
  repository: GitHubRepository;
  commitCount: number;
};

type RepositoryCreatedActivity = {
  occurredAt: string;
  repository: GitHubRepository;
};

type PullRequestActivity = {
  occurredAt: string;
  title: string;
  url: string;
  repository: GitHubRepository;
  additions: number;
  deletions: number;
  changedFiles: number;
  commentCount: number;
  merged: boolean;
  mergedAt: string | null;
};

type MonthlyContributions = {
  from: string;
  to: string;
  month: string;
  total: number;
  days: MonthlyContributionDay[];
  activity: {
    commits: {
      total: number;
      repositories: CommitRepositoryActivity[];
    };
    repositoriesCreated: {
      total: number;
      repositories: RepositoryCreatedActivity[];
    };
    pullRequests: {
      total: number;
      items: PullRequestActivity[];
    };
  };
};

const animatedUnderlineClassName =
  'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]';

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

function formatShortDate(date: string) {
  const parsedDate = new Date(date.includes('T') ? date : `${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getContributionLabel(
  count: number,
  singular: string,
  plural?: string,
) {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}

function TimelineIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 top-0 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground [&_svg]:size-3.5">
      {children}
    </div>
  );
}

function TimelineItem({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative pl-8">
      <TimelineIcon>{icon}</TimelineIcon>
      <div className="pb-8">{children}</div>
    </div>
  );
}

function CommitsActivity({
  repositories,
  total,
}: {
  repositories: CommitRepositoryActivity[];
  total: number;
}) {
  if (repositories.length === 0) return null;

  const maxCommitCount = Math.max(
    ...repositories.map((item) => item.commitCount),
    1,
  );

  return (
    <TimelineItem icon={<GitCommitHorizontal aria-hidden="true" />}>
      <div className="flex flex-col gap-3">
        <h4 className="font-medium text-foreground">
          Created {getContributionLabel(total, 'commit')} in{' '}
          {getContributionLabel(
            repositories.length,
            'repository',
            'repositories',
          )}
        </h4>
        <div className="flex flex-col gap-2">
          {repositories.map((item) => {
            const width = `${Math.max(
              (item.commitCount / maxCommitCount) * 100,
              12,
            )}%`;

            return (
              <div
                key={item.repository.nameWithOwner}
                className="grid gap-2 text-sm sm:grid-cols-[minmax(0,1fr)_176px] sm:items-center"
              >
                <div className="min-w-0">
                  <a
                    href={item.repository.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-primary"
                  >
                    <span className={animatedUnderlineClassName}>
                      {item.repository.nameWithOwner}
                    </span>
                  </a>{' '}
                  <span className="text-xs text-muted-foreground">
                    {getContributionLabel(item.commitCount, 'commit')}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TimelineItem>
  );
}

function RepositoriesCreatedActivity({
  repositories,
  total,
}: {
  repositories: RepositoryCreatedActivity[];
  total: number;
}) {
  if (repositories.length === 0) return null;

  return (
    <TimelineItem icon={<BookMarked aria-hidden="true" />}>
      <div className="flex flex-col gap-3">
        <h4 className="font-medium text-foreground">
          Created {getContributionLabel(total, 'repository', 'repositories')}
        </h4>
        <div className="flex flex-col gap-2">
          {repositories.map((item) => (
            <div
              key={`${item.repository.nameWithOwner}-${item.occurredAt}`}
              className="grid gap-2 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-2">
                <BookMarked
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <a
                  href={item.repository.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group text-primary"
                >
                  <span className={animatedUnderlineClassName}>
                    {item.repository.nameWithOwner}
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {item.repository.primaryLanguage ? (
                  <>
                    <span
                      className="size-3 rounded-full"
                      style={{
                        backgroundColor: item.repository.primaryLanguage.color,
                      }}
                    />
                    <span>{item.repository.primaryLanguage.name}</span>
                  </>
                ) : null}
                <span>{formatShortDate(item.occurredAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TimelineItem>
  );
}

function PullRequestsActivity({
  pullRequests,
  total,
}: {
  pullRequests: PullRequestActivity[];
  total: number;
}) {
  if (pullRequests.length === 0) return null;

  const mergedCount = pullRequests.filter((item) => item.merged).length;

  return (
    <TimelineItem icon={<GitPullRequestArrow aria-hidden="true" />}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-medium text-foreground">
            Opened {getContributionLabel(total, 'pull request')}
          </h4>
          {mergedCount > 0 ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {mergedCount} merged
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          {pullRequests.map((item) => (
            <div
              key={item.url}
              className="rounded-lg border border-border bg-background/60 p-4"
            >
              <div className="flex flex-col gap-3">
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {item.repository.nameWithOwner}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-1 inline-flex items-center gap-2 text-base font-semibold text-foreground"
                    >
                      <GitPullRequest
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span className={animatedUnderlineClassName}>
                        {item.title}
                      </span>
                    </a>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatShortDate(item.occurredAt)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-success">
                    +{item.additions.toLocaleString('en-US')}
                  </span>
                  <span className="text-destructive">
                    -{item.deletions.toLocaleString('en-US')}
                  </span>
                  <span>{getContributionLabel(item.changedFiles, 'file')}</span>
                  <span aria-hidden="true">•</span>
                  <span>
                    {getContributionLabel(item.commentCount, 'comment')}
                  </span>
                  {item.merged ? (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>merged</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TimelineItem>
  );
}

function ContributionActivityTimeline({
  contributions,
}: {
  contributions: MonthlyContributions;
}) {
  const hasActivity =
    contributions.activity.commits.repositories.length > 0 ||
    contributions.activity.repositoriesCreated.repositories.length > 0 ||
    contributions.activity.pullRequests.items.length > 0;

  if (!hasActivity) {
    return (
      <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
        No detailed contribution activity for {contributions.month}.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <p className="shrink-0 text-sm font-medium text-foreground">
          {contributions.month}
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="relative ml-4 border-l border-border">
        <CommitsActivity
          repositories={contributions.activity.commits.repositories}
          total={contributions.activity.commits.total}
        />
        <RepositoriesCreatedActivity
          repositories={contributions.activity.repositoriesCreated.repositories}
          total={contributions.activity.repositoriesCreated.total}
        />
        <PullRequestsActivity
          pullRequests={contributions.activity.pullRequests.items}
          total={contributions.activity.pullRequests.total}
        />
      </div>
    </div>
  );
}

function getPreviousMonthTarget(contributions: MonthlyContributions[]) {
  const lastContribution = contributions.at(-1);
  const baseDate = lastContribution
    ? new Date(lastContribution.from)
    : new Date();
  const previousMonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() - 1,
    1,
  );

  return {
    year: previousMonth.getFullYear(),
    month: previousMonth.getMonth() + 1,
  };
}

async function fetchMonthlyContributions(year?: number, month?: number) {
  const params = new URLSearchParams();

  if (year && month) {
    params.set('year', String(year));
    params.set('month', String(month));
  }

  const response = await fetch(
    `/api/github/monthly-contributions${
      params.size > 0 ? `?${params.toString()}` : ''
    }`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch monthly GitHub contributions.');
  }

  return (await response.json()) as MonthlyContributions;
}

export function GitHubActivitiesCalendar({
  username,
}: GitHubActivitiesCalendarProps) {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const [monthlyContributions, setMonthlyContributions] = useState<
    MonthlyContributions[]
  >([]);
  const [isLoadingMonthlyContributions, setIsLoadingMonthlyContributions] =
    useState(true);
  const [isLoadingMoreActivity, setIsLoadingMoreActivity] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchInitialMonthlyContributions() {
      try {
        const data = await fetchMonthlyContributions();

        if (isMounted) {
          setMonthlyContributions([data]);
        }
      } catch {
        if (isMounted) {
          setMonthlyContributions([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingMonthlyContributions(false);
        }
      }
    }

    fetchInitialMonthlyContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const refreshScrollLayout = () => {
      if (resizeFrameRef.current !== null) {
        cancelAnimationFrame(resizeFrameRef.current);
      }

      resizeFrameRef.current = requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
        resizeFrameRef.current = null;
      });
    };

    const observer = new ResizeObserver(refreshScrollLayout);
    observer.observe(container);
    refreshScrollLayout();

    return () => {
      observer.disconnect();

      if (resizeFrameRef.current !== null) {
        cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = null;
      }
    };
  }, [lenis]);

  async function handleShowMoreActivity() {
    setIsLoadingMoreActivity(true);

    try {
      const target = getPreviousMonthTarget(monthlyContributions);
      const data = await fetchMonthlyContributions(target.year, target.month);

      setMonthlyContributions((current) => {
        if (current.some((item) => item.month === data.month)) {
          return current;
        }

        return [...current, data];
      });
    } finally {
      setIsLoadingMoreActivity(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card/70 p-4 shadow-sm sm:p-6"
    >
      <div className="overflow-x-auto">
        <div className="flex min-w-max justify-center">
          <GitHubCalendar
            username={username}
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

      <div className="flex flex-col gap-4 pt-2">
        <h3 className="text-base font-semibold text-foreground">
          Contribution activity
        </h3>
        {monthlyContributions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {monthlyContributions.map((contributions) => (
              <ContributionActivityTimeline
                key={contributions.month}
                contributions={contributions}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isLoadingMoreActivity}
              onClick={handleShowMoreActivity}
            >
              {isLoadingMoreActivity
                ? 'Loading activity...'
                : 'Show more activity'}
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
            {isLoadingMonthlyContributions
              ? 'Loading contribution activity...'
              : 'Contribution activity is unavailable.'}
          </div>
        )}
      </div>
    </div>
  );
}
