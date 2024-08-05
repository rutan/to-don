import React, { useEffect, useState } from 'react';
import { cx } from '../utils';

export interface SampleShareProps {
  className?: string;
}

export const SampleShare = ({ className }: SampleShareProps) => {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const url = new URL(location.href.replace(/\?.*$/, ''));
    url.searchParams.set('url', url.toString());
    url.searchParams.set('text', 'シェアのサンプル');
    setShareUrl(url.toString());
  }, []);

  return (
    <div className={cx('SampleShare', className)}>
      <p className="text-center">
        <a href={shareUrl}>試しにこのページをシェアしてみる</a>
      </p>
    </div>
  );
};
