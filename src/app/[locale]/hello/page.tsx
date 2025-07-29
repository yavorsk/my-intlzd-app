import { use } from "react";
import { MyClientComponent } from "../../components/clien-components";
import { MyServerComponent } from "../../components/server-component";
import { setRequestLocale } from "next-intl/server";

export default function Hello({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

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
