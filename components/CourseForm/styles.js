import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
	const theme = useTheme();
	return {
		root: {
			'& .MuiTextField-root': {
				margin: theme.spacing(1),
			},
		},
		paper: {
			padding: theme.spacing(2),
			margin: theme.spacing(1),
			display: 'flex',
			flexDirection: 'column',
		},
		courseCreationFields: {
			width: '60%',
		},
		authorCreationFields: {
			width: '40%',
		},
		createCourseForm: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		createAuthorBtn: {
			textAlign: 'center',
		},
		createCourseBtn: {
			textAlign: 'center',
			marginTop: '1rem',
		},
		authorAddBtn: {
			display: 'flex',
			justifyContent: 'space-between',
			margin: theme.spacing(1),
		},
		errorMessage: {
			color: theme.palette.error.main,
			border: theme.palette.error.light,
			padding: '1rem',
			marginTop: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			createCourseForm: {
				flexDirection: 'column',
			},
			courseCreationFields: {
				width: '100%',
			},
			authorCreationFields: {
				width: '100%',
			},
		},
	};
});

export default useStyles;
