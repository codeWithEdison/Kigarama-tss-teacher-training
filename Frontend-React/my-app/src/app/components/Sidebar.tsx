'use client' 
import Link from 'next/link';
import { Home, Info, Phone, Book, Calendar, Users } from 'lucide-react'; 
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'About', path: '/about', icon: Info },
    { title: 'Contact', path: '/contact', icon: Phone },
    { title: 'Courses', path: '/courses', icon: Book },
    { title: 'Events', path: '/events', icon: Calendar },
    { title: 'Staff', path: '/staff', icon: Users },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">KTSS</h1>
        <p className="text-sm text-center text-gray-300">Kigarama Technical Secondary School</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'hover:bg-blue-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;