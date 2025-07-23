import { useLocale, useTranslations } from "next-intl";

export function MyServerComponent() {
  const t = useTranslations();
  const locale = useLocale();
  console.log("Server component rendered");
  console.log("locale", locale);

  // use getTranslations in case of async component
  // import {getTranslations} from 'next-intl/server';
  // const t = await getTranslations('HomePage');

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <p className="text-lg font-semibold text-gray-800 text-center">
          This is a server component
        </p>
        <p className="text-lg font-semibold text-gray-800 text-center">
          {t("some phrase")}
        </p>
      </div>
    </div>
  );
}
