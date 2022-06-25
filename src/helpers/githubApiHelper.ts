import axios from 'axios';

export const githubApiHelper = () => {
	const accessToken = process.env.GITHUB_ACCESS_TOKEN;

	if (!accessToken) {
		throw new Error('GITHUB_ACCESS_TOKEN is not defined on .env file');
	}

	const githubApi = axios.create({
		baseURL: 'https://api.github.com',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			accept: 'application/vnd.github.v3+json',
		},
	});

	return githubApi;
};
