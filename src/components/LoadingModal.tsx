import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

export const LoadingModal = () => {
  return (
    <Dialog className="AppOverlay LoadingModal" static={true} open={true} onClose={() => {}}>
      <div className="AppOverlay__Content">
        <DialogPanel className="LoadingModal">
          <p>サーバー情報を取得しています...</p>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
