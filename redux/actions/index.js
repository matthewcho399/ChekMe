import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, CLEAR_DATA } from '../constants/index'
import firebase from 'firebase/compat/app'

export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

//must export this because this is the function the frontend will 
//call to trigger database action
export function fetchUser(){
    return ((dispatch) => {
        firebase.firestore()
            .collection("Users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    console.log(snapshot.data())
                    dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else { //user doesn't exist in the database
                    console.log("does not exist")
                }
            })
    })
}

export function fetchUserPosts(){
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data}
                })
                console.log(posts)
                dispatch({type : USER_POSTS_STATE_CHANGE, posts})
            })
    })
}

export function fetchUserFriends(){
    return ((dispatch) => {
        firebase.firestore()
            .collection("friends")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFriends")
            .onSnapshot((snapshot) => {
                let friends = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({type : USER_FRIENDS_STATE_CHANGE, friends});
                for(let i = 0; i < friends.length; i++) {
                    dispatch(fetchUsersData(friends[i]))
                }
            })
    })
}

export function fetchUsersData(uid){
    return((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        if (!found){
            firebase.firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) { 
                    let user = snapshot.data();
                    user.uid = snapshot.id;

                    dispatch({type : USERS_DATA_STATE_CHANGE, user});
                    dispatch(fetchUsersFriendsPosts(user.uid));
                }
                else { //user doesn't exist in the database
                    console.log("does not exist")
                }
            })
        }
    })
}

export function fetchUsersFriendsPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                console.log(snapshot.query)
                const user = getState().usersState.users.find(el => el.uid === uid);

                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data, user }
                })
                dispatch({type : USERS_POSTS_STATE_CHANGE, posts, uid})
                console.log(getState())
            })
    })
} 