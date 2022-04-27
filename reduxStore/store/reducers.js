import { combineReducers } from 'redux';

import { authorsReducer } from '../authors/reducer';
import { coursesReducer } from '../courses/reducer';
import { userReducer } from '../user/reducer';

const reducers = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: userReducer,
});

export default reducers;
