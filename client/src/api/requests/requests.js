import axios from '../../utils/axios'
import * as url from "../urls";

/*
responseCB (Response Callback) => It is the function that is run when a response is received from the endpoint.
loadingCB (Loading Callback) => Handles a loading state if the calling party has a loading state
*/

// Login with username and password
export const loginUser = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.LOGIN_USER, data)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(true)
            return null
        })
}

// Register a user
export const registerUser = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.REGISTER_USER, data)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(true)
            return null
        })
}

// Get all tweets
export const getHome = (responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .get(url.GET_HOME)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            return null
        })
}

// Get user informations
export const getUser = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .get(url.GET_USER, {
            params: data
        })
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            return null
        })
}

// Get tweets of specified user
export const getTweets = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .get(url.GET_TWEETS, {
            params: data
        })
        .then(response => {
            if (responseCB) responseCB(response.data)
            if (loadingCB) loadingCB(false)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            return null
        })
}

// Send a tweet 
export const createTweet = ({ data, token }, responseCB) => {
    return axios
        .post(url.CREATE_TWEET, data, token)
        .then(response => {
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            return null
        })
}

// Follow/Unfollow a user
export const followUser = ({ data, token }, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.FOLLOW_MANAGER, data, token)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            return null
        })
}