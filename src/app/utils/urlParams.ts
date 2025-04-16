'use client';

import { useSearchParams } from 'next/navigation';

export const useUrlParams = () => {
  const searchParams = useSearchParams();

  const getParam = (key: string) => {
    const value = searchParams.get(key);
    return value ? decodeURIComponent(value) : '';
  };

  return {
    nickname: getParam('nickname'),
    title: getParam('title'),
    content: getParam('content'),
    utmSource: getParam('utm_source') || 'direct',
    utmMedium: getParam('utm_medium') || 'none',
    utmCampaign: getParam('utm_campaign') || 'none',
  };
};
