const ContactUs = () => {
  return (
    <div className="py-20 bg-red-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Have questions or want to get involved? Send us a message or reach us via phone in case of emergency.
        </p>

        {/* Main content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <form className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 hover:scale-105 transition transform duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-2xl font-semibold text-gray-900">Emergency Contact</h3>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Phone:</span> +1 (234) 567-890
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Email:</span> support@bloodhub.com
            </p>
            <p className="text-gray-600 text-lg">
              Feel free to reach us anytime. We're here to help you save lives!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
