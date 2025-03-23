import { DEFAULT_PRODUCTS } from '@/lib/fetch';
import { Product } from '@/payload-types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Props {
  query?: {
    availability?: string;
  };
}

const YouMightLike = (props: Props) => {
  const availability = props.query?.availability || '';

  const products = DEFAULT_PRODUCTS.map((item) => {
    const matchesAvailability =
      availability === 'available'
        ? item.available === true
        : availability === 'unavailable'
          ? item.available !== true
          : true;

    return { ...item, matchesAvailability };
  }).slice(0, 4);

  return (
    <main className='relative mt-10 mb-16'>
      <h1 className='mb-5 font-bold text-lg'>Products you might like</h1>
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </main>
  );
};

const ProductCard = (props: Product) => {
  return (
    <Link
      href={`/product/${props.slug}`}
      className="group relative flex flex-col gap-2 rounded-lg"
    >
      {/* Product Image */}
      <section className="relative aspect-square w-full overflow-hidden rounded-lg lg:aspect-[32/22]">
        <Image
          src={(typeof props.images?.[0]?.image === 'object' && props.images[0].image?.url) || '/placeholder.jpg'}
          alt={props.title || 'Product Image'}
          fill
          sizes="100%"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {/* Availability Status */}
        <div
          className={`absolute left-2.5 top-2.5 rounded-md px-2 py-1 text-[10px] md:text-sm ${
            props.available ? 'bg-custom-yellow text-black' : 'bg-black text-white'
          }`}
        >
          {props.available ? 'Available' : 'Out of Stock'}
        </div>
      </section>

      {/* Product Details */}
      <h1 className="text-sm sm:text-xl font-bold underline-offset-4 group-hover:underline">
        {props.title}
      </h1>
      <h2 className="text-[8px] sm:text-xs">
        {(typeof props.material === 'object' ? props.material?.title : null) || 'Unknown Material'} • {(typeof props.category === 'object' ? props.category?.title : null) || 'Unknown Category'}
      </h2>

      {/* Call to Action */}
      <div className="z-10 mt-4 flex shrink-0 items-center justify-end gap-3 overflow-hidden *:text-primary-5">
        <h3 className="text-sm opacity-0 blur-sm transition-all ease-in-out group-hover:opacity-100 group-hover:blur-none">
          See Product
        </h3>
        <ArrowRight className="h-5 w-5" />
      </div>
    </Link>
  );
};

export default YouMightLike;
