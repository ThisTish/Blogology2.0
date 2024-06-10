# Blog Application Development Plan

## Database & Models Setup
- **Models**:
  <!-- - Blog -->
  <!-- - Comment -->
  <!-- - User -->
- **Associations**:
  <!-- - User hasMany Blog -->
  <!-- - User hasMany Comment -->
  <!-- - Blog hasMany Comment -->

## Sync Sequelize and Server
<!-- - Establish database connection. -->
<!-- - Sync Sequelize models with the database. -->

## seeds
- blog <!--todo create seed comments & created by -->
<!-- - user -->
<!-- - comment -->

## Routes and Controllers
### General Routes
<!-- - **Homepage (`'/'`)**: Display all blogs. -->
- **Signup (`'/signup'`)**: Show signup form
- **Login (`'/login'`)**: Show login form.
- **Individual Blog (`'/blogs/:id'`)**: Display a single blog with comments.
  <!-- !route returning data, not showing through handlebars -->
- **Dashboard (`'/dashboard'`)**: Display user-specific blogs.
- **New Blog (`'/newBlog'`)**: Show form to create a new blog.
- **Edit Blog (`'/blogs/:id/edit'`)**: Show form to edit a specific blog.

### Auth Routes
- **Sign Up (`POST /signup`)**: Handle user registration.
- **Login (`POST /login`)**: Handle user authentication.
- **Logout (`GET /logout`)**: Handle user logout.

### Blog Routes
- **Create Blog (`POST /newBlog`)**: Handle creating a new blog post.
- **Update Blog (`PUT /blogs/:id`)**: Handle updating an existing blog post.
- **Delete Blog (`DELETE /blogs/:id`)**: Handle deleting a blog post.
- **Create Comment (`POST /blogs/:id/comment`)**: Handle creating a new comment on a blog post.

## Handlebars Templates
### Main Layout
- `main.handlebars`
  - **Partials**: Navigation, Footer, etc.

### Views
- **Blogs Listing**: `blogs.handlebars`
- **Signup**: `signup.handlebars`
- **Login**: `login.handlebars`
- **Single Blog**: `blog.handlebars`
- **Dashboard**: `dashboard.handlebars`
- **New Blog**: `newBlog.handlebars`
- **Edit Blog**: `editBlog.handlebars`

## Middleware and Helpers
- **Authentication Middleware**: Ensure routes like dashboard and blog creation are protected.
- **Form Validation Middleware**: Validate user inputs on the server side.
- **Session Management**: Use sessions for maintaining user login state.

## Styling and Design
- CSS or a framework like Bootstrap/Tailwind for styling.
- Ensure responsive design.

## Testing and Debugging
- Test each route and its functionality.
- Ensure form validations and error handling are robust.

## Additional Considerations
- **Error Handling**: Add proper error handling middleware to catch and handle errors.
- **Security**: Ensure secure password storage (e.g., hashing passwords with bcrypt).
- **Session Management**: Properly configure session/cookie settings, including expiration and security.
- **Deployment**: Prepare the app for deployment (e.g., environment variables for database credentials).