import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	[theme.breakpoints.down('xs')]: {
		headerBar: {
			flexDirection: 'column',
			alignItems: 'center',
		},
		headerUserInfo: {
			marginBottom: '1rem',
		},
	},
	headerLogo: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		textDecoration: 'none',
	},
	userName: {
		marginRight: '1rem',
	},
	profileImage: {
		marginRight: '1rem',
	},

	heading: {
		margin: '0 1rem',
	},
}));
