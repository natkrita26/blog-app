import PropTypes from 'prop-types';

export function PostFilter({ field, value, onChange }) {
  return (
    <div className="post-filter">
      <label htmlFor={`filter-${field}`}>ค้นหาตาม{field}: </label>
      <input
        type="text"
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`ค้นหาตาม${field}...`}
      />
    </div>
  );
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};