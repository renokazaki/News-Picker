import { atom } from "jotai";
import type { DateType } from "@/types/News.type";

export const selectedDateAtom = atom<DateType | undefined>(undefined);
