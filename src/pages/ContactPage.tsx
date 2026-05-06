import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageSquare, ShieldCheck, Award, ArrowLeft } from "lucide-react";

export default function ContactPage({ onBack }: { onBack: () => void }) {
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
      <div className="min-h-screen bg-[#FDFDFD] pt-40 md:pt-48 pb-24">
         <div className="container mx-auto max-w-7xl px-6 md:px-12">

            {/* Header */}
            <div className="mb-10">
               <button
                  onClick={onBack}
                  className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-medium text-base tracking-widest mb-3 transition-all"
               >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
               </button>

               <h1 className="text-[30px] font-bold text-gray-900 tracking-tight leading-none mb-2">
                  Contact <span className="text-[#9EA233]">Us.</span>
               </h1>
               <p className="text-base text-gray-500 font-medium leading-relaxed">
                  Whether you have a question or need assistance with an order, our team is here for you.
               </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">

               {/* Left Side: Information */}
               <div className="lg:flex lg:flex-col lg:justify-between lg:h-full space-y-4 lg:space-y-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                     <a 
                        href="tel:+918073516982"
                        className="bg-white p-6 rounded-[30px] border border-zinc-100 hover:border-[#9EA233]/30 hover:shadow-xl hover:shadow-[#9EA233]/5 transition-all duration-500 group relative overflow-hidden"
                     >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#9EA233]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#9EA233] transition-all duration-500 relative z-10">
                           <Phone className="w-4 h-4 text-[#9EA233] group-hover:text-white" />
                        </div>
                        <h3 className="text-[18px] font-bold text-gray-900 mb-1 relative z-10">Connect</h3>
                        <div className="space-y-0.5 relative z-10">
                           <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">+91 9160503662</p>
                           <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">+91 8073516982</p>
                        </div>
                     </a>

                     <a 
                        href="mailto:prakruthioilsales@gmail.com"
                        className="bg-white p-6 rounded-[30px] border border-zinc-100 hover:border-[#9EA233]/30 hover:shadow-xl hover:shadow-[#9EA233]/5 transition-all duration-500 group relative overflow-hidden"
                     >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#9EA233]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#9EA233] transition-all duration-500 relative z-10">
                           <Mail className="w-4 h-4 text-[#9EA233] group-hover:text-white" />
                        </div>
                        <h3 className="text-[18px] font-bold text-gray-900 mb-1 relative z-10">Email</h3>
                        <p className="text-[12px] text-gray-400 font-medium break-all relative z-10">prakruthioilsales@gmail.com</p>
                     </a>
                  </div>

                  <a 
                     href="https://www.google.com/maps/search/?api=1&query=Prakruthi+Cold+Pressed+Oils+Sahakar+Nagar+Bengaluru" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block bg-white p-6 rounded-[40px] border border-zinc-100 hover:border-[#9EA233]/30 hover:shadow-xl hover:shadow-[#9EA233]/5 transition-all duration-500 group relative overflow-hidden"
                  >
                     <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#9EA233]/5 rounded-full translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                     <div className="flex items-center gap-6 relative z-10">
                        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#9EA233] transition-all duration-500">
                           <MapPin className="w-5 h-5 text-[#9EA233] group-hover:text-white" />
                        </div>
                        <div>
                           <h3 className="text-[18px] font-bold text-gray-900 mb-1">Visit Our Main Store</h3>
                           <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                              No.839, Sahakar Nagar, Bengaluru, Karnataka <br />
                              <span className="text-[11px] font-black text-[#9EA233] uppercase tracking-widest mt-1 block">Near Nandini milk parlour</span>
                           </p>
                        </div>
                     </div>
                  </a>

                  <a 
                     href="https://wa.me/918073516982"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-zinc-50/50 p-6 rounded-[40px] flex items-center gap-6 hover:bg-[#9EA233]/5 transition-all duration-500 group border border-transparent hover:border-[#9EA233]/10"
                  >
                     <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Support Team" className="w-full h-full object-cover" />
                           </div>
                        ))}
                     </div>
                     <div>
                        <p className="text-[15px] font-bold text-gray-900">Need immediate help?</p>
                        <p className="text-[12px] text-[#9EA233] font-bold uppercase tracking-widest">Chat with an expert on WhatsApp</p>
                     </div>
                  </a>
               </div>

               {/* Right Side: Contact Form */}
               <div className="bg-white rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-zinc-100 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-6 h-6 bg-[#9EA233]/10 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-[#9EA233]" />
                     </div>
                     <h2 className="text-[20px] font-bold text-gray-900">Send a Message</h2>
                  </div>

                  {isSubmitted && (
                     <div className="mb-8 p-4 bg-[#9EA233]/10 text-[#7D8128] rounded-2xl flex items-center gap-3 animate-bounce">
                        <ShieldCheck className="w-5 h-5" />
                        <p className="text-[13px] font-bold">Thank you! Our team will contact you shortly.</p>
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-1.5">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 ml-3">Full Name</label>
                        <input required name="name" value={formData.name} onChange={handleChange} placeholder="First and last name" className="w-full h-12 px-6 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold text-sm" />
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                           <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 ml-3">Email Address</label>
                           <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full h-12 px-6 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold text-sm" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 ml-3">Mobile Number</label>
                           <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" className="w-full h-12 px-6 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold text-sm" />
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 ml-3">How can we help?</label>
                        <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Your message here..." className="w-full px-6 py-4 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold text-sm resize-none" />
                     </div>

                     <button type="submit" className="w-full bg-gray-900 text-white h-14 rounded-[20px] font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#9EA233] transition-all flex items-center justify-center gap-3">
                        <Send className="w-4 h-4" /> Send Message
                     </button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-wrap gap-6 justify-center">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-[#9EA233]" /> Secure SSL
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                        <Award className="w-4 h-4 text-[#9EA233]" /> Verified Business
                     </div>
                  </div>
               </div>
            </div>

            {/* Map Section */}
            <div className="mt-12 md:mt-20 rounded-3xl md:rounded-[60px] overflow-hidden shadow-2xl border border-zinc-100 h-[350px] md:h-[500px]">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5639555157286!2d77.5857958!3d13.063404199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae190074e80eb1%3A0xad142799ebc96848!2sMARUTHI%20JEWELLERS!5e0!3m2!1sen!2sin!4v1778039158867!5m2!1sen!2sin"
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
