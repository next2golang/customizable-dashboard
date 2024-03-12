import { memo, useEffect, useState } from 'react';
import json from './Note.json';
import Widget from '../../components/Widget/Widget';
import { useDebounce } from '../../components/base';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';

type Props = {
  wid: string;
};

export default function Note({ wid }: Props) {
  const [text, setText] = useState('');
  const [noteIndex, setNoteIndex] = useState(0);
  const [skipSaving, setSkipSaving] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  let debouncedText = useDebounce(text, 500);
  const { settings, setSettings, saveSettings } = useWidgetSettings(wid, (settings) => {
    // console.log('--- settings', wid, settings);
    setText(settings?.text ?? '');
  });

  useEffect(() => {
    if (debouncedText && debouncedText !== settings?.text && skipSaving === false) {
      // console.log('--- Saving...', debouncedText.length);
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 500);

      const newSettings = {
        ...settings,
        [`text${noteIndex}`]: debouncedText
      };
      saveSettings(newSettings);
      setSettings(newSettings);
    }
    if (skipSaving) {
      // console.log('reset skipSaving', skipSaving);
      setTimeout(() => setSkipSaving(false), 200);
    }
  }, [debouncedText]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <></>
  );
}
