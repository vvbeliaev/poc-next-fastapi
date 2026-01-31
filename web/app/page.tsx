import { Header } from "@/components/header";
import { PropertiesCatalog } from "@/components/properties-catalog";
import { ImageAnalyzer } from "@/components/image-analyzer";
import { getProperties } from "@/lib/actions";

export default async function Home() {
  const initialProperties = await getProperties();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Properties</h1>
            <PropertiesCatalog
              initialData={JSON.parse(JSON.stringify(initialProperties))}
            />
          </div>
          <div className="lg:w-80">
            <ImageAnalyzer />
          </div>
        </div>
      </main>
    </div>
  );
}
