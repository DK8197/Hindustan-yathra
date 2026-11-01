import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale = routing.locales.find(
    (supportedLocale) => supportedLocale === requested
  ) ?? routing.defaultLocale;

  const messages = (
    await import(`../messages/${locale}.json`)
  ).default;

  return {
    locale,
    messages
  };
});