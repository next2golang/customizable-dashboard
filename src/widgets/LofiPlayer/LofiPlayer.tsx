import { memo, useMemo, useState } from 'react';
import json from './LofiPlayer.json';
import Widget from '../../components/Widget/Widget';

type Props = {
  wid: string;
};

const arrMp3s = [
  '350',
  '353',
  '354',
  '356',
  '357',
  '359',
  '360',
  '375',
  '376',
  '377',
  '378',
  '380',
  '381',
  '382',
  '383',
  '386'
];
const getMp3Url = (idx: number) => {
  return `https://www.fesliyanstudios.com/download-link.php?src=i&id=${arrMp3s[idx]}`;
};

export default function LofiPlayer({ wid }: Props) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlayRandom, setIsPlayRandom] = useState(true);

  const playRandomly = () => {
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * arrMp3s.length);
    } while (randIdx === currentIndex);
    setCurrentIndex(randIdx);
    setCurrentUrl(getMp3Url(randIdx));
  };

  return (
    <Widget
      wid={wid}
      schema={json.schema}
      w={json.info.w}
      h={json.info.h}
      cn="text-center"
      onSettings={({ settings }) => {
        setCurrentUrl(settings?.url ?? '');
      }}
      render={() => {
        return (
          <></>
        );
      }}
    />
  );
}
