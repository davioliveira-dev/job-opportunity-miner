import {GithubIssue} from '../types/GithubIssue';
import {JobSeniority} from '../types/JobSeniority';
import {Opportunity} from '../types/Opportunity';

// TODO: adaptar para os repos react-brasil e cangaceiros devels

const requirements = [
	'react',
	'react-native',
	'node',
	'node.js',
	'react native',
	'nodejs',
];

export const formatIssues = (
	issues: GithubIssue[],
	seniorities: JobSeniority,
): Opportunity[] =>
	issues
		.map(issue => ({
			title: issue.title,
			url: issue.html_url,
			labels: issue.labels.map(label => label.name),
		}))
		.filter(
			issue =>
				requirements.some(req =>
					issue.title.toLocaleLowerCase().includes(req),
				) && issue.labels.some(label => seniorities.includes(label)),
		)
		.map(issue => ({title: issue.title, url: issue.url}));
