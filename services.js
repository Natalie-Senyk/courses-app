import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });
API.interceptors.request.use((req) => {
	if (localStorage.getItem('token')) {
		req.headers.Authorization = localStorage.getItem('token');
	}
	return req;
});

export const fetchCourses = async () => {
	const response = await API.get(`/courses/all`);
	return response.data.result;
};

export const fetchCourse = async (courseId) => {
	const response = await API.get(`/courses/${courseId}`);
	return response.data.result;
};

export const deleteSelectedCourse = async (courseId) => {
	await API.delete(`/courses/${courseId}`);
};

export const createCourse = async (course) => {
	const response = await API.post(`/courses/add`, course);
	return response.data.result;
};

export const updateSelectedCourse = async (courseInfo, courseId) => {
	const response = await API.put(`/courses/${courseId}`, courseInfo);
	return response.data.result;
};

// authors

export const fetchAuthors = async () => {
	const response = await API.get(`/authors/all`);
	return response.data.result;
};

export const createAuthor = async (author) => {
	const response = await API.post(`/authors/add`, author);
	return response.data.result;
};

// auth

export const handleLogin = async (loginUserData) => {
	const response = await API.post(`/login`, loginUserData);
	return response.data;
};

export const handleRegister = async (registerData) => {
	const response = await API.post(`/register`, registerData);
	return response.data;
};

export const handleLogout = async () => {
	await API.delete(`/logout`);
};

export const handleRoleValidation = async () => {
	const response = await API.get(`/users/me`);
	return response.data.result;
};
