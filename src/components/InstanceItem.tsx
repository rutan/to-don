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
    <li className={cx('InstanceItem', className)}>
      <a href={shareUrl}>
        <div className="InstanceItem__Name">
          <span className="InstanceItem__Name__Title">{instance.title}</span>
          <span className="InstanceItem__Name__Domain">{instance.domain}</span>
        </div>
        <div className="InstanceItem__Description">{instance.description}</div>
      </a>
      {onDestroy ? (
        <Menu as="div" className="InstanceItem__Menu">
          <MenuButton title="メニュー">
            <MdMoreVert />
          </MenuButton>
          <MenuItems anchor="bottom end" className="InstanceItemMenuPopup">
            <MenuItem>
              <button className="InstanceItemMenuPopup__Button is-danger" onClick={onClickDestroy}>
                削除する
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : null}
    </li>
  );
};
