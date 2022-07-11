import axios from 'axios';
import { logoutAction } from '../store/actions/userAction';
import store from '../store/store';

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
    baseURL: `http://localhost:8080/api`,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Step-2: Create request, response & error handlers
const RequestHandler = request => {
    const setAuthorization = () => {
        const { userLogin: { userInfo } } = store.getState();
        if (userInfo) request.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    if (request.url.includes('/user')) {
        setAuthorization();
    }

    return request;
};

const ResponseHandler = response => {
    return response;
};

const ErrorHandler = async error => {
    if (error.response && error.response.status === 401) {
        if (localStorage.getItem("username") !== null) {
            store.dispatch(logoutAction());
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
    (request) => RequestHandler(request),
    (error) => ErrorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => ResponseHandler(response),
    (error) => ErrorHandler(error)
);


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;
