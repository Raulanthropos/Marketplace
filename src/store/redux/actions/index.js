export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"
export const SET_USER = "SET_USER"

const baseUrl = process.env.REACT_APP_API_URL;

export const setAccessToken = (token) => ({
    type: SET_ACCESS_TOKEN,
    payload: token
})
export const setIsLoggedIn = (value) => ({
    type: SET_IS_LOGGED_IN,
    payload: value
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("This is data", data)
            dispatch(setAccessToken(data.accessToken));
            dispatch(setIsLoggedIn(true));
            dispatch(setUser(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setAccessToken(data.accessToken));
            dispatch(setIsLoggedIn(true));
            dispatch(setUser(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const logout = () => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/users/logout`, {
            method: "POST",
        });
        if (response.ok) {
            dispatch(setIsLoggedIn(false));
            localStorage.setItem('accessToken', null);
            localStorage.setItem('user', JSON.stringify(null));
            window.location.reload();
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};