# Hurdle

Welcome to **Hurdle**, the Wordle clone where you _don't_ want to guess the word!

The goal of Hurdle is to come up with as many valid words as possible that **do not** match the target word. Test your vocabulary and outwit the hurdles along the way!

---

## Features

- Unique twist on the Wordle formula: aim to avoid the target word.
- Dynamic scoring system to keep the challenge engaging.
- Intuitive and responsive UI built for smooth gameplay.

---

## Tech Stack

Hurdle leverages modern web development tools for optimal performance and scalability:

- **Frontend**: Built using **React** with **Vite** for fast builds and development.
- **Backend**: A lightweight **Express.js** server handles API requests.
- **Wordle API**: Word data is fetched from this open-source Wordle API: [Wordle API](https://github.com/petergeorgas/Wordle-API/commit/4cd62c67c781713c01ae1e1bd3e82eb2bf1ecfdb).

---

## Installation and Usage

### Prerequisites
- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
- **npm**: Comes bundled with Node.js.

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hurdle
    ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the backend and frontend servers with:**
   ```bash
   npm run server
   npm run dev
   ```
4. `Ctrl+Click` to open the link provided

## Future Plans
- I plan to deploy the backend on a dedicated server so it can be ran not just locally
