import { useEffect, useState, memo, useMemo } from 'react';
import { WidthProvider, Responsive, type Layouts, type Layout } from 'react-grid-layout';
import { useAccount } from 'wagmi';

import StockChart from '~/widgets/StockChart/StockChart';
import AirQuality from '~/widgets/AirQuality/AirQuality';
import Embed from '~/widgets/Embed/Embed';
import LofiPlayer from '~/widgets/LofiPlayer/LofiPlayer';
import Note from '~/widgets/Note/Note';
import StockMini from '~/widgets/StockMini/StockMini';
import RSSReader from '~/widgets/RSSReader/RSSReader';
import Quote from '~/widgets/Quote/Quote';
import AnalogClock from '~/widgets/AnalogClock/AnalogClock';
import Cryptoportfoliotracker from '~/widgets/CryptoportfolioTracker/cryptoportfoliotracker';
import Cryptopriceticker from '~/widgets/CryptoPriceTicker/cryptopriceticker';
import { isDoubleHeightWidget, isDoubleWidthWidget } from '~/widgets';


import { generateWID, getLS } from '~/utils/appUtils';
import { DefaultLayout, DefaultWidgets } from '~/utils/constants';
import { apiGet } from '~/utils/apiUtils';
import { PubSubEvent, usePub, useSub } from '~/hooks/usePubSub';
import { useAppContext } from '~/hooks/useAppContext';
import { deleteSettings } from '~/hooks/useWidgetSettings';
import { saveTabDB, getTabDB, saveTabLS } from '../lib/MainPageUtils';
import { type UserWidget, type Widget } from '../../types';
import { Toast } from '~/components/base';
import { Button } from '~/components/base';
import { Submit } from '~/components/ui/submitButton';
import { KeyButton } from '~/components/ui/KeyButton';
import AddWidgetModal from '~/components/base/AddWidgetModal/AddWidgetModal';
import { RenameDialog } from './RenameDialog'
import { DeleteDialog } from './DeleteDialog'

import { PiLockKeyFill, PiLockKeyOpenFill } from "react-icons/pi";

interface DashboardContentProps {
  tabKey: number;
  title: string;
  onTitleChange: (nTitle: string) => void;
  RemoveDashboard: () => void;
}
const Dashboardcontent: React.FC<DashboardContentProps> = ({ tabKey, title, onTitleChange, RemoveDashboard }) => {
  const { address } = useAccount();
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [addmodalShowed, setAddmodalShowed] = useState(false);
  const [tab, setTab] = useState(tabKey);

  const [movingToastShowed, setMovingToastShowed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [userWidgets, setUserWidgets] = useState<UserWidget[]>(getLS(`userWidgets${tab}`, DefaultWidgets, true));
  const [layout, setLayout] = useState<Layout[]>(getLS(`userLayout${tab}`, DefaultLayout, true));
  // const [userWidgets, setUserWidgets] = useState<UserWidget[]>(DefaultWidgets);
  // const [layout, setLayout] = useState<Layout[]>(DefaultLayout);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('');

  const getLSLayout = (size: string) => {
    return getLS(`userLayout${tab}${size}`, DefaultLayout, true);
  };

  const [layouts, setLayouts] = useState<Layouts>({
    xl: getLSLayout('xl'),
    lg: getLSLayout('lg'),
    md: getLSLayout('md'),
    sm: getLSLayout('sm'),
    xs: getLSLayout('xs'),
    xxs: getLSLayout('xxs')
  });

  useSub(PubSubEvent.Moving, () => {
    setIsMoving(!isMoving);
  });

  useSub(PubSubEvent.Saving, () => {
    // alert('second')
    setIsSave(!isSave);
  });

  useEffect(() => {
    // alert('first')
    const fetchData = async () => {
      // console.log(tab)
      setIsReady(false);
      // const response = await getTabDB(address?.toString()!, tab);
      // if (response.userWidgets == null) {
      //   setUserWidgets(DefaultWidgets);
      //   setLayout(DefaultLayout);
      // }
      // else {
      //   setUserWidgets(response.userWidgets);
      //   setLayout(response.userLayout);
      // }
      // console.log(response)
      setIsReady(true);
      // const token = localStorage.getItem('tk') ?? '';
      // if (token) {
      //   const timestamp = new Date().toISOString().split('.')[0]; // 2023-11-03T15:06:24 (removed nanosecs)
      //   const { data } = await apiGet(`/api/user/settings?ts=${timestamp}`, {});
      //   const newWidgets = (data?.userWidgets ?? []).length > 0 ? data.userWidgets : DefaultWidgets;
      //   const newLayout = (data?.userLayout ?? []).length > 0 ? data.userLayout : DefaultLayout;
      //   saveTabLS(0, newWidgets, newLayout);
      //   setUserWidgets(newWidgets);
      //   setLayout(newLayout);
      //   setTabSettings(data?.tab ?? {});
      // }

      // setLayouts({
      //   xl: layout,
      //   lg: layout,
      //   md: layout,
      //   sm: layout,
      //   xs: layout,
      //   xxs: layout
      // });

      // setTimeout(() => {
      //   setLayouts({});
      //   setTimeout(() => {
      //     setLayouts({
      //       xl: layout,
      //       lg: layout,
      //       md: layout,
      //       sm: layout,
      //       xs: layout,
      //       xxs: layout
      //     });
      //     setIsReady(true);
      //   }, 10);
      // }, 10);
    };
    fetchData();
  }, []);

  useSub(PubSubEvent.Delete, async (wid: string) => {
    if (confirm('Delete this widget?') === true) {
      setIsReady(true);
      await deleteSettings(wid);
      setUserWidgets((userWidgets: UserWidget[]) => [...userWidgets].filter((item: UserWidget) => item.wid !== wid));
      setLayout((layout: Layout[]) => [...layout].filter((item: Layout) => item.i !== wid));
    }
  });

  // useSub(PubSubEvent.MovingToast, ({ isMoving }: { isMoving: boolean }) => {
  //   setMovingToastShowed(isMoving);
  // });

  const addWidget = (widget: Widget | null) => {
    setAddmodalShowed(false);
    if (widget) {
      setIsReady(true);
      const wid = widget?.info?.wid + '-' + generateWID();
      // userWidgets.push({
      //   wid
      // });

      const newuserWidgets = [...userWidgets];
      newuserWidgets.push({ wid });

      setUserWidgets(() => newuserWidgets);

      const newLayoutItem: Layout = { i: wid, x: 1, y: 1, w: widget?.info?.w ?? 1, h: widget?.info?.h ?? 1 };
      const newLayout = [...layout];
      newLayout.push(newLayoutItem);

      setLayout(() => newLayout);
      setLayouts({
        xl: newLayout,
        lg: newLayout,
        md: newLayout,
        sm: newLayout,
        xs: newLayout,
        xxs: newLayout
      });
    }
  };

  const onLayoutChange = (currentLayout: ReactGridLayout.Layout[], allLayouts: Layouts) => {
    if (isReady || isMoving) {
      // if (movingToastShowed) {
      // only save layout when moving widgets
      // alert('OnLayoutChange');
      saveTabLS(tab, userWidgets, currentLayout);
      // if (isSave) {
      //   alert('success');
      //   // saveTabDB(address?.toString()!, tab, title, userWidgets, currentLayout);
      // }

      localStorage.setItem(`userLayout${tab}${currentBreakpoint}`, JSON.stringify(currentLayout));
      // }

      currentLayout.forEach((item: Layout) => {
        if (isDoubleHeightWidget(item.i)) {
          item.h = 2;
        }
        if (isDoubleWidthWidget(item.i)) {
          item.w = 2;
        }
      });

      setIsReady(false);
    }
    if (isSave) {
      alert('success');
      // saveTabDB(address?.toString()!, tab, title, userWidgets, currentLayout);
    }
  };

  const ResponsiveLayout = useMemo(() => {
    return <ResponsiveGridLayout
      draggableHandle=".draggableHandle"
      className="layout"
      // layout={layout}
      // layouts={{ xl: layout, lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
      layouts={layouts}
      onBreakpointChange={(newBreakpoint, newCols) => {
        if (newBreakpoint !== currentBreakpoint) {
          // if changed => save LG; load & setLayout LG
          setLayout(getLSLayout(newBreakpoint));
          setLayouts({
            xl: getLSLayout('xl'),
            lg: getLSLayout('lg'),
            md: getLSLayout('md'),
            sm: getLSLayout('sm'),
            xs: getLSLayout('xs'),
            xxs: getLSLayout('xxs')
          });
        }
        setCurrentBreakpoint(newBreakpoint);
        // console.log('onBreakpointChange', newBreakpoint, newCols);
        // setLayouts({ ...layouts });
      }}
      // cols={4}
      breakpoints={{
        xl: 1500,
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0
      }}
      cols={{
        xl: 4,
        lg: 3,
        md: 2,
        sm: 2,
        xs: 1,
        xxs: 1
      }}
      rowHeight={200}
      // width={1600}
      margin={[20, 20]}
      onLayoutChange={onLayoutChange}
      isResizable={false}
    >
      {
        userWidgets?.map((widget: UserWidget, idx: number) => {
          const wid = widget?.wid ?? '';
          const type = wid.split('-')[0];
          const cn = ``;
          switch (type) {
            case 'analogclock':
              return (
                <div key={wid} className={cn}>
                  <AnalogClock key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'airq':
              return (
                <div key={wid} className={cn}>
                  <AirQuality key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'embed':
              return (
                <div key={wid} className={cn}>
                  <Embed key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'lofi':
              return (
                <div key={wid} className={cn}>
                  <LofiPlayer key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'note':
              return (
                <div key={wid} className={cn}>
                  <Note key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'quote':
              return (
                <div key={wid} className={cn}>
                  <Quote key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'rssreader':
              return (
                <div key={wid} className={cn}>
                  <RSSReader key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'stock':
              return (
                <div key={wid} className={cn}>
                  <StockChart key={`${wid}-main`} wid={wid} symbol="SPY" />
                </div>
              );
            case 'stockmini':
              return (
                <div key={wid} className={cn}>
                  <StockMini key={`${wid}-main`} wid={wid} symbol="SPY" />
                </div>
              );
            case 'portfoliotracker':
              return (
                <div key={wid} className={cn}>
                  <Cryptoportfoliotracker key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'crptoporpriceticker':
              return (
                <div key={wid} className={cn}>
                  <Cryptopriceticker key={`${wid}-main`} wid={wid} />
                </div>
              );
            case 'BREAK':
              return (
                <div key={idx}>
                  <div key={`${idx}-main`} className="basis-full"></div>
                </div>
              );
          }
        })}
    </ResponsiveGridLayout>
  }, [layouts, userWidgets])

  if (isSave) {
    // alert('success');
    const currentLayout = getLS(`userLayout${tab}`, DefaultLayout, true);
    saveTabDB(address?.toString()!, tab, title, userWidgets, currentLayout!);

    setIsSave(false);
  }

  return (
    <div className="overflow-y-hidden">
      <div className="flex mt-5 items-center">
        < span className="ml-5 mr-5" >
          <Button className="btn mt-4 ml-4 mb-4 dark:text-black" onClick={() => { setAddmodalShowed(true); }}>
            Add Widget
          </Button>
        </span >

        <span className="mr-5">
          <RenameDialog title={title} onTitleChange={onTitleChange} />
        </span>

        <span>
          <DeleteDialog RemoveDashboard={RemoveDashboard} />
        </span>

        <span className="flex absolute right-0 mr-5 -mt-2 z-[999]">
          <Submit />
          <KeyButton />
        </span>
      </div >

      {ResponsiveLayout}

      {
        addmodalShowed &&
        <AddWidgetModal
          onCancel={() => setAddmodalShowed(false)}
          onConfirm={addWidget}
        />
      }

      {/* {
        movingToastShowed && (
          <Toast
            content={
              <div className='dark:text-black'>
                <div>
                  Drag & Drop widgets to move them
                </div>
                <span
                  role="button"
                  className="link-minor underline"
                  onClick={() => publish(PubSubEvent.Moving, { stop: true })}
                >
                  I'm done moving
                </span>
              </div>
            }
            success
            onDismiss={() => setMovingToastShowed(false)}
          />
        )
      } */}

      {/* source: https://codepen.io/mattmarble/pen/qBdamQz */}
      {/* {
        tabSettings?.effect === 'STARFIELD' &&
        <>
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </>
      } */}

      {/* source: https://www.sliderrevolution.com/resources/css-animated-background/ */}
      {/* {
        tabSettings?.effect === 'FIREFLY' && (
          <>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
          </>
        )
      } */}
    </div >
  );
}

export default memo(Dashboardcontent); 