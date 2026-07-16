import type { ComponentType } from "react";
import {
  PackageIcon,
  ShoppingBagIcon,
  TruckIcon,
  ClockIcon,
} from "@/constants/icons";
import { FileText, ShoppingBasket } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: ComponentType<{ className?: string }>;
}

export const services: Service[] = [
  {
    slug: "food-delivery",
    title: "Food Delivery",
    description: "Craving something specific? Tell me the spot and I'll bring your order back hot.",
    image: "/images/services/food-delivery.jpg",
    icon: ShoppingBagIcon,
  },
  {
    slug: "grocery-runs",
    title: "Grocery Runs",
    description: "Send your list. I'll pick through the market or store and get everything on it.",
    image: "/images/services/grocery-runs.jpg",
    icon: ShoppingBasket,
  },
  {
    slug: "parcel-delivery",
    title: "Parcel Delivery",
    description: "A package waiting to be picked up and dropped somewhere in Uyo? Consider it done.",
    image: "/images/services/parcel-delivery.jpg",
    icon: PackageIcon,
  },
  {
    slug: "document-delivery",
    title: "Document Delivery",
    description: "Contracts, files, printouts. Time-sensitive paperwork handled with care.",
    image: "/images/services/document-delivery.jpg",
    icon: FileText,
  },
  {
    slug: "market-runs",
    title: "Market Runs",
    description: "Don't have time for the market today? I'll go, haggle, and bring it all back.",
    image: "/images/services/market-runs.jpg",
    icon: ClockIcon,
  },
  {
    slug: "custom-errands",
    title: "Custom Errands",
    description: "If it's something else entirely, just tell me. If it's in Uyo, I can probably get it.",
    image: "/images/services/custom-errands.jpg",
    icon: TruckIcon,
  },
];
