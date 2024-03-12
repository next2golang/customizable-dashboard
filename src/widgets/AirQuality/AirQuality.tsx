import { useEffect, useState } from 'react';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';

import json from './AirQuality.json';
import { apiGet } from '../../utils/apiUtils';
import { KeyValueString } from '../../../types';
import Widget from '../../components/Widget/Widget';

type Props = {
  wid: string;
};

export default function AirQuality({ wid }: Props) {
  const { saveSettings } = useWidgetSettings(wid, () => { });
  const [settings, setSettings] = useState<KeyValueString>({});
  const [stations, setStations] = useState<any>([]);
  const [stationId, setStationId] = useState<string>('');
  const [stationData, setStationData] = useState<any>(null);

  return (
    <Widget
      wid={wid}
      schema={json.schema}
      w={json.info.w}
      h={json.info.h}
      cn="text-center"
      onSettings={() => { }}
      render={() => {
        return (
          <div className="p-2">
          </div>
        );
      }}
    />
  );
}
