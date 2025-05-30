# 🥗 SafeBite

> **Scan Smart. Eat Safe. Live Well.**

SafeBite is a mobile-first HealthTech application built using React Native. It empowers users to scan food product barcodes/QR codes to detect ingredients that may be harmful based on their medical conditions or dietary restrictions — while also helping shopkeepers manage inventory with real-time expiry tracking.

---

## 💡 Problem Statement

In today’s fast-paced world, ensuring food safety is challenging for both **consumers** and **shopkeepers**:

- Consumers with **allergies**, **diabetes**, **heart disease**, or other conditions often lack the means to verify whether a food item is safe for them.
- Shopkeepers frequently overlook **expiry management**, causing waste and posing health risks.

> According to WHO, anaphylaxis-related deaths are on the rise, with an increase from 0.51 to 0.76 per million annually between 2004 and now.

---

## 🎯 Approach & Solution

SafeBite solves this dual-sided problem by providing:

### 🔹 For Consumers:

- Barcode/QR scanning to instantly detect harmful ingredients.
- Personalized warnings based on the user’s health profile.
- Expiry notifications and safe product suggestions.
- Recipe ideas based on purchased items.

### 🔹 For Shopkeepers:

- Track product expiry using barcodes.
- Get alerts before expiry to reduce wastage.
- View customer trends for smarter restocking.

---

## ✨ Features

### 📱 Mobile App Features

- **QR/Barcode Scanner**: Scan food products instantly.
- **Health Profile Setup**: Add allergies, conditions, and diet.
- **Harmful Ingredient Detection**: Smart alerts based on profile.
- **Expiry Tracking**: Alerts for both consumers and sellers.
- **Recipe Generator**: Suggests meals using scanned items.

### 📊 Shopkeeper Dashboard _(Web coming soon!)_

- Scan at billing → auto-saves product to customer profile.
- Track most/least selling items.
- Get insights into inventory and expiry trends.

---

## 🧠 Tech Stack

| Frontend              | Backend               | Tools/Infra              |
| --------------------- | --------------------- | ------------------------ |
| React Native (Expo)   | Node.js + Express.js  | Render (Backend Hosting) |
| NativeWind (Tailwind) | REST API Architecture | Supabase (User/Auth DB)  |
| Expo Camera           | dotenv, cors          | Open Food Facts API      |

---

## 🧪 Methodologies Used

1. **Barcode-Based Ingredient Parsing** (OCR / API).
2. **Health Profile Matching** (Rule-based + future ML).
3. **Expiry Notification System** (Time-triggered alerts).
4. **Collaborative Filtering for Recommendations**.
5. **Recipe Suggestions** via NLP-based ingredient matching.
6. **Cloud-Backed Storage** using Supabase.

---

## 🖼️ Screenshots

| Home Page            | Scanner              | Scan Result                 | Profile Setup           |
| -------------------- | -------------------- | --------------------------- | ----------------------- |
| ![](assets/home.png) | ![](assets/scan.png) | ![](assets/scan-result.png) | ![](assets/profile.png) |

---

## 📂 Folder Structure

SafeBite/
├── app/
│ ├── \_layout.jsx
│ ├── index.jsx
│ ├── global.css
│ ├── (auth)/login.jsx
│ ├── (auth)/signup.jsx
│ ├── (auth)/onboarding.jsx
│ ├── (tabs)/home.jsx
│ ├── (tabs)/profile.jsx
│ ├── product/[id].tsx
│ ├── scan/index.tsx
├── backend/
│ ├── server.js
│ ├── routes/
├── assets/
├── constants/
├── components/
├── types/

---

## 📦 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Ajay-Krishna00/SafeBite
cd SafeBite
```

### 2. Setup Mobile Frontend (Expo)

```bash
npm install
npx expo start
```

### 3. Setup Backend API

```bash
cd backend
npm install
node server.js
```

Or deploy your backend to Render and replace the API URL.

---

## 🎯 Target Users

- Individuals with allergies or chronic conditions

- Parents shopping for children

- Health-conscious users

- Shopkeepers wanting smarter stock control

## 🌍 Market Opportunity

- 🚨 Rising food-related illnesses and allergies

- 📱 Growing demand for food transparency

- 🔁 Need for sustainable grocery usage

- 👨‍👩‍👦 Families wanting healthier options

- 🛒 Local sellers improving digital literacy

## 🔒 Security & Privacy

- Secure user profile and health data

- Authentication powered by Supabase

## 📈 Scalability Roadmap

- 🛍️ Shopkeeper Web Portal

- 🧠 AI-powered ingredient classification

- 🗣️ Text-to-speech & Accessibility Support

- 🥦 Nutrition-specific alerts (e.g., sugar count)

- 📅 Grocery planning assistant

- 🔒 Fully GDPR-compliant data handling

---

## 👥 Team - Code Blooded

- Ajay Krishna D
- Abhay Murali M
- Thaariq Hassan R

---

## 🧾 License

MIT License — free for personal and educational use.

---

## 💬 Final Note

> “**Health isn’t just about what you eat — it’s about knowing what you’re about to eat. SafeBite gives you that power with a single scan.**”

If you like this project, ⭐️ star it and share it with health-conscious friends!
