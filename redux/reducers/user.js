import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, CLEAR_DATA } from "../constants"

const initialState = {
    currentUser: null,
    posts: [],
    friends: []
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts
            }
        case USER_FRIENDS_STATE_CHANGE:
            return {
                ...state,
                friends: action.friends
            }
        case CLEAR_DATA:
            return {
                currentUser: null,
                posts: [],
                friends: []
            }
        default:
            return state;
    }
}