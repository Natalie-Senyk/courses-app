import { useState } from 'react';
import PropTypes from 'prop-types';

const useForm = ({ onSubmit, initialValues, validate }) => {
	const [values, setValues] = useState(initialValues);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) =>
		setValues({ ...values, [e.target.name]: e.target.value });

	const setValue = (name, value) => setValues({ ...values, [name]: value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			validate && validate(values);
			await onSubmit(values);
			setValues(initialValues);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return {
		errorMessage,
		setErrorMessage,
		values,
		setValues,
		setValue,
		handleChange,
		handleSubmit,
	};
};

useForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
	validate: PropTypes.func,
};

export default useForm;
