import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">Kigarama Technical Secondary School</p>
            <p className="text-gray-300">P.O. Box 123</p>
            <p className="text-gray-300">Kigarama, Rwanda</p>
            <p className="text-gray-300">Phone: +250 123 456 789</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/admission" className="hover:text-white">Admission</a></li>
              <li><a href="/facilities" className="hover:text-white">Facilities</a></li>
              <li><a href="/news" className="hover:text-white">News & Events</a></li>
              <li><a href="/gallery" className="hover:text-white">Gallery</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kigarama Technical Secondary School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;