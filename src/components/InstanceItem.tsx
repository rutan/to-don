import React, { useCallback, useMemo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { MdMoreVert } from 'react-icons/md';
import { cx, generateShareUrl } from '../utils';
import { Instance, ShareParameter } from '../schema';

export interface InstanceItemProps {
  className?: string;
  instance: Instance;
  shareParameter: ShareParameter;
  onDestroy?: (instance: Instance) => void;
}

export const InstanceItem: React.FC<InstanceItemProps> = ({ className, instance, shareParameter, onDestroy }) => {
  const shareUrl = useMemo(() => {
    return generateShareUrl(instance, shareParameter);
  }, [instance.domain, shareParameter]);

  const onClickDestroy = useCallback(() => {
    if (onDestroy) onDestroy(instance);
  }, [instance, onDestroy]);

  return (
    <li className={cx('InstanceItem relative', className)}>
      <a className="block p-4 no-underline text-current hover:bg-gray-100" href={shareUrl}>
        <div className="InstanceItem__Name flex flex-wrap gap-2 items-baseline">
          <span className="InstanceItem__Name__Title text-lg font-bold">{instance.title}</span>
          <span className="InstanceItem__Name__Domain text-sm font-bold text-gray-400">{instance.domain}</span>
        </div>
        <div className="InstanceItem__Description mt-2 text-sm line-clamp-2">{instance.description}</div>
      </a>
      {onDestroy ? (
        <Menu as="div" className="InstanceItem__Menu absolute top-0 right-0 flex gap-2">
          <MenuButton className="m-1 p-3 hover:bg-gray-100 rounded-full text-gray-500" title="メニュー">
            <MdMoreVert />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="InstanceItemMenuPopup relative bg-white border shadow-xl rounded p-2 z-30"
          >
            <MenuItem>
              <button
                className="InstanceItemMenuPopup__Button px-4 py-2 text-sm text-red-500 font-bold hover:bg-gray-100 rounded"
                onClick={onClickDestroy}
              >
                削除する
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : null}
    </li>
  );
};
