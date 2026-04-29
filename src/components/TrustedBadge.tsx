import { ShieldCheck } from "lucide-react";

interface TrustedBadgeProps {
  className?: string;
  textColor?: string;
  subtextColor?: string;
}

export default function TrustedBadge({ 
  className = "", 
  textColor = "text-zinc-800",
  subtextColor = "text-emerald-600"
}: TrustedBadgeProps) {
  return (
    <div className={`flex items-center gap-2 shadow-sm rounded-full px-3 py-1.5 border w-fit transition-all hover:shadow-md ${className.includes('bg-') ? '' : 'bg-white/95 backdrop-blur-sm'} ${className.includes('border-') ? '' : 'border-black/5'} ${className}`}>
      <ShieldCheck className="text-emerald-600 w-4 h-4 flex-shrink-0" />
      <div className="flex flex-col justify-center">
        <p className={`font-semibold text-[9px] uppercase tracking-widest leading-tight ${textColor}`}>Trusted & Secure</p>
        <p className={`font-semibold text-[9px] uppercase tracking-widest leading-tight ${subtextColor}`}>Certified Protection</p>
      </div>
    </div>
  );
}
