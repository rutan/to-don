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
    <div className={cx('InstanceForm bg-white bg-white shadow-md rounded p-5', className)}>
      <h2 className="InstanceForm__Title text-base font-bold mb-4">MastodonサーバーのURLを指定する</h2>
      <form className="InstanceForm__Content grid gap-y-2 md:grid-cols-[1fr_auto]" action="#" onSubmit={callOnSubmit}>
        <input
          className="InstanceForm__Input block h-12 px-4 border border-solid border-gray-300 rounded md:rounded-tr-none md:rounded-br-none"
          type="text"
          name="domain"
          placeholder="例: mastodon.social"
          disabled={disabled}
          onInput={callOnInput}
        />
        <button
          className="InstanceForm__Button block w-32 h-12 text-white border-none rounded md:rounded-tl-none md:rounded-bl-none bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
          disabled={disabled || inputText.length === 0}
        >
          シェアする
        </button>
      </form>
    </div>
  );
};
