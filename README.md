# CodeMate Connect

![CodeMate Connect Logo](public/icon.png)

## Find Your Pair Programming Partner

CodeMate Connect is a collaborative platform that connects developers for real-time pair programming sessions. It enables developers to share their screens, code together, and learn from each other in a virtual coding environment.

## 🚀 Features

- **Real-Time Video Collaboration**: Connect with other developers via high-quality video calls powered by Stream's Video SDK
- **Project Discovery**: Browse through active coding rooms categorized by technologies and interests
- **Project Rooms**: Create your own coding room with descriptions and GitHub project links
- **Tagging System**: Find relevant projects through a comprehensive tagging system
- **User Authentication**: Secure authentication with NextAuth
- **Dark/Light Mode**: Choose your preferred theme for optimal coding experience

## � Screenshots

### Home Page - Find Your Perfect Coding Partner
<img src="public/Page1.PNG" width="700" alt="Home Page"/>

### Create Room - Start Your Own Coding Session
<img src="public/Page5.PNG" width="700" alt="Create Room Page"/>

### Browse Rooms - Discover Active Coding Sessions
<img src="public/Page2.PNG" width="700" alt="Browse Rooms Page"/>

### Video Collaboration - Code Together in Real-time
<img src="public/page3.PNG" width="700" alt="Video Collaboration Page"/>

### Edit Room - Edit or delete Your Rooms
<img src="public/Page4.PNG" width="700" alt="Create Room Page"/>

## �🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Video SDK**: Stream IO Video React SDK
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **UI Components**: Radix UI, Shadcn UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form, Zod
- **Containerization**: Docker

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js 18+ and npm
- Docker and Docker Compose (for PostgreSQL database)
- Stream IO account for video API keys

## ⚙️ Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/CoderYashVij/CodeMate-Connect.git
   cd CodeMate-Connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://postgres:password123@localhost:5432/codemate_connect"
   
   # Authentication
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers (Add your own credentials)
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   
   # Stream IO Video API
   NEXT_PUBLIC_GET_STREAM_API_KEY="your-stream-api-key"
   GET_STREAM_API_SECRET="your-stream-api-secret"
   ```

## 🏃‍♂️ Running the Application

1. Start the PostgreSQL database:
   ```bash
   docker-compose up -d
   ```

2. Push database schema:
   ```bash
   npm run db:push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

1. **Create an Account**: Sign in using GitHub OAuth
2. **Browse Rooms**: Explore available coding rooms on the browse page
3. **Join a Room**: Click on a room card to join an active session
4. **Create Your Own Room**: Set up your own coding session by creating a new room
5. **Collaborate**: Share your screen, communicate via video, and code together

## 🧑‍💻 Development Tools

- **Database Studio**: Run `npm run db:studio` to open Drizzle Kit studio for database management
- **Linting**: Run `npm run lint` to check for code quality issues

## 📦 Deployment

The application is ready for deployment on platforms like Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables
3. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ by [CoderYashVij](https://github.com/CoderYashVij)
