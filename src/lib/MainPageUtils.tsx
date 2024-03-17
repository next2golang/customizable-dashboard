import { apiPost } from '~/utils/apiUtils';

export function saveTabLS(tab: number, userWidgets: any[], userLayout: any[]) {
  localStorage.setItem(`userLayout${tab}`, JSON.stringify(userLayout));
  localStorage.setItem(`userWidgets${tab}`, JSON.stringify(userWidgets));
}

export async function saveTabDB(address: string, tab: number, title: string, userWidgets: any[], userLayout: any[]) {
  try {
    // console.log(address);
    const body = {
      walletaddress: address,
      tab: tab,
      name: title,
      userWidgets,
      userLayout
    };

    await fetch('/api/dashboard/saveLayouts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

  } catch (error) {
    console.log('saving data error', error);
  }
  return 'sdf'
}

export async function getTabDB(address: string, tab: number) {
  try {
    const res = await fetch(`/api/dashboard/fetchLayouts?walletaddress=${address}&tab=${tab}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();

    if (resData) return resData;
    else return null;

  } catch (error) {
    console.error('fetching data error: ', error);
  }
}

export async function removeTabDB(address: string, tab: number) {
  try {
    const res = await fetch(`/api/dashboard/fetchLayouts?walletaddress=${address}&tab=${tab}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error('removing data error: ', error);
  }
}

export async function getDashboards(address: string) {
  try {
    const res = await fetch(`/api/dashboard/fetchDashboards?walletaddress=${address}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (resData) return resData;
    else return null;

  } catch (error) {
    console.error('removing data error: ', error);
  }
}
