export const mockedState = {
	user: {
		isAuth: true,
		name: 'admin',
		role: 'admin',
		token: 'some text token',
	},
	courses: {
		coursesInfo: [
			{
				title: 'Angular JS',
				description:
					'this is great course for everyone who already knows basics of  JS',
				duration: 125,
				authors: [
					'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
					'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
				],
				creationDate: '11/01/2022',
				id: '48c2dcc6-c146-47b5-8773-8fa132dd242d',
			},
		],
	},
	authors: {
		authorsInfo: [
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
			{
				name: 'author4',
				id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			},
			{
				name: 'author5',
				id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
			},
			{
				name: 'author6',
				id: '9987de6a-b475-484a-b885-622b8fb88bda',
			},
		],
	},
};

export const mockedEmptyCourseState = {
	user: {
		isAuth: true,
		name: 'admin',
		role: 'admin',
		token: 'some text token',
	},
	courses: {
		coursesInfo: [],
	},
	authors: {
		authorsInfo: [],
	},
};

export const mockedErrorCourseState = {
	user: {
		isAuth: true,
		name: 'admin',
		role: 'admin',
		token: 'some text token',
	},
	courses: {
		coursesInfo: [],
		errorMessage:
			'Please, contact your support team, the service is not available now',
	},
	authors: {
		authorsInfo: [],
	},
};
