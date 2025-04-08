import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from './api/posts';
import { CreatePost } from './components/CreatePost';
import { PostFilter } from './components/PostFilter';
import { PostSorting } from './components/PostSorting';
import { PostList } from './components/PostList';

export function Blog() {
  // สร้าง state สำหรับการกรองและการเรียงลำดับ
  const [author, setAuthor] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('descending');
  
  // เรียกใช้ useQuery hook เพื่อดึงข้อมูลโพสต์
  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });
  
  // ดึงข้อมูลโพสต์จาก query result
  const posts = postsQuery.data || [];
  
  return (
    <div className="blog">
      <h1>บล็อกของฉัน</h1>
      
      <CreatePost />
      
      <hr />
      
      <div className="filter-sort-container">
        <h2>โพสต์ทั้งหมด</h2>
        
        <PostFilter
          field="author"
          value={author}
          onChange={(value) => setAuthor(value)}
        />
        
        <PostSorting
          fields={['createdAt', 'updatedAt', 'title', 'author']}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          orderValue={sortOrder}
          onOrderChange={(value) => setSortOrder(value)}
        />
      </div>
      
      {/* แสดงสถานะการโหลด */}
      {postsQuery.isLoading ? (
        <div>กำลังโหลดโพสต์...</div>
      ) : postsQuery.isError ? (
        <div>เกิดข้อผิดพลาด: {postsQuery.error.message}</div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}