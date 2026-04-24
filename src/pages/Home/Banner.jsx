import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full bg-red-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
          Save a Life —  
          <span className="text-red-600"> Donate Blood Today</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg md:text-xl">
          Join our community of life-savers. Your little help can change someone’s life.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">

          {/* Join as Donor */}
          <Link
            to="/signup"
            className="bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow 
            transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-red-700"
          >
            Join as a Donor
          </Link>

          {/* Search Donors (Border Animation + Scale) */}
          <Link
            to="/search-page"
            className="relative border border-red-600 text-red-600 font-semibold px-8 py-3 rounded-full 
            overflow-hidden transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">Search Donors</span>

            {/* Slide Animation BG */}
            <span className="absolute inset-0 bg-red-100 translate-x-full hover:translate-x-0 
              transition-transform duration-300 ease-out"></span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Banner;
