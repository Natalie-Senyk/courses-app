import { Container } from '@material-ui/core';

import Header from './components/Header/Header';
import Router from './router/Router';

function App() {
	return (
		<Container maxWidth='lg'>
			<Header />
			<Router />
		</Container>
	);
}

export default App;
