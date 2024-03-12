import json from './RSSReader.json';
import Widget from '../../components/Widget/Widget';
import { useEffect, useState } from 'react';
import { apiGet } from '../../utils/apiUtils';
import { FiRefreshCcw } from 'react-icons/fi';
import _ from 'lodash';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';

type Props = {
  wid: string;
};

type QuoteData = {
  content: string;
  author: string;
};

const DefaultUrl = 'https://www.reddit.com/r/technology/top/.rss?t=day';

export default function RSSReader({ wid }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [err, setErr] = useState('');

  const fetch = async () => {
    if (url) {
      const { data, error } = await apiGet(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, {
        noCache: true
      });
      if (error) {
        setErr(error);
      } else {
        setItems(data?.items ?? []);
      }
    }
  };
  const fetchDebounced = _.debounce(fetch, 200);

  const { settings } = useWidgetSettings(wid, (settings) => {
    setUrl(settings?.url ?? DefaultUrl);
  });

  useEffect(() => {
    fetchDebounced();
  }, [url]);

  return (
    <Widget
      wid={wid}
      schema={json.schema}
      w={json.info.w}
      h={json.info.h}
      cn="overflow-hidden"
      onSettings={({ settings }) => {
      }}
      render={({ settings }) => {
        return (
          <div className="p-2">
            RSS Reader
          </div>
        );
      }}
    />
  );
}
