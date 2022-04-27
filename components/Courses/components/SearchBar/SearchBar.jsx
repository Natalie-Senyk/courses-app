import React from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles.js';

const SearchBar = ({ value: inputValue, onChange, onSearch }) => {
	const classes = useStyles();

	const handleCourseSearch = (e) => {
		e.preventDefault();
		onSearch();
	};

	return (
		<form
			autoComplete='off'
			className={`${classes.root} ${classes.form}`}
			width='60%'
			onSubmit={handleCourseSearch}
		>
			<TextField
				type='text'
				variant='outlined'
				id='searchField'
				label='Enter course name...'
				fullWidth
				size='small'
				value={inputValue}
				onChange={(e) => onChange(e.target.value)}
			/>
			<div className={classes.searchBtn}>
				<Button
					variant='contained'
					color='secondary'
					size='medium'
					type='submit'
				>
					Search
				</Button>
			</div>
		</form>
	);
};

SearchBar.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
