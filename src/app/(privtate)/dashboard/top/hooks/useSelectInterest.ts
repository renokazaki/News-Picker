import { selectedInterestAtom } from '@/store';
import { useAtom } from 'jotai';

export const useSelectInterest = () => {
  const [selectedInterest, setSelectedInterest] = useAtom(selectedInterestAtom);

  const handleInterestClick = (interest: string) => {
    setSelectedInterest(selectedInterest === interest ? undefined : interest);
  };

  return { selectedInterest, handleInterestClick };
};
