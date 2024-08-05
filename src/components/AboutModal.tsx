import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { MdClose } from 'react-icons/md';
import { AboutContent } from './AboutContent';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="AppOverlay fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70"
    >
      <div className="AppOverlay__Content w-full">
        <DialogPanel className="AboutModal relative container md:max-w-2xl m-auto p-4 bg-white rounded shadow">
          <AboutContent />
          <button className="AboutModal__CloseButton absolute top-2 right-2 text-4xl text-gray-500" onClick={onClose}>
            <MdClose title="閉じる" />
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
