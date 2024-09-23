'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const palletData = {
  total_pallets: 5,
  pallets: [
    {
      pallet_id: 1,
      levels: [
        {
          level: 1,
          products: [
            {
              name: 'Producto A',
              dimensions: { largo: 600, ancho: 400, alto: 200 },
              location: { x: 0, y: 0 }
            },
            {
              name: 'Producto B',
              dimensions: { largo: 600, ancho: 400, alto: 300 },
              location: { x: 600, y: 0 }
            }
          ],
          total_height: 400
        },
        {
          level: 2,
          products: [
            {
              name: 'Producto C',
              dimensions: { largo: 1200, ancho: 900, alto: 300 },
              location: { x: 0, y: 0 }
            }
          ],
          total_height: 300
        }
      ],
      total_pallet_height: 700
    },
    {
      pallet_id: 2,
      levels: [
        {
          level: 1,
          products: [
            {
              name: 'Producto D',
              dimensions: { largo: 1200, ancho: 800, alto: 200 },
              location: { x: 0, y: 0 }
            }
          ],
          total_height: 200
        }
      ],
      total_pallet_height: 200
    },
    {
      pallet_id: 3,
      levels: [
        {
          level: 1,
          products: [
            {
              name: 'Producto E',
              dimensions: { largo: 1000, ancho: 500, alto: 250 },
              location: { x: 0, y: 0 }
            },
            {
              name: 'Producto F',
              dimensions: { largo: 500, ancho: 500, alto: 150 },
              location: { x: 500, y: 0 }
            }
          ],
          total_height: 400
        },
        {
          level: 2,
          products: [
            {
              name: 'Producto G',
              dimensions: { largo: 800, ancho: 600, alto: 200 },
              location: { x: 0, y: 0 }
            }
          ],
          total_height: 200
        }
      ],
      total_pallet_height: 600
    },
    {
      pallet_id: 4,
      levels: [
        {
          level: 1,
          products: [
            {
              name: 'Producto H',
              dimensions: { largo: 1100, ancho: 700, alto: 300 },
              location: { x: 0, y: 0 }
            }
          ],
          total_height: 300
        },
        {
          level: 2,
          products: [
            {
              name: 'Producto I',
              dimensions: { largo: 600, ancho: 600, alto: 400 },
              location: { x: 0, y: 0 }
            }
          ],
          total_height: 400
        }
      ],
      total_pallet_height: 700
    },
    {
      pallet_id: 5,
      levels: [
        {
          level: 1,
          products: [
            {
              name: 'Producto J',
              dimensions: { largo: 1000, ancho: 1000, alto: 200 },
              location: { x: 0, y: 0 }
            }
          ],
          total_height: 200
        }
      ],
      total_pallet_height: 200
    }
  ]
};

export function PalletTabs() {
  return (
    <Tabs
      defaultValue={`pallet-1`}
      className="pt-8 sm:w-full lg:w-1/2 flex h-full justify-start align-center flex-col m-auto"
    >
      <TabsList className="grid grid-cols-5 w-full mb-4">
        {palletData.pallets.map((pallet) => (
          <TabsTrigger
            key={pallet.pallet_id}
            value={`pallet-${pallet.pallet_id}`}
          >
            Pallet {pallet.pallet_id}
          </TabsTrigger>
        ))}
      </TabsList>

      {palletData.pallets.map((pallet) => (
        <TabsContent
          key={pallet.pallet_id}
          value={`pallet-${pallet.pallet_id}`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Pallet {pallet.pallet_id}</CardTitle>
              <CardDescription>
                Altura total: {pallet.total_pallet_height} mm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible>
                {pallet.levels.map((level, levelIndex) => (
                  <AccordionItem
                    key={levelIndex}
                    value={`level-${level.level}`}
                  >
                    <AccordionTrigger className="text-xl">
                      Nivel {level.level} (Altura: {level.total_height} mm)
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc ml-6 mt-2">
                        {level.products.map((product, productIndex) => (
                          <li key={productIndex} className="mb-2">
                            <span className="font-semibold text-base">
                              {product.name}
                            </span>
                            : Largo: {product.dimensions.largo} mm, Ancho:{' '}
                            {product.dimensions.ancho} mm, Alto:{' '}
                            {product.dimensions.alto} mm, Ubicación: (
                            {product.location.x}, {product.location.y})
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default PalletTabs;
