// BlogPage.jsx
import React from "react";

const blogData = [
  {
    id: 1,
    title: "Importance of Blood Donation",
    excerpt: "Learn why donating blood is essential and how it saves lives every day.",
    author: "Admin",
    date: "2025-12-18",
    image: "https://source.unsplash.com/400x250/?blood-donation",
  },
  {
    id: 2,
    title: "How to Prepare for Blood Donation",
    excerpt: "Tips and guidelines for donors before donating blood to ensure safety and comfort.",
    author: "Volunteer Team",
    date: "2025-12-15",
    image: "https://source.unsplash.com/400x250/?donor",
  },
  {
    id: 3,
    title: "Who Can Donate Blood?",
    excerpt: "Understand eligibility criteria for blood donation to help save lives efficiently.",
    author: "Health Expert",
    date: "2025-12-12",
    image: "https://source.unsplash.com/400x250/?healthcare",
  },
];

const Blog = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Our Blog</h1>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                <div className="flex justify-between items-center text-gray-500 text-xs">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-10">
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
