# Netflix Clone - Admin Dashboard

A full-stack web application that replicates Netflix's content management system with admin capabilities for managing programs, categories, and media content.

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5.3 for responsive design
- EJS (Embedded JavaScript) templating
- jQuery for AJAX requests
- Font Awesome for icons

### Backend
- Node.js
- Express.js framework
- MySQL database
- Multer for file uploads
- UUID for generating unique identifiers

### Key Features
- Admin authentication system
- Program management (CRUD operations)
- Media upload (posters and videos)
- Category and subcategory organization
- Responsive dashboard interface
- Video preview functionality

## Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd netflixnodeproject
```

2. Install dependencies:
```sh
npm install
```

3. Set up MySQL database:
- Create a database named `netflixnodeproject`
- Import the provided SQL schema
- Update database configuration in `routes/pool.js`

4. Start the server:
```sh
npm start
```

## API Endpoints

### Admin Routes
- `GET /admin/login_page` - Render admin login page
- `POST /admin/chk_admin_login` - Authenticate admin
- `GET /admin/logout` - Logout admin

### Program Routes
- `GET /programs/program_interface` - Render program form
- `POST /programs/insert_program` - Add new program
- `GET /programs/display_all` - List all programs
- `GET /programs/edit_delete_display` - Edit/delete program form
- `POST /programs/final_edit_delete` - Update/delete program
- `GET /programs/show_poster` - Display program poster
- `POST /programs/edit_poster` - Update program poster
- `POST /programs/edit_video` - Update program video

### Category APIs
- `GET /programs/fetch_all_category` - Get all categories
- `GET /programs/fetch_all_subcategory` - Get subcategories by category ID

## Project Structure

```
netflixnodeproject/
├── bin/
│   └── www              # Server startup script
├── public/
│   ├── images/          # Stored program posters
│   ├── videos/          # Stored program videos
│   ├── javascripts/     # Client-side JS
│   └── stylesheets/     # CSS files
├── routes/
│   ├── admin.js         # Admin routes
│   ├── programs.js      # Program routes
│   ├── pool.js          # Database connection
│   └── multer.js        # File upload config
├── views/
│   ├── dashboard.ejs    # Admin dashboard
│   ├── loginpage.ejs    # Login page
│   └── programform.ejs  # Program management
├── app.js              # Express app configuration
└── package.json        # Project dependencies
```

## Features

1. **Admin Authentication**
   - Secure login system
   - Session management using LocalStorage
   - Protected routes

2. **Program Management**
   - Add new programs with details
   - Upload posters and videos
   - Edit existing programs
   - Delete programs
   - Preview media files

3. **Category System**
   - Dynamic category selection
   - Nested subcategories
   - AJAX-powered dropdowns

4. **User Interface**
   - Netflix-themed design
   - Responsive layout
   - Interactive media previews
   - Loading indicators
   - Error handling

## Security Features

- Password protection for admin access
- File type validation for uploads
- Size restrictions for media files
- Protected admin routes
- SQL injection prevention

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

