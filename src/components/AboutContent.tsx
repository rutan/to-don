import React from 'react';
import { cx } from '../utils';

export interface AboutContentProps {
  className?: string;
}

const Title = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-bold my-2">{children}</h2>;
const Paragraph = ({ children }: { children: React.ReactNode }) => <p className="my-4">{children}</p>;

export const AboutContent = ({ className }: AboutContentProps) => {
  return (
    <div className={cx('AboutContent', className)}>
      <Title>このページは？</Title>
      <Paragraph>このページは、Mastodon 向けのURLシェアを行うためのページです。</Paragraph>
      <Paragraph>
        Mastodon サーバーの URL を入力すると、ブラウザ上でそのサーバーの情報を取得し、シェア用の URL を生成します。
      </Paragraph>
      <Paragraph>入力したサーバーの情報は、ブラウザのローカルストレージに保存されます。</Paragraph>
      <Title>つくった人</Title>
      <Paragraph>
        <a href="https://fd.toripota.com/@rutan">@rutan@fd.toripota.com</a>
      </Paragraph>
      <Title>ソースコード</Title>
      <Paragraph>
        <a href="https://github.com/rutan/to-don">https://github.com/rutan/to-don</a>
      </Paragraph>
    </div>
  );
};
