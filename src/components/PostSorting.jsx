import PropTypes from 'prop-types';

// แปลงชื่อฟิลด์เป็นภาษาไทย
const fieldNames = {
  createdAt: 'วันที่สร้าง',
  updatedAt: 'วันที่แก้ไข',
  title: 'ชื่อเรื่อง',
  author: 'ผู้เขียน'
};

export function PostSorting({ fields = [], value, onChange, orderValue, onOrderChange }) {
  return (
    <div className="post-sorting">
      <label htmlFor="sortBy">เรียงตาม: </label>
      <select
        name="sortBy"
        id="sortBy"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {fieldNames[field] || field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor="sortOrder">ลำดับ: </label>
      <select
        name="sortOrder"
        id="sortOrder"
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="ascending">จากน้อยไปมาก</option>
        <option value="descending">จากมากไปน้อย</option>
      </select>
    </div>
  );
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired
};