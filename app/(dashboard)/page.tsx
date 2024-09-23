'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState, useRef } from 'react';

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [skus, setSkus] = useState<string[]>([]);
  const fileInputRef = useRef(null);

  const handleClickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Imagen seleccionada:', file.name);
    }

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch('http://10.0.7.212:5000/image', {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Error al obtener la imagen');
        }

        const data = await response.json();
        setImageSrc(data.img);
        setSkus(data.skus);
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Tabs defaultValue="all">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Pallets</CardTitle>
          <CardDescription className="text-lg">
            Agrega una imagen para poder validar el orden más óptimo de los
            SKU's.
          </CardDescription>
          <div>
            <Button
              onClick={handleClickImage}
              size="sm"
              className="h-10 mt-2 gap-2 w-min"
            >
              {!isLoading && <PlusCircle className="h-5 w-5" />}
              {isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
              <span className=" text-base">Agregar imagen</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </CardHeader>
      </Card>
      <TabsContent value="all">
        {skus.length > 0 && (
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Lista de SKU's identificados:
                </CardTitle>
                <ul className="list-disc ml-4 mt-2">
                  {skus.map((sku, index) => (
                    <CardDescription className="text-lg" key={index}>
                      {'- ' + capitalizeFirstLetter(sku)}
                    </CardDescription>
                  ))}
                </ul>
              </CardHeader>
            </Card>
          </div>
        )}
        {imageSrc && (
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Imagen recibida:</CardTitle>
                <img
                  src={`data:image/png;base64,${imageSrc}`}
                  alt="Generada por la API"
                  className="w-full h-auto mt-2"
                  style={{ maxWidth: '800px', width: '100%' }}
                />
              </CardHeader>
            </Card>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
