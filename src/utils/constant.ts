import {
  Calendar1,
  LucideIcon,
  PersonStanding,
  Settings,
  Target,
  UserRound,
} from "lucide-react";

type NavLinks = {
  name: string;
  url: string;
  icon: LucideIcon;
}[];

export const DOCTORLINKS: NavLinks = [
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
] as const;
export const PATIENTLINKS: NavLinks = [
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

export const ROLE_ROUTES = {
  patient: "/patient/dashboard",
  doctor: "/doctor/dashboard",
  admin: "/admin/dashboard",
} as const;
export type Role = keyof typeof ROLE_ROUTES;

export const DOCTOR_ROUTES = {
  dashboard: "/doctor/dashboard",
  patients: "/doctor/patients",
  appointments: "/doctor/appointments",
  settings: "/doctor/settings",
} as const;

export type DoctorRoute = (typeof DOCTOR_ROUTES)[keyof typeof DOCTOR_ROUTES];
