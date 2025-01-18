import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
// import { CreditCard, CheckCircle2, XCircle } from 'lucide-react';

interface MembershipFormProps {
  onMembershipChange: (isMember: boolean) => void;
  onValidationChange: (
    isValid: boolean,
    memberData?: { id: string; name: string }
  ) => void;
}

const MembershipForm = ({
  onMembershipChange,
  onValidationChange,
}: MembershipFormProps) => {
  const [isMember, setIsMember] = useState(false);
  const [isMemberCorrect, setIsMemberCorrect] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [currentMember, setCurrentMember] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const memberData = [
    {
      id: '123',
      name: 'John Doe',
    },
    {
      id: '456',
      name: 'Jane Doe',
    },
  ];

  const handleMembershipChange = (checked: boolean) => {
    setIsMember(checked);
    onMembershipChange(checked);
    if (!checked) {
      setIsMemberCorrect(false);
      setCardNumber('');
      setCurrentMember(null);
      onValidationChange(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCardNumber = e.target.value.trim();
    setCardNumber(newCardNumber);
    checkCardNumber(newCardNumber);
  };

  const checkCardNumber = (cardNumber: string) => {
    const member = memberData.find((member) => member.id === cardNumber);
    const isValid = !!member;
    setIsMemberCorrect(isValid);
    setCurrentMember(member || null);
    onValidationChange(isValid, member);
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          {/* <CreditCard className='h-5 w-5' /> */}
          <span>Membership Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='membership'
            checked={isMember}
            onCheckedChange={handleMembershipChange}
            className='h-5 w-5'
          />
          <Label
            htmlFor='membership'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            I am a member
          </Label>
        </div>

        {isMember && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='card-number' className='text-sm font-medium'>
                Membership Card Number
              </Label>
              <Input
                id='card-number'
                value={cardNumber}
                placeholder='Enter your membership card number (e.g., 123)'
                className={`w-full ${
                  cardNumber &&
                  (isMemberCorrect ? 'border-green-500' : 'border-red-500')
                }`}
                onChange={handleCardNumberChange}
              />
            </div>

            {cardNumber && (
              <Alert className={isMemberCorrect ? 'bg-green-50' : 'bg-red-50'}>
                <div className='flex items-center space-x-2'>
                  {isMemberCorrect ? (
                    <>
                      {/* <CheckCircle2 className='h-5 w-5 text-green-500' /> */}
                      <AlertDescription className='text-green-700'>
                        Welcome back, {currentMember?.name}!
                      </AlertDescription>
                    </>
                  ) : (
                    <>
                      {/* <XCircle className='h-5 w-5 text-red-500' /> */}
                      <AlertDescription className='text-red-700'>
                        Invalid membership number. Please try again.
                      </AlertDescription>
                    </>
                  )}
                </div>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MembershipForm;
