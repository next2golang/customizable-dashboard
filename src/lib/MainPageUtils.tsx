import { apiPost } from '~/utils/apiUtils';

export function saveTabLS(tab: number, userWidgets: any[], userLayout: any[]) {
  localStorage.setItem(`userLayout${tab}`, JSON.stringify(userLayout));
  localStorage.setItem(`userWidgets${tab}`, JSON.stringify(userWidgets));
}

export async function saveTabDB(tab: number, title: string, userWidgets: any[], userLayout: any[]) {
  try {
    console.log('saving');
    const body = {
      tab: tab,
      title: title,
      userWidgets,
      userLayout
    };

    await fetch('/api/user/saveLayouts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

  } catch (error) {
    console.log('saving data error', error);
  }
}
