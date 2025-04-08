import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Blog } from './Blog';

// สร้าง query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // ไม่ต้องดึงข้อมูลใหม่เมื่อกลับมาที่หน้าต่าง
      staleTime: 1000 * 60 * 5, // ถือว่าข้อมูลยังใหม่อยู่เป็นเวลา 5 นาที
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Blog />
      </div>
    </QueryClientProvider>
  );
}