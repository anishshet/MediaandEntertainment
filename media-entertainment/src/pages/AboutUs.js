import React from "react";
import Navbar from "../components/Navbar";
import pratikshaImage from "../img/pratiksha.jpg";
import anishImage from "../img/anish.jpg";
import sanikaImage from "../img/sanika.jpg";
import vaibhaveeImage from "../img/Vaibhavee.jpg";
import Footer from "../components/Footer";


const AboutUs = () => {
  return (
    <>
    <div className="min-h-screen bg-[#2f3337] text-white">
      {/* Navbar Component */}
      <Navbar />

      {/* Header Section */}
      <header className="lg:px-16 px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side: Description and "Can't Code" Text */}
          <div className="lg:w-1/2">
            <h1 className="text-6xl font-bold">
              Team <span className="text-green-500 text-7xl">MediaX</span>
            </h1>
            <p className="text-2xl italic text-gray-300 mt-4">
              "None of us is as smart as all of us"
            </p>
            <p className="text-lg text-gray-300 mt-4">
              Great things are rarely achieved by just one person. Usually, they are
              accomplished by a group of people, and when everyone is committed to
              the overall goal, teams move faster, are more innovative, and more
              successful. Successful teamwork is essential for anyone attempting
              complete projects successfully.
            </p>
            <p className="text-lg text-gray-300 mt-4">
              Our team members bring a diverse set of skills and expertise. With
              a combination of creativity, technical knowledge, and a passion for
              teamwork, we work collaboratively to ensure the success of every
              project.
            </p>
            <p className="text-lg text-gray-300 mt-4">
              Our primary goal is to create meaningful impact by delivering
              innovative solutions through our collective effort.
            </p>
          </div>

          {/* Right Side: Team Members Cards */}
          <div className="lg:w-1/2 flex flex-col justify-center lg:pl-16 space-y-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Team Member Card 1 */}
              <div className="bg-white text-black rounded-lg p-6 shadow-lg text-center h-[380px] flex flex-col justify-between w-[70%] mx-auto">
                <div className="relative w-full h-40 mb-4">
                  <img
                    src={sanikaImage} // Updated to actual image path
                    alt="Sanika Sasane"
                    className="absolute inset-x-0 mx-auto w-52 h-52 object-cover rounded-full border-4 border-gray-300"
                  />
                </div>
                <h2 className="text-2xl font-semibold">Sanika Sasane</h2>
                <p className="text-sm text-pink-500">Analyst and Backend Developer</p>
                <div className="flex justify-center space-x-4 mt-4 text-gray-600">
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>

              {/* Team Member Card 2 */}
              <div className="bg-white text-black rounded-lg p-6 shadow-lg text-center h-[380px] flex flex-col justify-between w-[70%] mx-auto">
                <div className="relative w-full h-40 mb-4">
                  <img
                    src={anishImage} // Updated to actual image path
                    alt="Anish Shet"
                    className="absolute inset-x-0 mx-auto w-52 h-52 object-cover rounded-full border-4 border-gray-300"
                  />
                </div>
                <h2 className="text-2xl font-semibold">Anish Shet</h2>
                <p className="text-sm text-pink-500">Front-end and Back-end Developer</p>
                <div className="flex justify-center space-x-4 mt-4 text-gray-600">
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>

              {/* Team Member Card 3 */}
              <div className="bg-white text-black rounded-lg p-6 shadow-lg text-center h-[380px] flex flex-col justify-between w-[70%] mx-auto">
                <div className="relative w-full h-40 mb-4">
                  <img
                    src={vaibhaveeImage} // Updated to actual image path
                    alt="Vaibhavee Dhavale"
                    className="absolute inset-x-0 mx-auto w-52 h-52 object-cover rounded-full border-4 border-gray-300"
                  />
                </div>
                <h2 className="text-2xl font-semibold">Vaibhavee Dhavale</h2>
                <p className="text-sm text-pink-500">Database Admin and Authentication Expert</p>
                <div className="flex justify-center space-x-4 mt-4 text-gray-600">
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>

              {/* Team Member Card 4 */}
              <div className="bg-white text-black rounded-lg p-6 shadow-lg text-center h-[380px] flex flex-col justify-between w-[70%] mx-auto">
                <div className="relative w-full h-40 mb-4">
                  <img
                    src={pratikshaImage} // Updated to actual image path
                    alt="Pratiksha Gaikwad"
                    className="absolute inset-x-0 mx-auto w-52 h-52 object-cover rounded-full border-4 border-gray-300"
                  />
                </div>
                <h2 className="text-2xl font-semibold">Pratiksha Gaikwad</h2>
                <p className="text-sm text-pink-500">
                  Documentation and Authentication Expert
                </p>
                <div className="flex justify-center space-x-4 mt-4 text-gray-600">
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    {/* Footer */}
    <Footer />

    </>
    
  );
};

export default AboutUs;
