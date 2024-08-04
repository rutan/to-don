import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

export const LoadingModal = () => {
  return (
    <Dialog
      className="AppOverlay fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70"
      static={true}
      open={true}
      onClose={() => {}}
    >
      <div className="AppOverlay__Content w-full">
        <DialogPanel className="LoadingModal text-white text-center">
          <p>サーバー情報を取得しています...</p>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
