import { Button } from '@heroui/button';
import { IconType } from 'react-icons';

interface OAuthButtonProps {
  icon: IconType;
  onClick: () => void;
}

const OAuthButtons: React.FC<OAuthButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <Button type="button" variant="bordered" fullWidth onPress={onClick}>
      <Icon />
    </Button>
  );
};

export default OAuthButtons;
