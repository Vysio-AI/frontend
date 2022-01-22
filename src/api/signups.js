// Module for interacting with the signup API provided by api.vysio.ca

const signupPractitioner = (id) => {
    fetch(`${BASE_URL}/exercises/${id}`)
        .then(res => res.json()).data
}

const signupClient = (sessionId) => {

}

const getSignupStatus = () => {

}

module.exports = {
    signupPractitioner,
    signupClient,
    getSignupStatus
}