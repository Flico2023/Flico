import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().required('Name field is required'),
    surname: yup.string().required('Surname field is required'),
    email: yup.string().email('Please enter a valid email address').required('Email field is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password field is required'),
});

export const registerDefault = {
    name: '',
    surname: '',
    email: '',
    password: '',
};