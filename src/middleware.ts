import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sites } from "./../sites";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  let currentSite = null;

  for (const site of sites) {
    if (site.domains.includes(hostname)) {
      currentSite = site;
      break;
    }
  }

  if (!currentSite) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  const { pathname } = request.nextUrl;

  const localeFromPath = currentSite.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const pathWithoutLocale = localeFromPath
    ? pathname.substring(localeFromPath.length + 1)
    : pathname;

  const locale = localeFromPath || currentSite.defaultLocale;

  const newUrl = new URL(
    `/${currentSite.id}/${locale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`,
    request.url
  );

  const response = NextResponse.rewrite(newUrl);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
