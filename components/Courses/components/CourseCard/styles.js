import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'stretch',
		borderRadius: '1rem',
		height: '100%',
		position: 'relative',
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
		height: '100%',
	},
	cardText: {
		display: 'flex',
		flexDirection: 'column',
		flexBasis: '65%',
		paddingRight: '1rem',
	},
	cardImage: {
		paddingTop: '36.25%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		backgroundBlendMode: 'darken',
	},
}));
