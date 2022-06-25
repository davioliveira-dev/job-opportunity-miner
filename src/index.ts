import 'dotenv/config';
import {getJobIssues} from './services/getJobsIssues';
import {JobRepository} from './types/JobRepository';
import {prepareEnvRepos} from './utils/prepareEnvRepos';
import {prepareEnvSeniority} from './utils/prepareEnvSeniority';

const doYourMagic = async () => {
	const jobRepositories: JobRepository[] = [
		{name: 'frontendbr', opportunitiesName: 'vagas'},
		{name: 'backend-br', opportunitiesName: 'vagas'},
		// {name: 'react-brasil', opportunitiesName: 'vagas'},
		// {name: 'CangaceirosDevels', opportunitiesName: 'vagas_de_emprego'},
	];

	const envRepositories = prepareEnvRepos();

	if (envRepositories) {
		jobRepositories.push(...envRepositories);
	}

	const envSeniorities = prepareEnvSeniority();

	const jobs = [];

	for await (const opportunity of jobRepositories.map(jobRepository =>
		getJobIssues(jobRepository, envSeniorities),
	)) {
		jobs.push(...opportunity);
	}

	console.table(jobs);

	return jobs;
};

doYourMagic();
