import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

export default makeStyles(() => {
	const theme = useTheme();
	return {
		[theme.breakpoints.down('xs')]: {
			searchField: {
				flexDirection: 'column',
			},
		},
		searchField: {
			padding: theme.spacing(2),
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '1rem',
		},
		centerProgress: {
			textAlign: 'center',
		},
	};
});
