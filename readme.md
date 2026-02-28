# Product Discovery with AI Assist

A full-stack product discovery experience featuring a natural-language search powered by Large Language Models (LLMs). This project was built for the Discvrai Full-Stack Development Assessment.

## 🚀 Tech Stack

* **Frontend:** React (bootstrapped with Vite), plain CSS for styling.
* **Backend:** Node.js, Express.
* **AI/LLM:** Google Gemini API (`gemini-2.5-flash`).
* **Data:** In-memory JSON mock catalog.

> **Note on LLM Selection:** The assignment guidelines suggested OpenAI. However, to ensure a fully functional, end-to-end working demo without running into OpenAI's new-account billing/quota restrictions (`insufficient_quota`), I proactively integrated the **Google Gemini API**. The architectural flow, prompt engineering, and structured JSON parsing remain exactly as they would with OpenAI.

## ⚙️ Features & Implementation Details

### Backend API
The backend exposes two RESTful endpoints:
* `GET /api/products`: Returns the full catalog of products from the mock JSON database.
* `POST /api/ask`: Accepts a natural language query (e.g., `{ "query": "I need a cheap phone" }`). 

**The AI Flow:** When `/api/ask` is called, the backend securely constructs a prompt combining the user's query with the JSON product catalog context. It requests a strictly formatted JSON response from Gemini (`responseMimeType: "application/json"`). The backend parses this output and sends a structured object containing matching `productIds` and an AI-generated `summary` back to the client. Error handling is implemented to catch API timeouts or failures and return a safe `503 Service Unavailable` status to the frontend.

### Frontend UI
* **Product List:** Fetches and displays products on initial load using `useEffect`.
* **Ask UI:** A controlled input allows users to submit natural language queries. 
* **State Management:** Utilizes React's `useState` to seamlessly toggle between the full product catalog and the filtered AI results, while handling loading states and error messages.

## 🛠️ Setup & Run Instructions

### Prerequisites
* Node.js installed on your machine.
* A free Google Gemini API Key (Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)).

### 1. Backend Setup
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install

```

Create a `.env` file in the `backend` directory and add your API key:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here

```

```bash
npm run dev

```

*(The backend will run on http://localhost:3000)*

### 2. Frontend Setup

```bash
cd frontend
npm install

```

Start the Vite development server:

```bash
npm run dev

```

*(The frontend will run on http://localhost:5173)*

## ⏱️ Time Spent

* **Backend & AI Integration:** ~2 hr
* **Frontend & State Management:** ~2 hr
* **Testing, Refactoring & README:** ~30 min
* **Total:** ~5.5 hours

```