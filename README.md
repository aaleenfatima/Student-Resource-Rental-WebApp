# Resource Rental Web App

A full-stack web application for renting and sharing resources within a community. The platform enables users to post personal ads, trade items, donate blood, report lost and found items, and manage their profiles.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality with password encryption
- **Personal Ads**: Post and browse personal items for rental or sale
- **Product Listings**: Detailed product pages with owner information and ratings
- **Blood Donation**: Community blood donation coordination system with urgency tracking
- **Lost & Found**: Post and search for lost or found items
- **Notifications**: User notification dashboard for activity updates
- **User Dashboard**: Manage personal ads, settings, and account information
- **Settings**: Update personal information, password, and delete account options
- **File Uploads**: Support for image uploads with Multer
- **Email Notifications**: Automated email notifications using Nodemailer

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MS SQL Server
- **Authentication**: bcrypt for password hashing
- **Session Management**: express-session
- **Email**: Nodemailer
- **File Upload**: Multer
- **CORS**: Cross-Origin Resource Sharing enabled

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Styling**: Styled Components & CSS Modules
- **Build Tool**: Create React App with react-scripts

## Project Structure

```
ResourceRentalWebApp/
├── BACKEND/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   └── dbFiles/
│       ├── dbConfig.js           # Database configuration
│       ├── dbOperations.js       # Database operations and queries
│       └── sendEmail.js          # Email notification service
├── frontend/
│   ├── public/
│   │   ├── index.html            # HTML entry point
│   │   ├── manifest.json         # PWA manifest
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js                # Main React component
│   │   ├── index.js              # React DOM render
│   │   ├── components/
│   │   │   ├── blooddonation/    # Blood donation feature
│   │   │   ├── homepage/         # Home page with loader
│   │   │   ├── LAF/              # Lost & Found feature
│   │   │   ├── Listing/          # Product listings & filters
│   │   │   ├── notification/     # Notification dashboard
│   │   │   ├── personalAd/       # Personal ads management
│   │   │   ├── postad/           # Post ad creation form
│   │   │   ├── Productpage/      # Product details page
│   │   │   ├── profile/          # User profile
│   │   │   ├── rules/            # Guidelines page
│   │   │   ├── settingspage/     # Account settings
│   │   │   ├── signin/           # Sign in page
│   │   │   └── signup/           # Sign up page
│   │   ├── App.css               # Main styles
│   │   └── index.css             # Global styles
│   ├── package.json              # Frontend dependencies
│   └── README.md
└── package.json                  # Root package configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MS SQL Server instance with appropriate database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd BACKEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure database connection in `dbFiles/dbConfig.js`:
   ```javascript
   // Update with your MS SQL Server credentials
   server: 'YOUR_SERVER',
   user: 'YOUR_USER',
   password: 'YOUR_PASSWORD',
   database: 'YOUR_DATABASE'
   ```

4. Configure email settings in `dbFiles/sendEmail.js`:
   ```javascript
   // Update with your email service credentials
   service: 'gmail', // or your email service
   auth: {
     user: 'YOUR_EMAIL',
     pass: 'YOUR_PASSWORD'
   }
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3001` (or your configured port)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open automatically at `http://localhost:3000`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd BACKEND
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Production Build

**Frontend build:**
```bash
cd frontend
npm run build
```

The optimized build will be created in the `frontend/build` directory.

## Available Scripts

### Frontend Scripts
- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App (irreversible)

### Backend Scripts
- `npm start` - Start Express server
- `npm test` - Run tests (currently not configured)

## Key Features Explained

### User Authentication
- Secure password hashing using bcrypt
- Session management with express-session
- Protected routes and API endpoints

### Personal Ads & Listings
- Create, view, and manage product listings
- Filter and search functionality
- Rating system with owner information
- Image upload support

### Community Features
- Blood donation coordination with urgency indicators
- Lost & Found item tracking
- User notifications for activity
- Community guidelines

### Account Management
- Update personal information
- Change password
- View notification history
- Delete account option

## API Integration

The frontend communicates with the backend via REST API endpoints through Axios. Common operations include:
- User authentication (sign-up, sign-in, logout)
- CRUD operations for ads and listings
- File uploads for images
- Email notifications

## Database

The application uses MS SQL Server for data persistence. Key tables include:
- Users (authentication & profile)
- Ads/Listings (product information)
- BloodDonation (donation records)
- LostAndFound (lost/found items)
- Notifications (user activity)

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Support

For issues, questions, or suggestions, please open an issue in the project repository.

---

**Last Updated**: April 2026
