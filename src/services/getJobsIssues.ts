import {githubApiHelper} from '../helpers/githubApiHelper';
import {GithubIssue} from '../types/GithubIssue';
import {JobRepository} from '../types/JobRepository';
import {JobSeniority} from '../types/JobSeniority';
import {Opportunity} from '../types/Opportunity';
import {formatIssues} from '../utils/formatIssues';

export const getJobIssues = async (
	repository: JobRepository,
	seniorities: JobSeniority,
) => {
	const apiHelper = githubApiHelper();

	const {data: repositories} = await apiHelper.get(
		`/users/${repository.name}/repos`,
	);

	const issuesCount = repositories.filter(
		(repo: {name: string}) => repo.name === repository.opportunitiesName,
	)[0].open_issues_count;

	const opportunities: Opportunity[] = [];
	const pageCount = issuesCount / 100;

	for await (const page of Array.from({length: pageCount}, (_, i) => i + 1)) {
		const {data: issues} = await apiHelper.get<GithubIssue[]>(
			`/repos/${repository.name}/${repository.opportunitiesName}/issues?&per_page=100&page=${page}`,
		);

		if (!issues || issues.length === 0) {
			throw new Error(
				`No job found for this seniority and repository: ${
					repository.name
				}, ${seniorities.toString()}.`,
			);
		}

		opportunities.push(...formatIssues(issues, seniorities));
	}

	console.log(`Found ${opportunities.length} opportunities.`);

	return opportunities;
};
