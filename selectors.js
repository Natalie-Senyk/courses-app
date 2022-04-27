// courses
export const getAllCourses = (state) => state.courses.coursesInfo;
export const getSingleCourse = (state) => state.courses.coursesInfo[0];

//authors
export const getAllAuthors = (state) => state.authors.authorsInfo;

// users
export const getUserToken = (state) => state.user.token;
export const getUserName = (state) => state.user.name;
export const getUserRole = (state) => state.user.role;
export const getUserAuthStatus = (state) => state.user.isAuth;
export const getUserErrorMessage = (state) => state.user.errorMessage;
export const getAuthorsErrorMessage = (state) => state.authors.errorMessage;
export const getCoursesErrorMessage = (state) => state.courses.errorMessage;
