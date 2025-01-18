import { ShopingCartClient } from '@/components/ShopingCartClient';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <Card className='container mx-auto p-6 space-y-6 mt-10'>
      <ShopingCartClient />
    </Card>
  );
}
