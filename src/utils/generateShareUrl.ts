import { Instance } from '../schema';

export function generateShareUrl(instance: Instance, shareParameter: { url?: string; text?: string }) {
  const url = new URL(`https://${instance.domain}/share`);
  if (shareParameter.url) url.searchParams.set('url', shareParameter.url);
  if (shareParameter.text) url.searchParams.set('text', shareParameter.text);
  return url.toString();
}
