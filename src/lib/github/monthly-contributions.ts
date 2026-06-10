type GitHubContributionDay = {
  date: string;
  contributionCount: number;
};

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

type GitHubRepository = {
  nameWithOwner: string;
  url: string;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
};

type GitHubCommitContribution = {
  occurredAt: string;
  commitCount: number;
  url: string;
};

type GitHubCommitContributionsByRepository = {
  repository: GitHubRepository;
  contributions: {
    totalCount: number;
    nodes: GitHubCommitContribution[];
  };
};

type GitHubRepositoryContribution = {
  occurredAt: string;
  repository: GitHubRepository;
};

type GitHubPullRequestContribution = {
  occurredAt: string;
  pullRequest: {
    title: string;
    url: string;
    additions: number;
    deletions: number;
    changedFiles: number;
    merged: boolean;
    mergedAt: string | null;
    comments: {
      totalCount: number;
    };
    repository: GitHubRepository;
  };
};

type GitHubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GitHubContributionWeek[];
        };
        commitContributionsByRepository: GitHubCommitContributionsByRepository[];
        repositoryContributions: {
          totalCount: number;
          nodes: GitHubRepositoryContribution[];
        };
        pullRequestContributions: {
          totalCount: number;
          nodes: GitHubPullRequestContribution[];
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

type GetMonthlyContributionsOptions = {
  token: string;
  username: string;
  year?: number;
  month?: number;
};

export class GitHubMonthlyContributionsError extends Error {
  status: number;
  details?: GitHubContributionsResponse['errors'];

  constructor(
    message: string,
    status = 500,
    details?: GitHubContributionsResponse['errors'],
  ) {
    super(message);
    this.name = 'GitHubMonthlyContributionsError';
    this.status = status;
    this.details = details;
  }
}

function getMonthRange(year?: number, month?: number) {
  const now = new Date();
  const targetYear = year ?? now.getFullYear();
  const targetMonthIndex = month ? month - 1 : now.getMonth();
  const from = new Date(targetYear, targetMonthIndex, 1);
  const isCurrentMonth =
    targetYear === now.getFullYear() && targetMonthIndex === now.getMonth();
  const to = isCurrentMonth
    ? now
    : new Date(targetYear, targetMonthIndex + 1, 0, 23, 59, 59, 999);

  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

function getMonthLabel(date = new Date()) {
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function getMonthlyContributionsQuery() {
  return `
    query MonthlyContributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          commitContributionsByRepository(maxRepositories: 10) {
            repository {
              nameWithOwner
              url
              primaryLanguage {
                name
                color
              }
            }
            contributions(first: 100) {
              totalCount
              nodes {
                occurredAt
                commitCount
                url
              }
            }
          }
          repositoryContributions(first: 10) {
            totalCount
            nodes {
              occurredAt
              repository {
                nameWithOwner
                url
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
          pullRequestContributions(first: 20) {
            totalCount
            nodes {
              occurredAt
              pullRequest {
                title
                url
                additions
                deletions
                changedFiles
                merged
                mergedAt
                comments {
                  totalCount
                }
                repository {
                  nameWithOwner
                  url
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}

function normalizeContributions(
  payload: GitHubContributionsResponse,
  options: GetMonthlyContributionsOptions & {
    from: string;
    to: string;
    monthDate: Date;
  },
) {
  const contributionsCollection = payload.data?.user?.contributionsCollection;
  const calendar = contributionsCollection?.contributionCalendar;

  if (!calendar || !contributionsCollection) {
    throw new GitHubMonthlyContributionsError(
      'GitHub user contribution data was not found.',
      404,
    );
  }

  const commitRepositories =
    contributionsCollection.commitContributionsByRepository.map((item) => {
      const commitCount = item.contributions.nodes.reduce(
        (total, contribution) => total + contribution.commitCount,
        0,
      );

      return {
        repository: item.repository,
        commitCount,
        contributionCount: item.contributions.totalCount,
        contributions: item.contributions.nodes,
      };
    });
  const totalCommits = commitRepositories.reduce(
    (total, item) => total + item.commitCount,
    0,
  );
  const repositoriesCreated =
    contributionsCollection.repositoryContributions.nodes.map((item) => ({
      occurredAt: item.occurredAt,
      repository: item.repository,
    }));
  const pullRequests = contributionsCollection.pullRequestContributions.nodes
    .map((item) => ({
      occurredAt: item.occurredAt,
      title: item.pullRequest.title,
      url: item.pullRequest.url,
      repository: item.pullRequest.repository,
      additions: item.pullRequest.additions,
      deletions: item.pullRequest.deletions,
      changedFiles: item.pullRequest.changedFiles,
      commentCount: item.pullRequest.comments.totalCount,
      merged: item.pullRequest.merged,
      mergedAt: item.pullRequest.mergedAt,
    }))
    .sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
    );

  return {
    username: options.username,
    from: options.from,
    to: options.to,
    month: getMonthLabel(options.monthDate),
    total: calendar.totalContributions,
    days: calendar.weeks.flatMap((week) => week.contributionDays),
    activity: {
      commits: {
        total: totalCommits,
        repositories: commitRepositories,
      },
      repositoriesCreated: {
        total: contributionsCollection.repositoryContributions.totalCount,
        repositories: repositoriesCreated,
      },
      pullRequests: {
        total: contributionsCollection.pullRequestContributions.totalCount,
        items: pullRequests,
      },
    },
  };
}

export async function getGitHubMonthlyContributions({
  token,
  username,
  year,
  month,
}: GetMonthlyContributionsOptions) {
  const { from, to } = getMonthRange(year, month);
  const monthDate = new Date(from);
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getMonthlyContributionsQuery(),
      variables: { username, from, to },
    }),
    next: { revalidate: 60 * 60 },
  });

  const payload = (await response.json()) as GitHubContributionsResponse;

  if (!response.ok || payload.errors?.length) {
    throw new GitHubMonthlyContributionsError(
      'Failed to fetch GitHub contributions.',
      response.ok ? 500 : response.status,
      payload.errors,
    );
  }

  return normalizeContributions(payload, {
    token,
    username,
    year,
    month,
    from,
    to,
    monthDate,
  });
}
