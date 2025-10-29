import AuthAvatar from '../(auth)/AuthAvatar';
import AuthRedirect from './components/AuthRedirect';
import LandingPageContent from './components/LandingPageContent';

export default function LandingPage() {
  return (
    <>
      <AuthRedirect />
      <AuthAvatar />
      <LandingPageContent />
    </>
  );
}
