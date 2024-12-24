import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/lottie-json.json"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#2c3e50] text-[#3498db] border-[1px] border-[#3498dbaa]",
  "bg-[#c0392b] text-[#e74c3c] border-[1px] border-[#e74c3caa]",
  "bg-[#27ae60] text-[#2ecc71] border-[1px] border-[#2ecc71aa]",
  "bg-[#2c3e50] text-[#3498db] border-[1px] border-[#3498dbaa]"
]

interface GetColor {
  (color: number): string;
}

export const getColor: GetColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
}

export const animationDefaultOptions = {
loop:true,
autoplay:true,
animationData:animationData,

}