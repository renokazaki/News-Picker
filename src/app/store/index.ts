import { atom } from "jotai";
import type { DateType } from "../type/News.type";

export const selectedDateAtom = atom<DateType | undefined>(undefined);
