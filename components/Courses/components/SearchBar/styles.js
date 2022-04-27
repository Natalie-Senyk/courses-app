import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	root: {
		'& .MuiTextField-root': {
			margin: '1rem',
		},
	},
	form: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '75%',
	},
	searchBtn: {
		margin: '10px 0',
	},
}));
