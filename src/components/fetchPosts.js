import {fetchPostsPending, fetchPostsSuccess, fetchPostsError} from '../store/action';

function fetchPosts() {
    return dispatch => {
        dispatch(fetchPostsPending());
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchPostsSuccess(res.posts));
            return res.posts;
        })
        .catch(error => {
            dispatch(fetchPostsError(error));
        })
    }
}

export default fetchPosts;
