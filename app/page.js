import Image from "next/image";

export default function Home() {
  return (
    <div className="pl-5 pr-5 h-[calc(100vh-100px)]">
      <div className="flex h-full flex-col md:flex-row min-h-[400px]">
        <div className="w-full h-[50%] flex items-center md:h-full md:justify-center">
          <img className="w-full max-w-[500px]" src="/heroimg.png" alt="HireCom" />
        </div>
        <div className="w-full h-[50%] flex flex-col text-center md:h-full md:justify-center md:items-start">
          <h1 className="text-[30px] font-bold">Search for your new job!</h1>
          <h2 className="text-[20px]">Your new job is waiting for you!</h2>
        </div>
      </div>
    </div>
  );
}
