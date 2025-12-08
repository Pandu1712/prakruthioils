import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Enter a valid email address.",
      phone:
        /^[0-9]{10}$/.test(formData.phone) && !/[A-Za-z]/.test(formData.phone)
          ? ""
          : "Enter a valid 10-digit phone number.",
      message: formData.message ? "" : "Message is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") if (/[^0-9]/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const msg = `📩 *New Contact Request*\n\n👤 *Name*: ${formData.name}\n📧 *Email*: ${formData.email}\n📱 *Phone*: ${formData.phone}\n\n💬 *Message*: ${formData.message}`;
    const whatsappNumber = "918073516982";
    const encodedMessage = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="bg-[#f6f4ee] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-5">

        {/* HEADER */}
        <div className="text-center mb-20">
         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Get In<span className="text-[#9EA233]"> Touch</span>
        </h1>
          <p className="text-lg md:text-xl text-[#6e6a5e] mt-3 max-w-2xl mx-auto">
            We’re always happy to help — reach out anytime for products, support, or inquiries.
          </p>
        </div>

        {/* FLEX LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-14">

          {/* LEFT SIDEBAR – NEW STYLE */}
          <aside
            className="
              bg-white shadow-xl rounded-3xl px-8 py-12
              border border-[#e2dfd5]
              flex flex-col gap-10
            "
          >
            <div>
              <h2 className="text-2xl font-bold text-[#3d3b2f] mb-6">
                Contact Information
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    desc: "SrikrishnaNandhu Nilayam, Opp Royamart Road, Tatanagar, Bengaluru, Karnataka 560092 LANDMARK: Near Playzone Sahakar Nagar"
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    desc: "+91 9160503662\n+91 8073516982",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    desc: "prakruthioilsales@gmail.com",
                  },
                  {
                    icon: Clock,
                    title: "Hours",
                    desc: "Mon–Sun: 8:30 AM – 1 PM\nEvening: 3:30 PM – 8:30 PM",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 bg-[#e8e6df] rounded-xl shadow-sm">
                      <item.icon className="w-6 h-6 text-[#7a775e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#3d3b2f]">{item.title}</h3>
                      <p className="text-[#6e6a5e] whitespace-pre-line">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#3d3b2f] mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3">
                {[
                  "100% Natural & Organic Oils",
                  "Premium Quality Ghee & Millets",
                  "Fast & Safe Delivery",
                  "Cold-Pressed Traditional Methods",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-[#7a775e]" />
                    <span className="text-[#6e6a5e]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* FORM PANEL – NEW STYLE */}
          <div
            className="
              bg-white rounded-3xl shadow-xl border border-[#e5e1d8]
              px-10 py-12
            "
          >
            <h2 className="text-3xl font-bold text-[#3d3b2f] mb-8">
              Send a Message
            </h2>

            {isSubmitted && (
              <div className="p-4 bg-[#e4f5d4] text-[#4d6b36] border border-[#c9e8a8] rounded-xl mb-6">
                Message sent successfully! We will reach out shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* INPUTS */}
              {[
                { name: "name", type: "text", placeholder: "Your Name" },
                { name: "email", type: "email", placeholder: "Your Email" },
                { name: "phone", type: "text", placeholder: "10-digit phone number", maxLength: 10 },
              ].map((field, i) => (
                <div key={i}>
                  <label className="text-[#4a483d] font-medium capitalize">
                    {field.name} *
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    maxLength={field.maxLength}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="
                      w-full mt-2 p-4
                      rounded-2xl border border-[#ccc7bb]
                      bg-[#faf9f6]
                      focus:ring-2 focus:ring-[#cdd8a0]
                      focus:outline-none
                      transition
                    "
                  />
                  {errors[field.name as keyof typeof errors] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name as keyof typeof errors]}
                    </p>
                  )}
                </div>
              ))}

              {/* MESSAGE */}
              <div>
                <label className="text-[#4a483d] font-medium">Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="
                    w-full mt-2 p-4
                    rounded-2xl border border-[#ccc7bb]
                    bg-[#faf9f6]
                    focus:ring-2 focus:ring-[#cdd8a0]
                    focus:outline-none resize-none
                  "
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="
                  w-full py-4 text-lg font-semibold text-white
                  rounded-2xl bg-[#8da84a]
                  hover:bg-[#7c943f]
                  transition shadow-md
                "
              >
                <div className="flex gap-2 items-center justify-center">
                  <Send className="w-5 h-5" /> Send Message
                </div>
              </button>
            </form>
          </div>
        </div>

        {/* MAP SECTION – NEW LAYOUT */}
        <div className="mt-20 px-4">
  <div className="flex flex-col lg:flex-row gap-8">
    {/* Google Map - Left */}
    <div className="flex-1 h-[420px] rounded-3xl overflow-hidden shadow-xl border border-[#dcd7ca]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7259670347453!2d77.5766881!3d13.053107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae175cff580f3f%3A0xfb8c7eb615a60462!2sPrakruthi%20Cold%20Pressed%20Oils!5e0!3m2!1sen!2sin!4v1764400551105!5m2!1sen!2sin"
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        title="Office Location"
      />
    </div>

    {/* Banner Image - Right */}
    <div className="flex-1 h-[420px] rounded-3xl overflow-hidden shadow-xl">
      <img
        src="https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png"
        alt="Banner"
        className="w-full h-full "
      />
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
