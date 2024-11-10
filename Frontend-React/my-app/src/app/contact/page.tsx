'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-12">
      {/* Contact Information */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: MapPin,
            title: 'Our Location',
            content: 'Kigarama Sector, Eastern Province, Rwanda',
          },
          {
            icon: Phone,
            title: 'Phone Number',
            content: '+250 123 456 789',
          },
          {
            icon: Mail,
            title: 'Email Address',
            content: 'info@ktss.ac.rw',
          },
          {
            icon: Clock,
            title: 'Working Hours',
            content: 'Mon - Fri: 8:00 AM - 5:00 PM',
          },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <item.icon className="w-6 h-6 text-blue-900" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </section>

      {/* Contact Form and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Message subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Map Section */}
        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Location</h2>
          <div className="h-96 bg-gray-200 rounded-lg">
            {/* Replace this div with an actual map integration */}
            <div className="w-full h-full rounded-lg flex items-center justify-center text-gray-500">
              Map Integration
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Getting Here</h3>
            <p className="text-gray-600">
              We are located in the Kigarama Sector of the Eastern Province. Our campus is easily
              accessible by public transport and private vehicle. Look for the main entrance with
              our school sign.
            </p>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: 'What are the admission requirements?',
              answer: 'Admission requirements include completion of O-Level education with good grades in Mathematics and Sciences.',
            },
            {
              question: 'Do you offer accommodation facilities?',
              answer: 'Yes, we provide boarding facilities for both male and female students with modern amenities.',
            },
            {
              question: 'What technical programs do you offer?',
              answer: 'We offer programs in Mechanical Engineering, Electrical Installation, and Computer Technology.',
            },
          ].map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}