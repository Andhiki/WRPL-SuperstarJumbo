import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/container";
import { getAllCategories } from "@/helpers/fetchCategories"; // You'll need to create this
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <Container>
      <div className="py-20 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Kategori Buku</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={`/kategori/${category.slug}`} key={category.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Data sedang dimuat...
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}