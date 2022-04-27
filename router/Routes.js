import CourseForm from '../components/CourseForm/CourseForm';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import Courses from '../components/Courses/Courses';
import Login from '../components/Login/Login';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import Registration from '../components/Registration/Registration';

export const ROUTES = [
	{ path: '/', Component: Courses, isPrivate: true, isAdmin: false },
	{ path: 'courses', Component: Courses, isPrivate: true, isAdmin: false },
	{
		path: 'courses/:courseId',
		Component: CourseInfo,
		isPrivate: true,
		isAdmin: false,
	},
	{
		path: 'courses/add',
		Component: CourseForm,
		isPrivate: true,
		isAdmin: true,
	},
	{
		path: 'courses/update/:courseId',
		Component: CourseForm,
		isPrivate: true,
		isAdmin: true,
	},
	{
		path: 'register',
		Component: Registration,
		isPrivate: false,
		isAdmin: false,
	},
	{
		path: 'login',
		Component: Login,
		isPrivate: false,
		isAdmin: false,
	},
	{
		path: '*',
		Component: PageNotFound,
		isPrivate: false,
		isAdmin: false,
	},
];
