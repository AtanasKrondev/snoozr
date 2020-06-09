import * as Yup from 'yup';

export const title = Yup.object().shape({
    title: Yup.string()
        .required('Enter a title')
});
export const description = Yup.object().shape({
    description: Yup.string()
        .min(5, 'Description must be at least 5 symbols')
        .max(480, 'Description must be less than 480 symbols')
});
export const imageURL = Yup.object().shape({
    image: Yup.string()
        .matches('^https?://.*.(jpe?g|png|gif)$', 'Invalid image URL format'),
})
export const userProfile = Yup.object().shape({
    displayName: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 symbols'),
    photoURL: Yup.string()
        .matches('^https?://.*.(jpe?g|png|gif)$', 'Invalid image URL format'),
});
export const userCredentials = Yup.object().shape({
    email: Yup.string()
        .required('E-mail is required')
        .email('Invalid E-mail format'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 symbols'),
});
export const changePassword = Yup.object().shape({
    passwordC: Yup.string()
        .required('Current password is required')
        .min(6, 'Password must be at least 6 symbols'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(6, 'Password must be at least 6 symbols'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
})
export const userSignup = Yup.object().shape({
    displayName: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 symbols'),
    photoURL: Yup.string()
        .matches('^https?://.*.(jpe?g|png|gif)$', 'Invalid image URL format'),
    email: Yup.string()
        .required('E-mail is required')
        .email('Invalid E-mail format'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 symbols'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
})