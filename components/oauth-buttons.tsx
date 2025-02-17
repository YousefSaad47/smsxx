import { Button } from '@heroui/button';
import { IconType } from 'react-icons';
import { TbLoader2 } from 'react-icons/tb';

interface OAuthButtonProps {
  icon: IconType;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const OAuthButtons: React.FC<OAuthButtonProps> = ({
  icon: Icon,
  onClick,
  isLoading,
  disabled,
}) => {
  return (
    <Button
      type="button"
      variant="bordered"
      fullWidth
      onPress={onClick}
      disabled={disabled}
    >
      {isLoading ? <TbLoader2 className="animate-spin" /> : <Icon />}
    </Button>
  );
};

export default OAuthButtons;
