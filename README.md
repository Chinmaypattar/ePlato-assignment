# ePlato-assignment

# Chat Application

A real-time chat application built with **React.js**, **Keycloak** for authentication, and **Hugging Face Inference API** for AI-powered responses.

## 📌 Features
- **User Authentication**: Managed via **Keycloak 16.1.1**.
- **AI Chatbot**: Uses Hugging Face **google/gemma-2-2b-it** model for responses.
- **Session Management**: Implements refresh token mechanism.
- **Mobile-Friendly UI**: Responsive design with a sidebar for mobile users.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Authentication**: Keycloak (via Docker)
- **AI Model**: Hugging Face Inference API
- **State Management**: Context API
- **Routing**: React Router

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/chat-app.git
cd chat-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
REACT_APP_HF_API_KEY=your_huggingface_api_key
REACT_APP_KEYCLOAK_URL = http://localhost:8080/auth
REACT_APP_KEYCLOAK_REALM =master
REACT_APP_KEYCLOAK_CLIENT_ID=react-client
```

### 4️⃣ Run Keycloak in Docker
```sh
docker run  -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:16.1.1
```

#### 🔹 Configure Keycloak
1. Open **http://localhost:8080**
2. Log in with admin/admin
3. Create a **Realm** (e.g., `chat-app`)
4. Create a **Client** (e.g., `chat-client`) and set **Access Type** to `public`
5. Configure **Redirect URIs**: `http://localhost:3000/*`
6. Create a **User** for testing

### 5️⃣ Start the React App
```sh
npm start
```
The app should now be running at **http://localhost:3000**.

## 🔌 API Integration
This app integrates with **Hugging Face's** AI models. The chatbot fetches responses using:
```js
const stream = client.chatCompletionStream({
  model: 'google/gemma-2-2b-it',
  messages: [{ role: 'user', content: message }],
  temperature: 0.5,
  max_tokens: 2048,
  top_p: 0.7,
});
```

## 🔐 Authentication & Session Handling
- Uses **Keycloak's JWT tokens**.
- Refresh tokens are handled automatically.
- If the token expires, the user is logged out or prompted for reauthentication.

## 📜 Folder Structure
```
chat-app/
│── src/
│   ├── components/
│   │   ├── ChatContainer.js
│   │   ├── LeftNav.js
│   │   ├── Mobile.js
│   │   ├── SessionExpiredModal.js
│   ├── utils/
│   │   ├── Context.js
│   │   ├── keycloak.js
│   ├── App.js
│   ├── index.js
│── public/
│── .env
│── package.json
```


