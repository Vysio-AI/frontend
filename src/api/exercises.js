const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the exercises API provided by api.vysio.ca

const getExercise = async (id) => {
    fetch(`${BASE_URL}/exercises/${id}`).then(res => res.json());
}

const createExercise = async (params) => {

}

const updateExercise = async () => {

}

const deleteExercise = async () => {

}


module.exports = {
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}