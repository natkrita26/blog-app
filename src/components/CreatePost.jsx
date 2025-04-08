import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

export function CreatePost() {
  // สร้าง state สำหรับเก็บข้อมูลในฟอร์ม
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [contents, setContents] = useState('');
  
  // เรียกใช้ query client เพื่อใช้ในการรีเซตแคช
  const queryClient = useQueryClient();
  
  // สร้าง mutation สำหรับการสร้างโพสต์ใหม่
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => {
      // เมื่อสร้างโพสต์สำเร็จให้ล้างแคชและรีเซตฟอร์ม
      queryClient.invalidateQueries(['posts']);
      setTitle('');
      setAuthor('');
      setContents('');
    }
  });
  
  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };
  
  return (
    <form onSubmit={handleSubmit} className="create-post">
      <h2>สร้างโพสต์ใหม่</h2>
      
      <div className="form-group">
        <label htmlFor="create-title">หัวข้อ: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="create-author">ผู้เขียน: </label>
        <input
          type="text"
          name="create-author"
          id="create-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="create-contents">เนื้อหา: </label>
        <textarea
          id="create-contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          rows="5"
        />
      </div>
      
      <button
        type="submit"
        disabled={!title || createPostMutation.isPending}
      >
        {createPostMutation.isPending ? 'กำลังสร้าง...' : 'สร้างโพสต์'}
      </button>
      
      {createPostMutation.isSuccess && (
        <div className="success-message">สร้างโพสต์สำเร็จ!</div>
      )}
      
      {createPostMutation.isError && (
        <div className="error-message">เกิดข้อผิดพลาด: {createPostMutation.error.message}</div>
      )}
    </form>
  );
}