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

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1]; // Eliminar la parte 'data:image/png;base64,'

        if (base64data) {
          setIsLoading(true);

          try {
            const response = await fetch('http://10.0.7.212:5000/image/body', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ img: base64data })
            });

            if (!response.ok) {
              throw new Error('Error al procesar la imagen');
            }

            const data = await response.json();
            setImageSrc(data.img);
            setSkus(data.skus);
          } catch (error) {
            console.error('Error fetching image:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const groupSKUs = (skus) => {
    const skuCount = skus.reduce((acc, sku) => {
      acc[sku] = (acc[sku] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(skuCount).map(([sku, count]) => `${sku} x${count}`);
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
                  {groupSKUs(skus).map((sku, index) => (
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
                <CardTitle className="text-2xl">Imagen procesada:</CardTitle>
                <img
                  src={`data:image/png;base64,${imageSrc}`}
                  alt="Generada por la API"
                  className="w-full h-auto mt-2"
                  style={{ maxWidth: '1200px', width: '100%' }}
                />
              </CardHeader>
            </Card>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
