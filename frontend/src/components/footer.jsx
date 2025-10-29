import React from "react";
import { Link } from "react-router-dom";
import { X, Instagram, Facebook } from "lucide-react";
import LOGO from "../assets/impactin_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#225740] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-white/30">
          {/* Kolom 1 - Tagline + Logo */}
          <div>
            <p className="text-2xl font-bold leading-snug mb-6">
              You can help <br /> shape the future
            </p>

            <Link to="/home">
              <img
                src={LOGO}
                alt="Impact.in Logo"
                className="w-36 mb-1 object-contain"
              />
            </Link>

            <p className="text-xs text-gray-200 mt-6">© Copyright 2025</p>
          </div>

          {/* Kolom 2 - Mission */}
          <div className="text-sm text-gray-100 leading-relaxed max-w-md">
            <p>
              “Impact.in is a platform that connects volunteers with projects
              focused on environmental sustainability (SDGs 13, 14, 15). Our
              mission is simple: transforming passion into tangible impact for
              the Earth.”
            </p>
          </div>

          {/* Kolom 3 - Menu + Social Icons */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex gap-12 text-sm">
              <nav className="space-y-2 text-gray-200 text-right">
                <p className="font-semibold text-white">Home</p>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </nav>

              <nav className="space-y-2 text-gray-200 text-right">
                <p className="font-semibold text-white">Privacy Policy</p>
                <Link to="/terms" className="hover:text-white transition">
                  Terms of Services
                </Link>
              </nav>
            </div>

            {/* Icons */}
            <div className="flex space-x-4">
              <X className="w-5 h-5 cursor-pointer hover:text-white/60 transition" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white/60 transition" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white/60 transition" />
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-200 mt-4">
          Impact.in — Grow impact, protect our home 🌍
        </p>
      </div>
    </footer>
  );
};

export default Footer;
