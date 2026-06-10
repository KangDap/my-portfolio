import {
  GitHubMonthlyContributionsError,
  getGitHubMonthlyContributions,
} from '@/lib/github/monthly-contributions';

function parseMonthParam(value: string | null) {
  if (!value) return undefined;

  const month = Number(value);

  return Number.isInteger(month) && month >= 1 && month <= 12
    ? month
    : undefined;
}

function parseYearParam(value: string | null) {
  if (!value) return undefined;

  const year = Number(value);

  return Number.isInteger(year) && year >= 2008 ? year : undefined;
}

export async function GET(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return Response.json(
      { error: 'GitHub integration is not configured.' },
      { status: 503 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const year = parseYearParam(searchParams.get('year'));
    const month = parseMonthParam(searchParams.get('month'));
    const contributions = await getGitHubMonthlyContributions({
      token,
      username,
      year,
      month,
    });

    return Response.json(contributions);
  } catch (error) {
    if (error instanceof GitHubMonthlyContributionsError) {
      return Response.json(
        { error: error.message, details: error.details },
        { status: error.status },
      );
    }

    return Response.json(
      { error: 'Unexpected GitHub integration error.' },
      { status: 500 },
    );
  }
}
