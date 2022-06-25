import {JobRepository} from '../types/JobRepository';

export const prepareEnvRepos = (): null | JobRepository[] => {
	const newRepos = process.env.REPOSITORIES
		? process.env.REPOSITORIES.split(',')
		: [];

	if (!newRepos || newRepos.length === 0) {
		return null;
	}

	const repositories = newRepos.map(repo => {
		const [name, opportunitiesName] = repo.split(':');

		if (!name || !opportunitiesName) {
			throw new Error(`Invalid repository: ${repo}`);
		}

		return {name, opportunitiesName};
	});

	return repositories;
};
