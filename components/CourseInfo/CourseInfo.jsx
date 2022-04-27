import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Link,
	CircularProgress,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { formatDurationTime } from '../../helpers/pipeDuration';
import { defaultImage } from '../../constants.js';
import { formatDate } from '../../helpers/dateGenerator.js';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAuthors, getSingleCourse } from '../../selectors.js';
import { fetchSingleCourse } from '../../reduxStore/courses/thunk.js';
import { getAuthorNames } from '../../helpers/matchAuhorNames.js';
import { fetchAllAuthors } from '../../reduxStore/authors/thunk.js';
import useStyles from './styles.js';

const CourseInfo = () => {
	const [loadingProgress, setLoadingProgress] = useState(true);
	const classes = useStyles();
	const { courseId } = useParams();
	const authors = useSelector(getAllAuthors);
	const selectedCourse = useSelector(getSingleCourse);
	const dispatch = useDispatch();

	useEffect(() => {
		setLoadingProgress(true);
		dispatch(fetchSingleCourse(courseId));
		setLoadingProgress(false);
	}, [courseId, dispatch]);

	useEffect(() => {
		dispatch(fetchAllAuthors);
	}, [dispatch]);

	if (loadingProgress) {
		return (
			<div className={classes.centerProgress}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<Link href='/courses' className={classes.linkBack} variant='subtitle2'>
				<ArrowBackIosIcon fontSize='small' /> Back to all courses
			</Link>
			<Card className={classes.card} elevation={5}>
				<CardMedia
					image={defaultImage}
					title={selectedCourse?.title && selectedCourse.title}
					className={classes.cardImage}
				/>
				<CardContent className={classes.cardContent}>
					<div className={classes.cardText}>
						<Typography variant='h5' gutterBottom>
							{selectedCourse?.title && selectedCourse.title}
						</Typography>
						<Typography variant='body1' component='p'>
							{selectedCourse?.description && selectedCourse.description}
						</Typography>
					</div>
					<div>
						<Typography variant='subtitle1'>
							<strong>Authors: </strong>
							{selectedCourse?.authors?.length &&
								getAuthorNames(authors, selectedCourse.authors)}
						</Typography>
						<Typography variant='subtitle1'>
							<strong>Duration: </strong>
							{selectedCourse?.duration &&
								formatDurationTime(selectedCourse.duration)}
						</Typography>
						<Typography variant='subtitle1'>
							<strong>Created: </strong>
							{selectedCourse?.creationDate &&
								formatDate(selectedCourse.creationDate)}
						</Typography>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default CourseInfo;
