import React from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function ContactPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-gray-500 text-center mb-10">
            Detailed information
          </p>

          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Building: KMUTT Library
            </h2>
            <p className="text-lg mb-2">
              <strong>Address:</strong> 126 Pracha Uthit Rd., Bangmod, Thungkru,
              Bangkok 10140
            </p>
            <p className="text-lg mb-2">
              <strong>Email:</strong> KmuttLibrary@kmutt.ac.th
            </p>
            <p className="text-lg">
              <strong>Tel:</strong> 000 - 000 - 0000
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-lg font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows="5"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactPage;
