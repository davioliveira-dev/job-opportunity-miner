import {JobSeniority} from '../types/JobSeniority';

export const prepareEnvSeniority = (): JobSeniority => {
	const envSeniority = process.env.SENIORITY;

	if (!envSeniority) {
		return 'Junior';
	}

	const seniorities = envSeniority
		.split(',')
		.map(seniority => seniority.charAt(0).toUpperCase() + seniority.slice(1))
		.join(',');

	return seniorities;
};
