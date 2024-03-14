import { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost } from '../utils/apiUtils';
import { KeyValueString } from '../../types';
// import { useAppContext } from './useAppContext';
import { getSettingsApiUrl, logOut } from '../utils/appUtils';

const fetchSettings = async (wid: string) => {
  // try {
  //   const response = await apiGet(getSettingsApiUrl(0, wid), {
  //     // noCache: true // don't do this as there are many same requests => use timestamp in getSettingsApiUrl.
  //   });

  //   if (!response || !response.data) {
  //     throw new Error('An error occurred while fetching settings.');
  //   }

  //   const { data, error } = response;

  //   if (error) {
  //     // Handle the error case
  //     // jwtToken expired, etc.
  //     // logOut(); // this caused an infinite loop
  //     throw new Error('An error occurred while fetching settings.');
  //   }

  //   return data.settings;
  // } catch (error) {
  //   // Handle the error here
  //   console.log('An error occurred while fetching settings:', error);
  //   return null; // Return an appropriate value indicating the failure to fetch settings
  // }
};

export const useWidgetSettings = (wid: string, callback: (settings: KeyValueString) => void) => {
  const [settings, setSettings] = useState<KeyValueString>({});
  const [settingsShowed, setSettingsShowed] = useState(false);

  const toggleSettings = () => setSettingsShowed(!settingsShowed);

  const fetch = async () => {
    const settings: any = await fetchSettings(wid);
    // console.log('--- settings', settings);

    setSettings(settings);
    callback(settings);
  };

  useEffect(() => {
    fetch();
  }, []);

  // ------------- helper functions ------------- //

  const saveSettings = async (settings: KeyValueString) => {
    try {
      const response = await apiPost(getSettingsApiUrl(0, wid), {
        payload: settings
      });

      const { data, status } = response ?? {};
      // if (error) {
      //   if (status === 403) {
      //     logOut();
      //   }
      // }
      return { data };
    } catch (error) {
      console.error('An error occured while saving setting: ', error);
      return { data: undefined, error };
    }

  };

  return { settings, setSettings, saveSettings, settingsShowed, toggleSettings };
};

export async function deleteSettings(wid: string) {
  // return apiDelete(getSettingsApiUrl(0, wid), {});
}
