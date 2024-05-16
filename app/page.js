import FileUpload from "@/components/Fileupload";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full grid grid-cols-3 px-20 py-14 gap-5">
      <div className="col-span-2 ">
      <FileUpload />
      </div>
      <div className="col-span-1 px-10">
        <h2 className="text-3xl font-bold">Remove Background of Image</h2>
        <p>Welcome to bg-remover-next! Our tool streamlines background removal from images. Simply upload your photo featuring a distinct foreground and background, then click the button to seamlessly eliminate the background. With our intuitive interface and powerful Next.js 14 backend, the process is quick and effortless.</p>
      </div>
    </main>
  );
}
