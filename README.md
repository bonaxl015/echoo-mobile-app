# Echoo - React Native Social Media App

Echoo is a cross-platform social media application built with **React Native**, **Expo Router** and **React Native Paper**, designed with modular components, theme adaptability.
This app includes core social media features such as authentication, posts, comments, likes, profiles and user settings.

## Features

### **Authentication**

- Register / Login / Logout
- Password reset & forgot password flow
- Token-based session management stored in global store (Zustand)
- Form validation with `react-hook-form` + `yup`

### **Posts**

- Infinite scroll for newsfeed and user posts list
- Create and edit posts
- Optimistic likes (like/unlike) with rollback support
- View who like a post with infinite scroll

### **Comments**

- Infinite scroll comment lists
- Optimistic likes for comment
- Animated comment modal with swipe to close gesture
- View list of users who liked a comment

### **Profile**

- Full profile screen with avatar, name, bio and posts list
- Profile editing:
  - Image upload via `multipart/form-data` request
  - Name validation
  - Bio optional
- View other user's profile from posts, comments and likes list

### **Settings**

- View logged-in user info and navigate to profile
- Edit profile from settings menu
- Theme system:
  - Light / Dark
  - Global toggle via Zustand store
- Delete account with confirmation dialog
- Logout

### **Theme System**

- Fully integrated with React Native Paper themes
- Global light/dark toggle

## Tech Stack

- **React Native**
- **Expo Router**
- **React Native Paper**
- **React Query**
- **Zustand**
- **react-hook-form** + **yup**
- **expo-image-picker**
- **AsyncStorage**

## Installation and setup

1. **Clone the repository**

```bash
git clone https://github.com/bonaxl015/echoo-mobile-app.git
cd echoo-mobile-app
```

2. **Install dependencies**

```bash
yarn install
```

3. **Start the development server**

```bash
yarn start
```

4. **Configure environment variables**

- Create `.env` for backend API base URL

```
EXPO_PUBLIC_BACKEND_URL=https://your-backend-api.com
```

## License

MIT
