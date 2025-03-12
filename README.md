# 📌 GetConnect App

A modern React Native social media platform built with Expo, allowing users to post, like, comment, and save bookmarks effortlessly. 🚀  

## ✨ Features  
✅ Post, like, comment, and save bookmarks
✅ Optimized image loading with caching
✅ Seamless UI with React Native & Expo Image
✅ Data fetching with Convex
✅ Fully responsive & dark mode support  

## 📱 App Screens
1️⃣ Home: Displays the main feed with posts
2️⃣ Bookmarks: View bookmarked posts
3️⃣ Create: Allows users to create new posts
4️⃣ Notifications: Shows likes, comments, and follows
5️⃣ User: Displays user profiles

## 🛠 Tech Stack  

⚛ React Native

🎨 Expo Image for optimized image loading

🔥 Convex for real-time queries

🌈 Tailwind CSS for styling

🔒 Clerk for authentication 

## 📸 Screenshots  
(Include relevant screenshots here)  

## 🚀 Installation  

1️. Clone the repository:  
```bash
git clone https://github.com/Vikash-thak12/GetConnect.git
cd GetConnect
```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the project with two terminals:
   
   Terminal 1: Start the Expo development server
   ```bash
    npx expo 
   ```
   Terminal 2: Start the Convex backend
   ```bash
    npx expo 
   ```
## 🛠 Environment Variables  

Create a `.env.local` file in the root of your project and add the following variables:  

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CONVEX_DEPLOYMENT=""
EXPO_PUBLIC_CONVEX_URL=""
```

## 📄 Folder Structure
   ```bash
   📦 GetConnect-App
   ├── 📂 .expo
   ├── 📂 .vscode
   ├── 📂 app
   │   ├── 📂 assets
   │   ├── 📂 components
   │   ├── 📂 constants
   │   ├── 📂 convex
   │   ├── 📂 provider
   │   ├── 📂 styles
   ├── 📄 .env.local
   ├── 📄 .gitignore
   ├── 📄 app.json
   ├── 📄 babel.config.js
   ├── 📄 cache.ts
   ├── 📄 expo-env.d.ts
   ├── 📄 global.css
   ├── 📄 metro.config.js
   ├── 📄 nativewind-env.d.ts
   ├── 📄 Notes.md
   ├── 📄 package-lock.json
   ├── 📄 package.json
   ├── 📄 README.md
   ├── 📄 tailwind.config.js
   └── 📄 tsconfig.json
   ```
## 🙌 Contributing
- Contributions are welcome! Feel free to fork the repo and submit a PR. 

## 💙 Made with love by Vikash Thakur
