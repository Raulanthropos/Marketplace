export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"

const baseUrl = process.env.REACT_APP_API_URL;

export const setAccessToken = (token) => ({
    type: SET_ACCESS_TOKEN,
    payload: token
})
export const setIsLoggedIn = (value) => ({
    type: SET_IS_LOGGED_IN,
    payload: value
})

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
            dispatch(setAccessToken(data.accessToken));
            dispatch(setIsLoggedIn(true));
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.log(error.message);
    }
}