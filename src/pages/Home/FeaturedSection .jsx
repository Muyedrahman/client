import { Heart, ShieldCheck, Users } from "lucide-react";

const FeaturedSection = () => {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-red-600" />,
      title: "Why Donate Blood?",
      desc: "One bag of blood can save up to three lives. Your donation can give someone a new lease on life.",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-red-600" />,
      title: "Safe & Secure Process",
      desc: "Blood donation is completely safe. All necessary safety protocols are followed to ensure a secure donation.",
    },
    {
      icon: <Users className="w-12 h-12 text-red-600" />,
      title: "Join Our Donor Community",
      desc: "Connect with thousands of donors and become a life-saver. Our community is always ready to support those in need.",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Featured Highlights
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Learn about the importance of blood donation and the safe process — everything is easy and accessible on our platform.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-red-50 border border-red-100 shadow-sm
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturedSection;
