import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { MdClose } from 'react-icons/md';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="AppOverlay">
      <div className="AppOverlay__Content">
        <DialogPanel className="AboutModal">
          <div className="AboutModal__Content">
            <h2>このページは？</h2>
            <p>このページは、Mastodon 向けのURLシェアを行うためのページです。</p>
            <p>
              Mastodon サーバーの URL を入力すると、ブラウザ上でそのサーバーの情報を取得し、シェア用の URL
              を生成します。
            </p>
            <p>入力したサーバーの情報は、ブラウザのローカルストレージに保存されます。</p>
            <h2>つくった人</h2>
            <p>
              <a href="https://fd.toripota.com/@rutan">@rutan@fd.toripota.com</a>
            </p>
            <h2>ソースコード</h2>
            <p>
              <a href="https://github.com/rutan/to-don">https://github.com/rutan/to-don</a>
            </p>
          </div>
          <button className="AboutModal__CloseButton" onClick={onClose}>
            <MdClose title="閉じる" />
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
