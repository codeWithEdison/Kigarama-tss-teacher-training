import React from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon,
  DocumentCheckIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://ur-ams.vercel.app/static/media/UR_logo.1424d0ed3725a911953e.png" 
              alt="UR Logo" 
              className="h-10"
            />
            <div>
              <h1 className="text-xl font-semibold">UR-Electify</h1>
              <p className="text-sm text-gray-500">Student Election Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700">Home</a>
            <a href="#" className="text-gray-700">About</a>
            <a href="#" className="text-gray-700">Election Guide</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Login / Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Student Election Portal
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Your gateway to participating in University of Rwanda's democratic process. 
            Vote for your representatives and shape the future of your institution.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Voting Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DocumentCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Cast Your Vote</h3>
                <p className="text-gray-600">Submit your vote securely for ongoing elections</p>
              </div>
            </div>
          </div>

          {/* Candidate Registration */}
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Candidate Registration</h3>
                <p className="text-gray-600">Apply for available leadership positions</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Election Results</h3>
                <p className="text-gray-600">View real-time election statistics and results</p>
              </div>
            </div>
          </div>

          {/* Election Schedule */}
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <ClockIcon className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Election Schedule</h3>
                <p className="text-gray-600">Check important dates and deadlines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Request Button */}
        <div className="text-center mb-16">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Submit your Request
          </button>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Steps to participate in election</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                number: '1',
                title: 'Login & Register',
                description: 'Use your student credentials'
              },
              {
                number: '2',
                title: 'Choose Service',
                description: 'Vote or apply as candidate'
              },
              {
                number: '3',
                title: 'Requirements',
                description: 'Review eligibility criteria'
              },
              {
                number: '4',
                title: 'Submit Request',
                description: 'Complete your submission'
              },
              {
                number: '5',
                title: 'Verification',
                description: 'Wait for confirmation'
              },
              {
                number: '6',
                title: 'Completion',
                description: 'Receive confirmation'
              }
            ].map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  {step.number !== '6' && (
                    <div className="flex-1 h-1 bg-blue-200 ml-2"></div>
                  )}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              "What are the requirements to vote?",
              "How do I register as a candidate?",
              "When are the next elections?",
              "How is voting security ensured?",
              "What positions are available?",
              "How are results calculated?",
              "Can I change my vote after submission?",
              "What if I face technical issues?"
            ].map((question, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center"
              >
                <span>{question}</span>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>UR-Electify - Integrated Student Election Management System</p>
          <p className="text-gray-400 text-sm mt-2">University of Rwanda © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;