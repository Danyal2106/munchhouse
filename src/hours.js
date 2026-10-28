import { useEffect, useState } from "react";
import { place } from "./data.js";

const OPEN = place.openHour * 60;
const CLOSE = place.closeHour * 60;

export function osloNow(date = new Date()) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Oslo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(time.find((part) => part.type === "hour").value);
  const minute = Number(time.find((part) => part.type === "minute").value);
  const weekday = new Intl.DateTimeFormat("nb-NO", {
    timeZone: "Europe/Oslo",
    weekday: "long",
  })
    .format(date)
    .toLocaleLowerCase("nb-NO");

  return { minutes: hour * 60 + minute, weekday };
}

export function statusLabel(minutes) {
  const open = minutes >= OPEN && minutes < CLOSE;
  const soon = open && CLOSE - minutes <= 45;
  if (soon) return { open: true, soon: true, text: "Stenger snart, kl. 23:00" };
  if (open) return { open: true, soon: false, text: "Åpent nå, til kl. 23:00" };
  return { open: false, soon: false, text: "Stengt. Åpner kl. 11:00" };
}

export function useOsloStatus() {
  const [now, setNow] = useState(() => osloNow());

  useEffect(() => {
    const id = window.setInterval(() => setNow(osloNow()), 30000);
    return () => window.clearInterval(id);
  }, []);

  return { ...now, ...statusLabel(now.minutes) };
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Munch House` : "Munch House · Asker";
  }, [title]);
}
