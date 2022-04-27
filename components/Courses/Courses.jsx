import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Button, CircularProgress } from '@material-ui/core';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import useStyles from './styles.js';
import { useCourses } from '../../customHooks/useCourses';
import { useAuthors } from '../../customHooks/useAuthors';
import { getAuthorNames } from '../../helpers/matchAuhorNames';
import CoursesError from './components/CoursesCustomError/CoursesError';
import useFilteredCourses from '../../customHooks/useFilteredCourses';

const Courses = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const isAdmin = localStorage.getItem('role') === 'admin';
	const { loading, courses, fetchCourses, deleteCourse, errorMessage } =
		useCourses();
	const { fetchAuthors, authors } = useAuthors();
	const {
		handleSearchInputChange,
		searchInput,
		filteredCourses,
		handleSearch,
	} = useFilteredCourses(courses);

	useEffect(() => {
		fetchCourses();
		fetchAuthors();
	}, [fetchCourses, fetchAuthors]);

	const createCourseHandler = () => {
		navigate('/courses/add');
	};

	const deleteCourseHandler = (id) => {
		deleteCourse(id);
	};
	const showCourseInfoHandler = (id) => {
		navigate(`/courses/${id}`);
	};
	const editCourseHandler = (course) => {
		navigate(`/courses/update/${course.id}`, {
			state: {
				title: course.title,
				description: course.description,
				duration: course.duration,
				authors: course.authors,
				id: course.id,
			},
		});
	};

	if (loading) {
		return (
			<div className={classes.centerProgress} data-testid='spinner'>
				<CircularProgress />
			</div>
		);
	}

	if (errorMessage) {
		return <CoursesError errorMessage={errorMessage} />;
	}

	return (
		<>
			<Paper elevation={6} className={classes.searchField}>
				<SearchBar
					value={searchInput}
					onChange={handleSearchInputChange}
					onSearch={handleSearch}
				/>
				{isAdmin && (
					<div>
						<Button
							variant='contained'
							color='primary'
							size='medium'
							onClick={createCourseHandler}
						>
							Add new course
						</Button>
					</div>
				)}
			</Paper>
			{!filteredCourses.length && !loading ? (
				<CoursesError errorMessage='No courses found matching your query' />
			) : (
				<Grid container spacing={3}>
					{filteredCourses.map((course) => (
						<Grid item key={course.id} xs={12} md={6}>
							<CourseCard
								course={course}
								onDelete={() => deleteCourseHandler(course.id)}
								onShowInfo={() => showCourseInfoHandler(course.id)}
								onEdit={() => editCourseHandler(course)}
								authorNames={getAuthorNames(authors, course.authors)}
								isAdmin={isAdmin}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default Courses;
