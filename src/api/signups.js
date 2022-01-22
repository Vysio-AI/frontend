const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the signup API provided by api.vysio.ca

const signupPractitioner = async (id) => {
    fetch(`${BASE_URL}/exercises/${id}`)
        .then(res => res.json()).data
}

const signupClient = async (sessionId) => {

}

const getSignupStatus = async () => {

}

module.exports = {
    signupPractitioner,
    signupClient,
    getSignupStatus
}