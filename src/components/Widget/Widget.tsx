import { ReactNode, useEffect, useState } from 'react';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';
// import schema from './AirQuality.json';
import WidgetSettings, { SettingsIcon } from '../../components/WidgetSettings/WidgetSettings';
import { KeyValueString } from '../../../types';
import { WidgetWidth } from '../../utils/constants';
import { hToPx, widToName } from '../../utils/appUtils';
import { PubSubEvent, usePub, useSub } from '../../hooks/usePubSub';
import { isIframeWidget } from '../../widgets';
import { useAppContext } from '../../hooks/useAppContext';

type Props = {
  wid: string;
  schema: unknown;
  w: number;
  h: number;
  cn?: string;
  render: ({
    settings,
    saveSettings
  }: {
    settings: KeyValueString;
    saveSettings: (settings: KeyValueString) => void;
  }) => ReactNode;
  onSettings: ({ settings, isSubmitted }: { settings: KeyValueString; isSubmitted?: boolean }) => void;
};

export default function Widget({ wid, schema, w, h, cn, render, onSettings }: Props) {
  const { tabSettings } = useAppContext();

  const [isMoving, setIsMoving] = useState(false);
  const [settings, setSettings] = useState<KeyValueString>({});

  const { settingsShowed, saveSettings, toggleSettings } = useWidgetSettings(wid, (settings) => {
    setSettings(settings);
    onSettings({ settings, isSubmitted: false });
  });
  const publish = usePub();

  useSub(PubSubEvent.Moving, ({ stop }: { stop: boolean }) => {
    // if (stop === true) {
    //   setIsMoving(() => false);
    // } else {

    //   setIsMoving((curretMoving) => {
    //     const newState = !curretMoving;
    //     // publish(PubSubEvent.MovingToast, { isMoving: newState });
    //     // alert(newState)
    //     return newState;
    //   });

    // }
    //if (stop == false) setIsMoving(true);
    setIsMoving(!isMoving);
  });

  const movingCss = `border-[2px] border-blue-600 draggableHandle cursor-move`;
  const borderCss = `${isMoving ? movingCss : `border-[1px] border-[#222839] shadow-blue-500/50 ${tabSettings?.border ?? ''} ${tabSettings?.borderColor ?? ''}`}`;

  return (
    <div
      // border-2 border-gray-100 rounded-md
      className={`relative overflow-hidden bg-white dark:bg-[#11141d] dark: rounded-lg widget-shadow shadow-lg shadow-blue-500/50 ${borderCss} ${cn ?? ''}`}
      style={{ width: WidgetWidth * w, height: hToPx(h) }}
    >
      {!isMoving ? (
        <div
          className="flex z-[10] gap-2  absolute right-0 items-center bg-blue-600 text-gray-300"
        >
          <SettingsIcon wid={wid} onClick={toggleSettings} />
          <span
            className="text-[25px] mr-2 hover: cursor-pointer hover:text-white"
            onClick={() => {
              publish(PubSubEvent.Delete, wid);
            }}>&#215;</span>
        </div>
      ) : (
        <div></div>
      )}

      {settingsShowed ? (
        <WidgetSettings
          wid={wid}
          schema={schema}
          onSubmit={(settings) => {
            // console.log('WidgetSettings - onSubmit', settings);
            toggleSettings();
            setSettings(settings);
            onSettings({ settings, isSubmitted: true });
          }}
          onCancel={() => toggleSettings()}
        />
      ) : isMoving && isIframeWidget(wid) ? (
        <>
          {/* we can't drag an IFrame Widget => only render Widget Name instead: */}
          <div className="capitalize p-2">{widToName(wid) + ' widget'}</div>
        </>
      ) : (
        render({ settings, saveSettings })
      )}
    </div>
  );
}
