import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Post } from './Post';

export function PostList({ posts = [] }) {
  if (posts.length === 0) {
    return <p>ไม่พบบทความ</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Fragment key={post.id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    ...Post.propTypes,
    id: PropTypes.number.isRequired
  }))
};