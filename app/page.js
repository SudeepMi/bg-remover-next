import FileUpload from "@/components/Fileupload";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex p-24 gap-5">
      <FileUpload />
      <div>
        <h2 className="text-2xl">Remove Background of Image</h2>
      </div>
    </main>
  );
}
