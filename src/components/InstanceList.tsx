import React from 'react';
import { cx } from '../utils';
import { Instance, ShareParameter } from '../schema';
import { InstanceItem } from './InstanceItem';

export interface InstanceListProps {
  className?: string;
  instances: Instance[];
  shareParameter: ShareParameter;
  onDestroy?: (instance: Instance) => void;
}

export const InstanceList: React.FC<InstanceListProps> = ({ className, instances, shareParameter, onDestroy }) => {
  if (instances.length === 0) return null;

  return (
    <ul className={cx('InstanceList', className)}>
      {instances.map((instance, i) => (
        <InstanceItem instance={instance} shareParameter={shareParameter} onDestroy={onDestroy} key={instance.domain} />
      ))}
    </ul>
  );
};
