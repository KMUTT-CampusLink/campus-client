import React from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function ContactPage() {
  return (
    <div className="min-w-[850px] bg-gray-50">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto">
        <MainNavbar />
        <div className="container mx-auto p-6">
          {/* Page Header */}
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-10">We're here to help</p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {/* Call Us */}
            <div className="p-6 border rounded-lg shadow-lg bg-white">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-orange-500 text-white p-4 rounded-full">
                  <i className="fas fa-phone-alt text-xl"></i>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-orange-600">
                Call Us
              </h2>
              <p className="text-gray-600">1-844-GSA-4111</p>
            </div>

            {/* Chat Live */}
            <div className="p-6 border rounded-lg shadow-lg bg-white">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-orange-500 text-white p-4 rounded-full">
                  <i className="fas fa-comments text-xl"></i>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-orange-600">
                Chat with Us
              </h2>
              <p className="text-gray-600">
                We’re available Sun 7:00pm EST - Fri 7:00pm EST
              </p>
            </div>

            {/* Ask a Question */}
            <div className="p-6 border rounded-lg shadow-lg bg-white">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-orange-500 text-white p-4 rounded-full">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-orange-600">
                Ask a Question
              </h2>
              <p className="text-gray-600">
                Fill out our form and we’ll get back to you in 24 hours.
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-10">
            <p className="text-gray-600">
              Looking for someone you know?{" "}
              <a
                href="/staff-directory"
                className="text-orange-500 underline hover:text-orange-600"
              >
                Try our Staff Directory.
              </a>
            </p>
            <p className="text-gray-600 mt-2">
              For media queries, contact{" "}
              <a
                href="mailto:press@gsa.gov"
                className="text-orange-500 underline hover:text-orange-600"
              >
                example@gmail.com
              </a>{" "}
              or find your regional media contact{" "}
              <a
                href="/regional-media-contacts"
                className="text-orange-500 underline hover:text-orange-600"
              >
                Regional Media Contacts
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactPage;
