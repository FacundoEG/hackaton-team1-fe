import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function OptimizationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Optimización</CardTitle>
        <CardDescription className="text-lg">
          Aquí se va a visualizar el orden mas optimo para los pallets.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
