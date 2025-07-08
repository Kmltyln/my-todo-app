import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import TodosContextProvider from "./contexts/TodosContextProvider.tsx";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
 <KindeProvider
		clientId="dfdc3958ec0447968dc89de106495f81"
		domain="https://kmltyln.kinde.com"
		redirectUri={
      process.env.NODE_ENV==="production"
      ?"https://my-todo-app-livid-eight.vercel.app/"
      :"http://localhost:5173"
    }
		logoutUri={
      process.env.NODE_ENV==="production"
      ?"https://kmltyln.kinde.com"
      :"http://localhost:5173"}
	>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </KindeProvider>
  </React.StrictMode>
);