import Image from 'next/image';
import { Target, Book, Users, Trophy } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-64 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/60 z-10" />
        <Image
          src="/api/placeholder/1200/300"
          alt="School campus"
          width={1200}
          height={300}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">About KTSS</h1>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-blue-900 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide high-quality technical education that empowers students with practical skills,
            innovative thinking, and professional ethics, preparing them for successful careers in the
            rapidly evolving technological landscape.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Book className="w-8 h-8 text-blue-900 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To be the leading technical secondary school in Rwanda, recognized for excellence in
            technical education, innovation, and producing skilled graduates who contribute
            significantly to national development.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our History</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Founded in 1998, Kigarama Technical Secondary School has been at the forefront of
            technical education in Rwanda for over two decades. What started as a small
            vocational training center has grown into a comprehensive technical secondary school
            offering various specialized programs.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through the years, we have continuously evolved our curriculum and facilities to
            meet the changing demands of industry and technology. Our commitment to excellence
            has produced thousands of skilled graduates who are now contributing to various
            sectors of the economy.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Excellence',
              description: 'Striving for the highest standards in technical education and student achievement.',
            },
            {
              title: 'Innovation',
              description: 'Embracing new technologies and creative approaches to learning and problem-solving.',
            },
            {
              title: 'Integrity',
              description: 'Maintaining high ethical standards and professional conduct in all our activities.',
            },
            {
              title: 'Collaboration',
              description: 'Working together with industry partners, community, and stakeholders.',
            },
            {
              title: 'Practical Learning',
              description: 'Emphasizing hands-on experience and real-world applications.',
            },
            {
              title: 'Inclusivity',
              description: 'Creating an environment where every student can thrive and succeed.',
            },
          ].map((value, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">School Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Jean Baptiste',
              role: 'School Principal',
              description: 'Leading KTSS with over 15 years of experience in technical education.',
            },
            {
              name: 'Prof. Marie Claire',
              role: 'Academic Director',
              description: 'Overseeing curriculum development and academic excellence.',
            },
            {
              name: 'Eng. Patrick',
              role: 'Technical Director',
              description: 'Managing technical programs and industry partnerships.',
            },
          ].map((leader, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4">
                <Image
                  src="/api/placeholder/128/128"
                  alt={leader.name}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{leader.name}</h3>
              <p className="text-blue-600 mb-2">{leader.role}</p>
              <p className="text-gray-600">{leader.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}