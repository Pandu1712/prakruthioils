import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ShieldCheck, Award } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `📩 *New Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Message:* ${formData.message}`;
    window.open(`https://wa.me/918073516982?text=${encodeURIComponent(msg)}`, "_blank");
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFFEF9] pt-32 md:pt-40 pb-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Cinematic Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[12px] md:text-[14px] font-bold text-[#9EA233] uppercase tracking-[0.4em] mb-4 md:mb-6 block animate-fadeIn">Get in Touch</span>
          <h1 className="text-[32px] md:text-[48px] font-bold text-gray-900 tracking-tight leading-tight mb-6 md:mb-8 animate-slideUp">
            Let's Start a <br />
            <span className="text-[#9EA233]">Healthy Conversation.</span>
          </h1>
          <p className="text-[14px] md:text-[16px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Whether you have a question about our traditional wood-pressing methods or need assistance with an order, our team is here for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start max-w-6xl mx-auto">
          
          {/* Left Side: Information */}
          <div className="space-y-12 animate-fadeInLeft">
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[40px] border border-gray-100 hover:border-[#9EA233]/20 transition-all group">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#9EA233] transition-colors">
                     <Phone className="w-5 h-5 text-[#9EA233] group-hover:text-white" />
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">Connect</h3>
                  <p className="text-[14px] text-gray-500 font-bold uppercase tracking-widest">+91 9160503662</p>
                  <p className="text-[14px] text-gray-500 font-bold uppercase tracking-widest">+91 8073516982</p>
               </div>

               <div className="bg-white p-8 rounded-[40px] border border-gray-100 hover:border-[#9EA233]/20 transition-all group">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#9EA233] transition-colors">
                     <Mail className="w-5 h-5 text-[#9EA233] group-hover:text-white" />
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">Email</h3>
                  <p className="text-[14px] text-gray-500 font-medium break-all underline decoration-[#9EA233]/30">prakruthioilsales@gmail.com</p>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[50px] border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#9EA233]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex items-start gap-6 relative z-10">
                  <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                     <MapPin className="w-6 h-6 text-[#9EA233]" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-4">Visit Our Main Store</h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed pr-8">
                       No.839, 14th Cross Rd, A Block, <br />
                       Sahakar Nagar, Bengaluru, Karnataka <br />
                       <span className="text-[14px] font-black text-[#9EA233] uppercase tracking-widest mt-2 block">Near Nandini milk parlour</span>
                    </p>
                  </div>
               </div>
            </div>

            <div className="bg-gray-50 p-10 rounded-[50px] flex items-center gap-10">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Support Team" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <div>
                  <p className="text-[16px] font-bold text-gray-900">Need immediate help?</p>
                  <p className="text-[14px] text-[#9EA233] font-bold uppercase tracking-widest">Chat with an expert on WhatsApp</p>
               </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white rounded-[60px] p-12 border border-gray-100 shadow-2xl animate-fadeInRight">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-8 bg-[#9EA233]/10 rounded-full flex items-center justify-center">
                   <MessageSquare className="w-4 h-4 text-[#9EA233]" />
                </div>
                <h2 className="text-[24px] font-bold text-gray-900">Send a Message</h2>
             </div>

             {isSubmitted && (
               <div className="mb-10 p-6 bg-[#9EA233]/10 text-[#7D8128] rounded-3xl flex items-center gap-4 animate-bounce">
                  <ShieldCheck className="w-6 h-6" />
                  <p className="text-[14px] font-bold">Thank you! Our team will contact you shortly.</p>
               </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[14px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                   <input required name="name" value={formData.name} onChange={handleChange} placeholder="First and last name" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[14px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-black uppercase tracking-widest text-gray-400 ml-4">Mobile Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold" />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[14px] font-black uppercase tracking-widest text-gray-400 ml-4">How can we help?</label>
                   <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Your message here..." className="w-full px-8 py-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold resize-none" />
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white h-20 rounded-[30px] font-black text-[14px] uppercase tracking-[0.3em] hover:bg-[#9EA233] transition-all flex items-center justify-center gap-4">
                   <Send className="w-5 h-5" /> Send Message
                </button>
             </form>

             <div className="mt-12 pt-10 border-t border-gray-50 flex flex-wrap gap-8 justify-center">
                <div className="flex items-center gap-3 text-[12px] font-bold text-gray-300 uppercase tracking-widest">
                   <ShieldCheck className="w-5 h-5 text-[#9EA233]" /> Secure SSL
                </div>
                <div className="flex items-center gap-3 text-[12px] font-bold text-gray-300 uppercase tracking-widest">
                   <Award className="w-5 h-5 text-[#9EA233]" /> Verified Business
                </div>
             </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-32 rounded-[60px] overflow-hidden shadow-2xl border border-gray-100 h-[500px] animate-fadeIn">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7259670347453!2d77.5766881!3d13.053107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae175cff580f3f%3A0xfb8c7eb615a60462!2sPrakruthi%20Cold%20Pressed%20Oils!5e0!3m2!1sen!2sin!4v1764400551105!5m2!1sen!2sin"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
            loading="lazy"
            allowFullScreen
            title="Heritage Store Location"
          />
        </div>
      </div>
    </div>
  );
}
