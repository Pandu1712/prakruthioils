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
    <div className={`flex items-center gap-2 shadow-sm rounded-full px-4 py-2 border w-fit ${className.includes('bg-') ? '' : 'bg-white'} ${className.includes('border-') ? '' : 'border-zinc-200'} ${className}`}>
      <ShieldCheck className="text-emerald-600 w-5 h-5 flex-shrink-0" />
      <div className="text-base leading-tight">
        <p className={`font-medium text-xs uppercase tracking-widest ${textColor}`}>Trusted & Secure</p>
        <p className={`font-medium text-xs uppercase tracking-widest ${subtextColor}`}>Certified Protection</p>
      </div>
    </div>
  );
}
