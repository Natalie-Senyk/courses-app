import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	errorMessage: {
		color: theme.palette.error.main,
		border: theme.palette.error.main,
		padding: '1rem',
		marginTop: '1rem',
	},
}));
