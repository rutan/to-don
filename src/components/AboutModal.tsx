import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { MdClose } from 'react-icons/md';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Title = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-bold my-2">{children}</h2>;

const Paragraph = ({ children }: { children: React.ReactNode }) => <p className="my-4">{children}</p>;

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="AppOverlay fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70"
    >
      <div className="AppOverlay__Content w-full">
        <DialogPanel className="AboutModal relative container md:max-w-2xl m-auto p-4 bg-white rounded shadow">
          <div className="AboutModal__Content">
            <Title>このページは？</Title>
            <Paragraph>このページは、Mastodon 向けのURLシェアを行うためのページです。</Paragraph>
            <Paragraph>
              Mastodon サーバーの URL を入力すると、ブラウザ上でそのサーバーの情報を取得し、シェア用の URL
              を生成します。
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
          <button className="AboutModal__CloseButton absolute top-2 right-2 text-4xl text-gray-500" onClick={onClose}>
            <MdClose title="閉じる" />
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
