export function About({ darkMode }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
        <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-blue-700'}`}>About MyNews</h1>
        <div className={`space-y-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>
            Welcome to MyNews, a modern and elegant news aggregation platform built with cutting-edge web technologies.
            This project demonstrates the power of React combined with Tailwind CSS to create responsive,
            beautiful, and user-friendly news applications that fetch real-time news from external APIs.
          </p>
          <p>
            Features include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Real-time news fetching from NewsAPI</li>
            <li>Real-time search functionality across news articles</li>
            <li>Dark/Light mode toggle with persistent preferences</li>
            <li>Article bookmarking and sharing capabilities</li>
            <li>Reading time estimates for better UX</li>
            <li>Responsive design that works on all devices</li>
            <li>User-friendly article creation interface</li>
            <li>Local storage for user-generated content</li>
            <li>Article images and external links</li>
          </ul>
          <p>
            Built with React 19, React Router, and Tailwind CSS 4, this news platform showcases best practices
            in modern web development, including component-based architecture, state management, and
            seamless API integration with news services.
          </p>
        </div>
      </div>
    </div>
  );
}
