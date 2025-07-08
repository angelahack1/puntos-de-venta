import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export interface Producto {
  qr: string;
  nombre: string;
  descripcion: string;
  sku: string;
  precio_inicial: number;
  image_url: string;
  estado: string;
  divisa: string;
}

export async function getProducts(): Promise<Producto[]> {
  const client = await clientPromise;
  const db = client.db();

  const products = await db
    .collection('Producto')
    .aggregate([
      {
        $lookup: {
          from: 'CatalogoEstadosProducto',
          let: { estado: '$estado' },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$estado"] } } }],
          as: 'estado_producto'
        }
      },
      {
        $lookup: {
          from: 'CatalogoTiposDivisa',
          let: { divisa: '$divisa' },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$divisa"] } } }],
          as: 'tipo_divisa'
        }
      },
      {
        $project: {
          _id: 0,
          qr: 1,
          nombre: 1,
          descripcion: 1,
          sku: 1,
          precio_inicial: 1,
          image_url: 1,
          estado: { $arrayElemAt: ["$estado_producto.nombre_estado", 0] },
          divisa: { $arrayElemAt: ["$tipo_divisa.nombre_tipo", 0] }
        }
      }
    ])
    .toArray();

  return products as Producto[];
}

// Force fresh data fetch - disable caching
export const revalidate = 0;
