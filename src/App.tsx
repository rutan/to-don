import React, { useCallback } from 'react';
import { useAppStorage, useShareParameter } from './hooks';
import { AboutContent, AboutModal, InstanceForm, InstanceList, LoadingModal, SampleShare } from './components';
import { fetchInstance, generateShareUrl } from './utils';
import { Instance, instanceSchema } from './schema';

type Status = 'active' | 'addInstanceNow' | 'showAbout';

export const App: React.FC = () => {
  const { appStorage, setAppStorage } = useAppStorage();
  const { shareParameter } = useShareParameter();
  const [status, setStatus] = React.useState<Status>('active');

  const addInstance = useCallback(
    async (domain: string) => {
      setStatus('addInstanceNow');
      const instanceInfo = appStorage.data.instances.find((instance) => instance.domain === domain);
      if (instanceInfo) {
        location.href = generateShareUrl(instanceInfo, shareParameter);
        return;
      }

      try {
        const resp = await fetchInstance(domain);
        const instance = instanceSchema.parse(resp);
        setAppStorage((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            instances: [instance, ...prev.data.instances],
          },
        }));
        window.setTimeout(() => {
          location.href = generateShareUrl(instance, shareParameter);
        }, 500);
      } catch (e) {
        console.error(e);
        setStatus('active');
        alert('サーバー情報を取得できませんでした');
      }
    },
    [appStorage],
  );

  const removeInstance = useCallback(
    (instance: Instance) => {
      setAppStorage((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          instances: prev.data.instances.filter((i) => i.domain !== instance.domain),
        },
      }));
    },
    [appStorage],
  );

  const onClickAbout = useCallback(() => {
    setStatus('showAbout');
  }, []);

  const onCloseOverlay = useCallback(() => {
    setStatus('active');
  }, []);

  // ロード中表示
  if (appStorage.loading || shareParameter === null) {
    return null;
  }

  return (
    <>
      <div className="App h-full grid grid-rows-[1fr_auto] gap-5">
        {shareParameter.text || shareParameter.url ? (
          <>
            <main className="App_Main container max-w-3xl p-4 mx-auto flex flex-col justify-center gap-y-5">
              <h1 className="Title text-base text-white font-bold">シェアするサーバーを選択</h1>
              <InstanceList
                instances={appStorage.data.instances}
                shareParameter={shareParameter}
                onDestroy={removeInstance}
              />
              <InstanceForm onSubmit={addInstance} disabled={status === 'addInstanceNow'} />
            </main>
            <footer className="App__Footer p-4 text-sm">
              <ul className="list-none flex justify-end gap-4">
                <li>
                  <button className="text-white hover:underline" onClick={onClickAbout}>
                    このページは？
                  </button>
                </li>
              </ul>
            </footer>
            <AboutModal isOpen={status === 'showAbout'} onClose={onCloseOverlay} />
            {status === 'addInstanceNow' && <LoadingModal />}
          </>
        ) : (
          <main className="App_Main container max-w-3xl p-4 mx-auto flex flex-col justify-center gap-y-5">
            <AboutContent className="bg-white shadow-md rounded p-4" />
            <SampleShare className="bg-white shadow-md rounded p-4" />
          </main>
        )}
      </div>
    </>
  );
};
