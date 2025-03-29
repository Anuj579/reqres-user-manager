# Userly

Userly is a simple user management dashboard where you can view users, delete users, and edit user details. It is built using **React.js**, **React Router**, **Tailwind CSS**, and dummy API from [reqres.in](https://reqres.in).

**Live URL:** [https://userlyapp.netlify.app](https://userlyapp.netlify.app)

---

## 🔧 How to Run the Project

1. **Clone the repo**

   ```bash
   git clone https://github.com/Anuj579/reqres-user-manager.git
   cd reqres-user-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Visit the app**
   Open your browser and go to [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure

```

src/
├── components/
│ └── ui/ # Reusable UI components like Button, Card, Input
├── pages/
│ ├── Layout.jsx
│ ├── LoginPage.jsx
│ ├── UserListPage.jsx
│ └── EditUserPage.jsx
├── App.jsx # Routing config
└── main.jsx # React app entry point

```

## 🧠 Features

- View users in a card layout (from dummy API).
- Pagination for user lists.
- Delete a user.
- Edit user details (first name, last name, email).
- Login form with custom form validation and error messages.
- Edit user form with simple HTML validations (`required`, `pattern`, `type=email`).

---

## ✅ Form Validation Details

- **Login Page**: Uses **custom form validation** using state and conditional rendering for error messages.
- **Edit Page**: Uses **built-in HTML validation** such as:
  - `required`
  - `pattern="[A-Za-z]"` for names
  - `type="email"` for validating email

This shows both ways to validate forms in React depending on the need.

---

## 💡 Assumptions & Considerations

- This project uses [https://reqres.in](https://reqres.in) which is a mock API. So, any updates (like editing or deleting a user) won't persist once you reload or go back to the page, as the data resets from the API.
- This project is deployed using **Netlify** and built using **Vite** for fast development.

---

## 👨‍💻 Developer

**Anuj**
GitHub: [@Anuj579](https://github.com/Anuj579)
Instagram/Twitter/YouTube: [@anujbuilds](https://linktr.ee/anujbuilds)
