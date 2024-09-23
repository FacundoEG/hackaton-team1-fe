import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  return (
    <Tabs defaultValue="all">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Pallets</CardTitle>
          <CardDescription className="text-lg">
            Agrega una imagen para poder validar el orden mas optimo de los
            SKU's.
          </CardDescription>
          <div>
            <Button size="sm" className="h-10 mt-2 gap-2 w-min">
              <PlusCircle className="h-5 w-5" />
              <span className=" text-base">Agregar imagen</span>
            </Button>
          </div>
        </CardHeader>
      </Card>
      <TabsContent value="all"></TabsContent>
    </Tabs>
  );
}
