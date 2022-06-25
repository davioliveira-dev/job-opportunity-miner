export type GithubIssue = {
	id: number;
	node_id: string;
	url: string;
	repository_url: string;
	labels_url: string;
	comments_url: string;
	events_url: string;
	html_url: string;
	number: number;
	state: string;
	title: string;
	body: string;
	labels: Label[];
	locked: boolean;
	active_lock_reason: string;
	comments: number;
	closed_at?: any;
	created_at: Date;
	updated_at: Date;
	author_association: string;
};

type Label = {
	id: number;
	node_id: string;
	url: string;
	name: string;
	description: string;
	color: string;
	default: boolean;
};
