import json from './AnalogClock.json';
import Widget from '../../components/Widget/Widget';
import { useEffect, useState } from 'react';
// import _ from 'lodash';
import Clock from './Clock';

type Props = {
  wid: string;
};

export default function AnalogClock({ wid }: Props) {
  return (
    <Widget
      wid={wid}
      schema={json.schema}
      w={json.info.w}
      h={json.info.h}
      cn="overflow-hidden flex justify-center"
      onSettings={({ }) => { }}
      render={({ settings }) => {
        return (
          <div className="p-2 flex">
            Analog Clock
          </div>
        );
      }}
    />
  );
}
