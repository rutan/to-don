import React, { useCallback } from 'react';
import { useAppStorage, useShareParameter } from './hooks';
import { AboutModal, InstanceForm, InstanceList, LoadingModal } from './components';
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

  if (appStorage.loading) {
    return null;
  }

  return (
    <>
      <div className="App">
        <main className="App_Main">
          <h1 className="Title">シェアするサーバーを選択</h1>
          <InstanceList
            instances={appStorage.data.instances}
            shareParameter={shareParameter}
            onDestroy={removeInstance}
          />
          <InstanceForm onSubmit={addInstance} disabled={status === 'addInstanceNow'} />
        </main>
        <footer className="App__Footer">
          <ul>
            <li>
              <button onClick={onClickAbout}>このページは？</button>
            </li>
          </ul>
        </footer>
      </div>

      <AboutModal isOpen={status === 'showAbout'} onClose={onCloseOverlay} />
      {status === 'addInstanceNow' && <LoadingModal />}
    </>
  );
};
