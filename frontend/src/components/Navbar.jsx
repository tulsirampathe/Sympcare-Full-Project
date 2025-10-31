import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  useEffect(() => {
    // Inject CSS to hide "Powered by" label and link
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hide Google Translate "Powered by" text and link */
      #google_translate_element .goog-logo-link,
      #google_translate_element .goog-te-gadget span {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Load Google Translate script dynamically
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Initialize after script loads
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="md:flex items-center gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/services">
          <li className="py-1">SERVICES</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        {/* <NavLink to="/ayur-therapies">
          <li className="py-1">AYUR-THERAPIES</li>
        </NavLink> */}
        <NavLink to="/health-education">
          <li className="py-1">HEALTH EDUCATION</li>
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {/* Google Translate (Visible on All Devices) */}
        <div
          id="google_translate_element"
          className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white shadow-sm hover:shadow-md transition duration-300 hidden md:block"
        ></div>

        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="User" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* ---- Mobile Menu ---- */}
        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMenu(false)}
              />
              <motion.div
                className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col justify-between"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="flex items-center justify-between px-5 py-5 border-b">
                    <img
                      src={assets.logo}
                      alt="Logo"
                      className="w-32 cursor-pointer"
                      onClick={() => {
                        navigate("/");
                        setShowMenu(false);
                      }}
                    />
                    <img
                      src={assets.cross_icon}
                      alt="Close"
                      className="w-7 cursor-pointer"
                      onClick={() => setShowMenu(false)}
                    />
                  </div>

                  <ul className="flex flex-col gap-4 mt-6 px-5 font-medium text-gray-700">
                    {[
                      ["HOME", "/"],
                      ["SERVICES", "/services"],
                      ["ALL DOCTORS", "/doctors"],
                      ["HEALTH EDUCATION", "/health-education"],
                      ["ABOUT", "/about"],
                      ["CONTACT", "/contact"],
                    ].map(([label, path]) => (
                      <NavLink
                        key={label}
                        to={path}
                        onClick={() => setShowMenu(false)}
                        className={({ isActive }) =>
                          `block py-2 px-2 rounded-md hover:bg-blue-50 ${
                            isActive ? "text-blue-600 font-semibold" : ""
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </ul>
                </div>

                <div className="p-5 border-t flex flex-col gap-3">
                  <div
                    id="google_translate_element"
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white shadow-sm"
                  ></div>

                  {token ? (
                    <button
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition-all duration-300"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setShowMenu(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition-all duration-300"
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
