'use client';

import { Button } from '@/components/ui/button';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function GuestLogin() {
  const { signIn, setActive } = useSignIn();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleGuestLogin = async () => {
    if (!signIn) return;
    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: 'testuser',
          password: 'TESTuser',
        });
        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Guest login failed:', error);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleGuestLogin}
      className="cursor-pointer rounded-full bg-green-500 text-white hover:bg-green-600"
    >
      {isPending ? 'ログイン中...' : 'ゲストログイン'}
    </Button>
  );
}
