import PropTypes from 'prop-types';

export function Post({ title, contents, author, createdAt }) {
  // แปลงวันที่เป็นรูปแบบไทย
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null;

  return (
    <article className="post">
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          เขียนโดย <strong>{author}</strong>
          {formattedDate && <> • {formattedDate}</>}
        </em>
      )}
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.string
};