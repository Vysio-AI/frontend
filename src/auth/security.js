let getAccessTokenSilently = null;

export const sec = {
    getAccessTokenSilently: () => getAccessTokenSilently,
    setAccessTokenSilently: (func) => (getAccessTokenSilently = func)
};