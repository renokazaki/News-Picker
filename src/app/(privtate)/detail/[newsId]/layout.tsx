import DetailHeader from './components/Header';

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DetailHeader />
      {children}
    </>
  );
}
