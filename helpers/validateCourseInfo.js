export const validateCourse = (courseInfo) => {
	if (!courseInfo.authors.length) {
		throw new Error('Add corresponding author!');
	}
	if (parseInt(courseInfo.duration) <= 0) {
		throw new Error('Course duration can not be 0');
	}
	if (!courseInfo.title.trim()) {
		throw new Error('Please, include course title');
	}

	if (courseInfo.description.length < 2) {
		throw new Error('Add longer course description');
	}
};
