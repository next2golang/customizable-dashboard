import { Widget } from '../../types';

import jsonAirQuality from './AirQuality/AirQuality.json';


export function isIframeWidget(wid: string) {
  return wid.startsWith('stock') || wid.startsWith('embed') || wid.startsWith('rssreader');
}

export function isDoubleHeightWidget(wid: string) {
  return (
    wid.startsWith('embed-') || wid.startsWith('stock-') || wid.startsWith('toggl-') || wid.startsWith('rssreader-')
  );
}

export const widgetList: Widget[] = [
  jsonAirQuality,
];
