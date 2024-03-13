import { PiLockKeyFill, PiLockKeyOpenFill } from 'react-icons/pi';
import { useState } from 'react';

import { PubSubEvent, usePub } from '~/hooks/usePubSub';

export const KeyButton = () => {
    const publish = usePub();
    const [switchtoggle, setSwitchtoggle] = useState(false);
    return (
        <button className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
                publish(PubSubEvent.Moving, { stop: false });
                setSwitchtoggle(!switchtoggle)
            }
            }
        >
            {
                !switchtoggle ? (
                    <PiLockKeyFill className="w-5 h-5" />
                ) : (
                    <PiLockKeyOpenFill className="w-5 h-5" />
                )
            }
            Layout
        </button>
    )
}
