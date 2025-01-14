import { Input } from '@/components/ui/input';

interface MembershipInputProps {
  onChange: (value: string) => void;
}

export function MembershipInput({ onChange }: MembershipInputProps) {
  return (
    <div>
      <h5>Membership</h5>
      <Input
        placeholder='Enter membership card number'
        onChange={(e) => onChange(e.target.value.trim())}
      />
    </div>
  );
}
