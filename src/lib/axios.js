import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

const userProfile = async () => {
    try {
        const { data } = await axios.get('/api/user')
        console.log('userProfile', data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export {
    axios,
    userProfile
}
