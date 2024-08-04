import { useEffect, useState } from 'react';
import { shareParameterSchema, type ShareParameter } from '../schema';

type ShareParameterStatus = 'loading' | 'loaded' | 'error';

export function useShareParameter() {
  const [status, setStatus] = useState<ShareParameterStatus>('loading');
  const [shareParameter, setShareParameter] = useState<ShareParameter>({
    url: '',
    text: '',
  });

  useEffect(() => {
    const pageUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(pageUrl.search);
    const url = searchParams.get('url') || undefined;
    const text = searchParams.get('text') || undefined;

    try {
      const data = shareParameterSchema.parse({ url, text });
      setShareParameter(data);
      setStatus('loaded');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  }, []);

  return {
    loaded: status,
    shareParameter,
  };
}
