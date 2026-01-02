import { ShieldCheck } from "lucide-react";

export default function TrustedBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 border border-gray-200">
        <ShieldCheck className="text-green-600 w-5 h-5" />
        <div className="text-sm leading-tight">
          <p className="font-semibold text-gray-800">Trusted & Secure</p>
          <p className="text-[#9EA233] text-xs">Certified Protection</p>
        </div>
      </div>
    </div>
  );
}
