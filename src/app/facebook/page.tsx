'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

const Facebook = () => {
  const router = useRouter();
  const handleBackBtn = () => {
    router.push('/');
  };
  return (
    <div>
      Facebook
      <div>
        <Button variant="info">Hello Button</Button>
        <button
          onClick={() => {
            handleBackBtn();
          }}
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default Facebook;
