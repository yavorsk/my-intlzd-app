import { useLocale, useTranslations } from "next-intl";
import { routing } from "../../i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("skateparktest");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("lang-switcher")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t(cur)}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
