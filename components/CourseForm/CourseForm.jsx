import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { formatDurationTime } from '../../helpers/pipeDuration.js';
import {
	filterAuthorsWhenRemoved,
	filterAuthorsWhenSelected,
} from '../../reduxStore/authors/actionCreators.js';
import { saveAuthor } from '../../reduxStore/authors/thunk.js';
import { saveCourse, updateCourse } from '../../reduxStore/courses/thunk.js';
import {
	getMatchedAuthors,
	getUnMatchedAuthors,
} from '../../helpers/matchAuhorNames.js';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage.jsx';
import { validateCourse } from '../../helpers/validateCourseInfo';
import useStyles from './styles.js';
import useForm from '../../customHooks/useForm.jsx';
import { validateAuthor } from '../../helpers/validateAuthorInfo.js';
import { useAuthors } from '../../customHooks/useAuthors.jsx';

const CourseForm = () => {
	const [authorName, setAuthorName] = useState('');

	const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const courseToBeUpdated = location.state;
	const updatingCourse = location.pathname.includes('update');
	const { courseId } = useParams();
	const { authors } = useAuthors();
	const initialCourseInfo = updatingCourse
		? courseToBeUpdated
		: {
				title: '',
				description: '',
				duration: 0,
				authors: [],
		  };

	const [selectedCourseAuthorNames, setSelectedCourseAuthorNames] = useState(
		updatingCourse ? getMatchedAuthors(authors, courseToBeUpdated.authors) : []
	);
	const {
		errorMessage,
		setErrorMessage,
		values: courseInfo,
		setValues: setCourseInfo,
		setValue,
		handleChange: handleCourseInfoChange,
		handleSubmit: handleCourseSubmit,
	} = useForm({
		onSubmit: onSubmitHandler,
		initialValues: initialCourseInfo,
		validate: validateCourse,
	});

	const handleDurationChange = (e) =>
		setValue('duration', e.target.value && parseInt(e.target.value));

	const authorNameHandler = (e) => {
		setAuthorName(e.target.value);
	};

	const createAuthorHandler = () => {
		try {
			validateAuthor(authorName);
			dispatch(saveAuthor({ name: authorName }));
			setAuthorName('');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const addAuthorHandler = (authorId) => {
		setCourseInfo((prevCourseInfo) => ({
			...prevCourseInfo,
			authors: [...prevCourseInfo.authors, authorId],
		}));

		setSelectedCourseAuthorNames((prevValue) => [
			...prevValue,
			...authors.filter((author) => author.id.match(authorId)),
		]);

		dispatch(filterAuthorsWhenSelected(authorId));
	};

	const removeAuthorHandler = (authorSelected) => {
		setCourseInfo((prevCourseInfo) => ({
			...prevCourseInfo,
			authors: prevCourseInfo.authors.filter(
				(authorId) => authorId !== authorSelected.id
			),
		}));
		setSelectedCourseAuthorNames(
			selectedCourseAuthorNames.filter(
				(author) => author.id !== authorSelected.id
			)
		);
		!updatingCourse && dispatch(filterAuthorsWhenRemoved(authorSelected));
	};

	//based on new course creation or updating existing one
	let authorsToDisplay = updatingCourse
		? getUnMatchedAuthors(authors, courseInfo.authors)
		: authors;

	function onSubmitHandler(courseInfo) {
		try {
			updatingCourse
				? dispatch(updateCourse(courseInfo, courseId))
				: dispatch(saveCourse(courseInfo));
			navigate('/courses');
		} catch (error) {
			setErrorMessage(error.message);
		}
	}

	return (
		<form
			autoComplete='off'
			noValidate
			className={`${classes.createCourseForm} ${classes.root}`}
			onSubmit={handleCourseSubmit}
		>
			<div className={classes.courseCreationFields}>
				<Paper elevation={6} className={classes.paper}>
					<TextField
						type='text'
						label='title'
						variant='outlined'
						value={courseInfo.title}
						name='title'
						onChange={handleCourseInfoChange}
						required
					/>
					<TextField
						type='description'
						multiline
						rows={5}
						label='description'
						variant='outlined'
						min={2}
						value={courseInfo.description}
						name='description'
						onChange={handleCourseInfoChange}
						required
					/>
				</Paper>
				<Paper elevation={6} className={classes.paper}>
					<Typography variant='h5'>Add author</Typography>
					<TextField
						type='text'
						label='Enter author name...'
						placeholder='Author name'
						variant='outlined'
						name='name'
						value={authorName}
						onChange={authorNameHandler}
					/>
					<div className={classes.createAuthorBtn}>
						<Button
							variant='contained'
							size='medium'
							color='primary'
							onClick={createAuthorHandler}
						>
							Create author
						</Button>
					</div>
					<Typography variant='h5'>Duration</Typography>
					<TextField
						type='number'
						label='Enter duration in minutes...'
						variant='outlined'
						value={courseInfo.duration}
						name='duration'
						onChange={handleDurationChange}
						required
					/>
					<Typography variant='h4'>
						Duration {formatDurationTime(courseInfo.duration)}
					</Typography>
				</Paper>
			</div>
			<div className={classes.authorCreationFields}>
				<Paper elevation={6} className={classes.paper}>
					<Typography variant='h5'>Authors</Typography>
					{authorsToDisplay.map((author) => (
						<div
							data-testid='author'
							className={classes.authorAddBtn}
							key={author.id}
						>
							<Typography variant='subtitle1'>{author.name}</Typography>
							<Button
								variant='outlined'
								color='primary'
								onClick={() => addAuthorHandler(author.id)}
							>
								Add author
							</Button>
						</div>
					))}
					<Typography variant='h5'>Course authors</Typography>
					{selectedCourseAuthorNames.length > 0 &&
						selectedCourseAuthorNames.map((author) => (
							<div
								className={classes.authorAddBtn}
								key={author.id}
								data-testid='selectedAuthors'
							>
								<Typography variant='subtitle1'>{author.name}</Typography>
								<Button
									variant='outlined'
									color='primary'
									onClick={() => removeAuthorHandler(author)}
								>
									Delete author
								</Button>
							</div>
						))}
				</Paper>
				<div className={classes.createCourseBtn}>
					<Button
						variant='contained'
						color='primary'
						size='large'
						type='submit'
					>
						{updatingCourse ? 'Update course' : 'Create course'}
					</Button>
				</div>
				{errorMessage && <ErrorMessage errorMessage={errorMessage} />}
			</div>
		</form>
	);
};

export default CourseForm;
