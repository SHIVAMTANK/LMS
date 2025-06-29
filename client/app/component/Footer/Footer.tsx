import Link from "next/link"
import type React from "react"

type Props = {}

const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="w-[90%] md:w-[85%] m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">About</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/story" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-400 hover:text-white transition-colors duration-200">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Social Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  github
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">
                  <span className="text-white">Call Us:</span> 1-885-665-2022
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  <span className="text-white">Address:</span> +7011 Vermont Ave, Los Angeles, CA 90044
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  <span className="text-white">Mail Us:</span>{" "}
                  <Link
                    href="mailto:hello@elearning.com"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    hello@elearning.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 ELearning. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
