import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Mail, Lock, AlertCircle, ArrowRight, Loader2, KeyRound } from 'lucide-react';

interface AdminLoginPageProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

const ADMIN_EMAIL = 'Prakruthioilsales@gmail.com';
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || 're_aZKtKcur_L6UE5Gyz8nrXkGWgAFQaNjLs';

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBack, onLoginSuccess }) => {
  const { isAdmin, loading: authLoading, signInAdmin } = useAdminAuth();
  
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otpSent, setOtpSent] = useState('');
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    // If already logged in as admin, redirect
    if (isAdmin && !authLoading) {
      onLoginSuccess();
    }
  }, [isAdmin, authLoading, onLoginSuccess]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setMessage({ type: 'error', text: 'Unauthorized email address.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      // Send via custom proxy mapped to Resend API
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Admin Login <onboarding@resend.dev>',
          to: [email],
          subject: 'Your Admin Login OTP code',
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
              <h2 style="color: #16a34a;">Prakruthi cold pressed oils Admin</h2>
              <p>Your one-time password (OTP) to log into the Admin Dashboard is:</p>
              <h1 style="font-size: 32px; letter-spacing: 4px; background: #f3f4f6; padding: 12px; border-radius: 8px; display: inline-block;">${generatedOtp}</h1>
              <p>This code is valid for your current session.</p>
            </div>
          `
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email. Ensure the server Proxy is set up in development.');
      }

      setOtpSent(generatedOtp);
      setStep('otp');
      setMessage({ type: 'success', text: `OTP sent to ${email}` });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', text: error.message || 'Failed to send OTP.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpInput.join('');
    
    if (enteredOtp.length !== 6) {
      setMessage({ type: 'error', text: 'Please enter all 6 digits.' });
      return;
    }

    if (enteredOtp === otpSent) {
      setMessage({ type: 'success', text: 'Login successful!' });
      signInAdmin('valid_session_token_' + Date.now());
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } else {
      setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' });
    }
  };

  const updateOtpDigit = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otpInput];
    // Take only the last character if they pasted or typed multiple
    newOtp[index] = value.substring(value.length - 1);
    setOtpInput(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            {step === 'email' ? (
              <Lock className="w-8 h-8 text-green-600" />
            ) : (
              <KeyRound className="w-8 h-8 text-green-600" />
            )}
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 'email' ? 'Authorized personnel only' : 'Enter the OTP sent to your email'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {message && (
            <div className={`mb-6 p-4 rounded-md flex items-start gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
              message.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {step === 'email' ? (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Admin Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                    placeholder="admin@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 transition-colors duration-200"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send OTP Code
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOTP}>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center mb-4">
                  6-Digit OTP Code
                </label>
                <div className="flex justify-between gap-2 max-w-[320px] mx-auto">
                  {otpInput.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500 shadow-sm"
                      value={digit}
                      onChange={(e) => updateOtpDigit(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoComplete="off"
                      maxLength={2}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={otpInput.some(d => !d)}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 transition-colors duration-200"
                >
                  Verify and Login
                </button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setOtpInput(['', '', '', '', '', '']);
                    setMessage(null);
                  }}
                  className="text-sm font-medium text-gray-500 hover:text-green-600"
                >
                  Used wrong email? Go back
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={onBack}
              className="w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              &larr; Return to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
