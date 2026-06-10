START OF README FILE:

Frontend Mentor - Rest Countries API with Color Theme Switching
A fully responsive country directory web application built with React and Vite. This project integrates with the REST Countries RESTful API to pull real-time data on populations, currencies, languages, regions, and flags, complete with a dark mode color-theme toggle.

🔗 Links
Solution URL: [Add Frontend Mentor solution link here]

Live Site URL: [Add Vercel/Netlify live deployment link here]

📸 Screenshots
Desktop View
🚀 Features
Dynamic Data Fetching: Fetches data asynchronously from the https://restcountries.com/v3.1/all API.

Advanced Filtering: Multi-layered search functionality to filter countries by region safely without layout shifting or state rendering loops.

Responsive Grid Layout: Built using modern CSS Grid and Flexbox mechanics for a seamless transition from desktop monitors to mobile viewports.

Theme Customization: Complete light-theme and dark-theme switching capabilities across all UI layout modules.

💡 Key Learnings & Challenges Overcome
1. Synchronous State Management in React
During development, a key architectural challenge was managing state efficiently across components. Originally, updating the available regions dynamically inside a child component risked creating an infinite rendering loop. This was resolved by properly balancing parent/child state communication and updating state within unified async pathways.

2. Eliminating Layout Shift and Background Gaps
Encountered a common CSS issue where locking the wrapper element's layout to 100vh caused the background color to cut off cleanly below the screen fold. Shifting the structure to rely on min-height: 100vh and cascading inheritance hooks (background-color: inherit) on browser-native UI components allowed the container to grow seamlessly with dynamic data cards.

🛠️ Built With
React 19 - Component-driven library

Vite - Lightning-fast build tool and bundler

CSS3 - Custom styling featuring semantic selectors and fluid layouts

React Icons & CLSX - Vector layout iconography and conditionally managed utility class strings

⚙️ How To Run Locally
Clone the repository:

Bash
git clone https://github.com/YOUR_GITHUB_USERNAME/rest-countries-api-project.git
Navigate into the workspace:

Bash
cd rest-countries-api-project
Install dependencies:

Bash
npm install
Launch the Vite development server:

Bash
npm run dev
Open your local browser to http://localhost:5173 to explore the build!