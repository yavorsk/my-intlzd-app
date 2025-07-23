import { MyClientComponent } from "./../components/clien-components";
import { MyServerComponent } from "./../components/server-component";

export default function Hello() {
  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-3xl">Hello Next.js!</h1>
      </div>
      <MyClientComponent />
      <MyServerComponent />
    </>
  );
}
