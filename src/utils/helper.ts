import { parse } from 'url';

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateTimes = (day?: Date) => {
  if (!day) day = new Date();
  const nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1); // same time in next day
  nextDay.setUTCHours(0, 0, 0, 0); // first time in next day

  const dayAfterNextDay = new Date(nextDay);
  dayAfterNextDay.setDate(nextDay.getDate() + 1);

  return {
    start_time: nextDay,
    end_time: dayAfterNextDay,
    reward_time: new Date(dayAfterNextDay.getTime() + 3600000),
  };
};

export const convertISOString2Seconds = (isoTime: string | Date): number =>
  Math.floor(new Date(isoTime).getTime() / 1000);

  
// param utils

function encodeQueryData(data: any) {
  const ret = [];
  for (const d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

export const getQueryParams = (url: string) => {
  return parse(url, true).query;
};

export const getPathNameUrl = (url: string) => parse(url).pathname;

export const buildUrl = (redirect_uri: string, data: any) =>
  redirect_uri + '?' + encodeQueryData(data);
