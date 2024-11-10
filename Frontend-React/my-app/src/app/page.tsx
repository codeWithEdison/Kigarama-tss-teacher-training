import Image from 'next/image';
import { Calendar, Users, BookOpen, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/60 z-10" />
        <Image
          src="/api/placeholder/1200/400"
          alt="School building"
          width={1200}
          height={400}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Welcome to KTSS</h1>
            <p className="text-xl md:text-2xl">Empowering Future Technicians</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Students', value: '500+' },
          { icon: Calendar, label: 'Years of Excellence', value: '25+' },
          { icon: BookOpen, label: 'Courses', value: '12' },
          { icon: Award, label: 'Graduates', value: '2000+' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
            <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-900" />
            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Featured Programs */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Mechanical Engineering',
              description: 'Learn advanced mechanical systems and manufacturing processes.',
            },
            {
              title: 'Electrical Installation',
              description: 'Master electrical systems, installations, and maintenance.',
            },
            {
              title: 'Computer Technology',
              description: 'Develop skills in programming, networking, and hardware.',
            },
          ].map((program, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News & Events */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Annual Technical Exhibition',
              date: 'October 15, 2024',
              description: 'Showcase of student projects and innovations.',
            },
            {
              title: 'Industry Partnership Program',
              date: 'September 1, 2024',
              description: 'New collaboration with leading technical companies.',
            },
          ].map((event, index) => (
            <div key={index} className="border p-6 rounded-lg">
              <p className="text-sm text-blue-600 mb-2">{event.date}</p>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}