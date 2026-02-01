import { PropertiesCatalog } from "@/widgets/properties-catalog";
import { getProperties } from "@/entities/property/api/server";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const initialProperties = await getProperties();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
      </div>
      <PropertiesCatalog
        initialData={JSON.parse(JSON.stringify(initialProperties))}
      />
    </div>
  );
}
