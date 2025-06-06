import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/container";
import { getBooksByCategory, getCategoryBySlug } from "@/helpers/fetchCategories";
import Link from "next/link";

type params = Promise<{ kategori: string }>

export default async function CategoryDetailPage({
  params,
}: {
  params: params;
}) {
  const { kategori } = await params;
  const category = await getCategoryBySlug(kategori);
  
  if (!category) {
    return (
      <Container>
        <div className="py-20 min-h-screen text-center">
          <h1 className="text-3xl font-bold mb-4">Kategori tidak ditemukan</h1>
          <p className="mb-4">Slug yang dicari: {kategori}</p>
          <Link href="/kategori" className="text-blue-600 hover:underline">
            ← Kembali ke Semua Kategori
          </Link>
        </div>
      </Container>
    );
  }

  // Changed from params.slug to params.kategori
  const books = await getBooksByCategory(kategori);

  return (
    <Container>
      <div className="py-20 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Buku dalam Kategori: {category.name} 
        </h1>
        
        <div className="mb-8">
          <Link href="/kategori" className="text-blue-600 hover:underline">
            ← Kembali ke Semua Kategori
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link href={`/buku/${book.slug}`} key={book.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mt-2">Harga: Rp{book.price?.toLocaleString()}</p>
                  <p className="text-gray-600">Stok: {book.stock}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}