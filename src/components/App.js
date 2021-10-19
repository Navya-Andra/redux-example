import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchPosts from './fetchPosts';
import {getPostsError, getPosts, getPostsPending} from '../store/reducer';

// import LoadingSpinner from './SomeLoadingSpinner';
// import PostList from './PostList';

class PostView extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentWillMount() {
        const {fetchPosts} = this.props;
        fetchPosts();
    }

    shouldComponentRender() {
        const {pending} = this.props;
        if(this.pending === false) return false;
        // more tests
        return true;
    }

    render() {
        const {posts, error, pending} = this.props;

        if(!this.shouldComponentRender()) return <LoadingSpinner />

        return (
            <div className='post-list-wrapper'>
                {error && <span className='post-list-error'>{error}</span>}
                <PostList posts={posts} />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    error: getPostsError(state),
    products: getPosts(state),
    pending: getPostsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPosts: fetchPostsAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView );
