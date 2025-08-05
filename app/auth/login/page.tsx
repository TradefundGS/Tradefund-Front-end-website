import LoginForm from '@/components/Auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
    <div className="flex items-center justify-center bg-gray-100 bg-[url('/hero.png')] bg-cover bg-no-repeat bg-center" style={{ minHeight: 'calc(100vh - 6rem)' }}>
      <div className="md:flex md:flex-1 items-center justify-center bg-cover bg-center" >
        <div className="">
          
        </div>
      </div>
      <div className="md:flex md:flex-1 items-center justify-center bg-transparent">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  </>
  
  );
}
