import React from "react";
import { FaRegCopyright } from "react-icons/fa6";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import {MdEmail} from "react-icons/md";

const Footer = () => {
  return (
    <footer className="text-lg p-4 bg-white shadow-2xl">
      <div className="coontainer mx-auto flex items-center justify-center gap-1 text-2xl font-semibold">
        All Rights Reserved{" "}
        <span>
          {" "}
          <FaRegCopyright />{" "}
        </span>{" "}
        Chirag Khaitan
      </div>
      <div className="flex gap-2 mt-2 items-center justify-center text-2xl">
        <a href="https://www.linkedin.com/in/chirag-khaitan" target="_blank" className="hover:scale-125 transition-all duration-200">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/thechiragkhaitan" target="_blank" className="hover:scale-125 transition-all duration-200">
          <FaInstagram />
        </a>
        <a href="https://github.com/TheChiragKhaitan" target="_blank" className="hover:scale-125 transition-all duration-200">
          <FaGithub />
        </a>
        <a href="mailto:chiragkhaitan2014@gmail.com" className="hover:scale-125 transition-all duration-200">
          <MdEmail />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
