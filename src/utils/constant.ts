import {
  Calendar1,
  LucideIcon,
  PersonStanding,
  Settings,
  Target,
  UserRound,
} from "lucide-react";

type Link = {
  name: string;
  url: string;
  icon: LucideIcon;
}[];

export const DOCTORLINKS: Link = [
  {
    name: "overview",
    url: "/doctor/dashboard",
    icon: Target,
  },
  {
    name: "patients",
    url: "/doctor/patients",
    icon: UserRound,
  },
  {
    name: "appointments",
    url: "/doctor/appointments",
    icon: Calendar1,
  },
  {
    name: "settings",
    url: "/doctor/settings",
    icon: Settings,
  },
];
export const PATIENTLINKS: Link = [
  {
    name: "overview",
    url: "/patient/dashboard",
    icon: Target,
  },
  {
    name: "doctors",
    url: "/patient/doctors",
    icon: PersonStanding,
  },
  {
    name: "appointments",
    url: "/patient/appointments",
    icon: UserRound,
  },
  {
    name: "settings",
    url: "/patient/settings",
    icon: Settings,
  },
];
