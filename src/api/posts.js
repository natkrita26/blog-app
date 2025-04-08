// สร้างฟังก์ชันสำหรับการดึงข้อมูลโพสต์
export const getPosts = async (queryParams = {}) => {
    // สร้าง URL สำหรับ API request
    const url = `http://localhost:3001/posts?${new URLSearchParams(queryParams)}`;
    
    // เรียกใช้ fetch API เพื่อดึงข้อมูล
    const res = await fetch(url);
    
    // ตรวจสอบว่า request สำเร็จหรือไม่
    if (!res.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลโพสต์ได้');
    }
    
    // แปลงข้อมูล JSON และส่งคืน
    return await res.json();
  };
  
  // สร้างฟังก์ชันสำหรับการสร้างโพสต์ใหม่
  export const createPost = async (post) => {
    // ใส่ timestamp ปัจจุบันให้กับโพสต์
    const now = new Date().toISOString();
    const postWithTimestamps = {
      ...post,
      createdAt: now,
      updatedAt: now
    };
    
    // เรียกใช้ fetch API สำหรับการ POST ข้อมูล
    const res = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postWithTimestamps)
    });
    
    // ตรวจสอบว่า request สำเร็จหรือไม่
    if (!res.ok) {
      throw new Error('ไม่สามารถสร้างโพสต์ใหม่ได้');
    }
    
    // แปลงข้อมูล JSON และส่งคืน
    return await res.json();
  };