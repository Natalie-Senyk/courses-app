import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const useFilteredCourses = (courses) => {
	const [searchInput, setSearchInput] = useState('');
	const [filteredCourses, setFilteredCourses] = useState([]);

	useEffect(() => {
		if (!searchInput.trim()) setFilteredCourses(courses);
	}, [courses, searchInput]);

	const handleSearchInputChange = (value) => {
		setSearchInput(value);
	};

	const handleSearch = () => {
		if (searchInput.trim()) {
			const updatedFilteredCourses = courses.filter(
				(course) =>
					course.title.toLowerCase().match(searchInput.toLowerCase()) ||
					course.id.match(searchInput)
			);
			setFilteredCourses(updatedFilteredCourses);
		}
	};

	return {
		filteredCourses,
		searchInput,
		handleSearchInputChange,
		handleSearch,
	};
};

useFilteredCourses.propTypes = {
	courses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default useFilteredCourses;
