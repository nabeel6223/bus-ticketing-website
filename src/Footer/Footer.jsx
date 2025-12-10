import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8 mt-40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hop On Bus Ticketing. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
