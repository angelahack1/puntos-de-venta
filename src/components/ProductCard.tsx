import { Producto } from '@/lib/products';

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <img src={producto.image_url} alt={producto.descripcion} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold">{producto.descripcion}</h2>
      <p className="text-lg">{producto.precio_inicial} {producto.divisa}</p>
      <p className="text-sm">Estado: {producto.estado}</p>
    </div>
  );
}
