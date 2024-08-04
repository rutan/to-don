import React, { useCallback, useState } from 'react';
import { cx } from '../utils';

export interface InstanceFormProps {
  className?: string;
  onSubmit: (domain: string) => void;
  disabled?: boolean;
}

function parseDomain(inputValue: string): string {
  // URLの場合はホスト名を取得
  if (inputValue.startsWith('http://') || inputValue.startsWith('https://')) {
    return new URL(inputValue).hostname;
  }

  // @xxxx@example.com の形式の場合はドメイン部分のみ取得
  if (inputValue.includes('@')) {
    const split = inputValue.split('@');
    return split[split.length - 1];
  }

  return inputValue;
}

export const InstanceForm: React.FC<InstanceFormProps> = ({ className, onSubmit, disabled }) => {
  const [inputText, setInputText] = useState('');

  const callOnInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setInputText((e.target as HTMLInputElement).value);
    },
    [setInputText],
  );

  const callOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const inputValue = ((new FormData(e.currentTarget).get('domain') || '') as string).trim().toLowerCase();
      if (!inputValue) return;

      const domain = parseDomain(inputValue);
      if (!domain) return;

      onSubmit(domain);
    },
    [onSubmit],
  );

  return (
    <div className={cx('InstanceForm', className)}>
      <h2 className="InstanceForm__Title">MastodonサーバーのURLを指定する</h2>
      <form className="InstanceForm__Content" action="#" onSubmit={callOnSubmit}>
        <input
          className="InstanceForm__Input"
          type="text"
          name="domain"
          placeholder="例: mastodon.social"
          disabled={disabled}
          onInput={callOnInput}
        />
        <button className="InstanceForm__Button" type="submit" disabled={disabled || inputText.length === 0}>
          シェアする
        </button>
      </form>
    </div>
  );
};
