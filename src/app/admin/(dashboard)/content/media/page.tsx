import { getMediaAssets } from "@/lib/media-db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import Image from "next/image";

async function uploadFile(formData: FormData) {
  "use server";
  const file = formData.get("file") as File;
  if (!file) return;
  
  const UPLOAD_DIR = join(process.cwd(), "public/uploads");
  await mkdir(UPLOAD_DIR, { recursive: true });
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await writeFile(join(UPLOAD_DIR, filename), buffer);
  
  revalidatePath("/admin/content/media");
}

export default async function AdminMediaPage() {
  const assets = await getMediaAssets();

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <h2 className="font-display text-[2rem] text-ink">Biblioteca de Mídia</h2>
        <form action={uploadFile} className="mt-4 flex gap-4">
          <input type="file" name="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-terracotta file:text-white hover:file:bg-clay" />
          <button type="submit" className="rounded-full bg-ink px-4 py-2 text-white">Upload</button>
        </form>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-[1.2rem] overflow-hidden border border-outline/30 bg-white shadow-soft relative h-32">
            <Image
              src={asset.fileUrl}
              alt={asset.altText}
              fill
              className="object-cover"
            />
            <p className="absolute bottom-0 w-full p-2 text-xs truncate text-white bg-black/50">{asset.fileKey}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
