# 📚 E-Commerce Book Store

## 🏢 Group Name
>**Superstar Jumbo**

## 👥 Team Members
>- Andreandhiki Riyanta Putra
>- Raditya Maulana Awicaksana
>- Khairumayzal Dwiksanendra

## ⭐ Initiative

>**Initiative**:  
**SuperstarJumbo Book Store** — An online bookstore platform developed using Next.js for the customer-facing site and Payload CMS for admin management (books, users, orders).

---

## 📚 Epics & User Stories

>## User Stories for SuperstarJumbo Book Store

>### 📚 Epic 1: Customer-Facing Book Catalog
>- **[US-1]** As a visitor, I want to browse books by category, so that I can discover books I like.
>- **[US-2]** As a customer, I want to view detailed information about a book before deciding to buy.

>### 🛒 Epic 2: Shopping Cart and Checkout
>- **[US-3]** As a customer, I want to add books to my cart so I can review them before purchasing.
>- **[US-4]** As a customer, I want to edit or remove books from my cart.

>### 💳 Epic 3: Payment Integration
>- **[US-5]** As a customer, I want to securely checkout using popular payment methods.
>- **[US-6]** As a customer, I want to get confirmation after completing my payment.

>### 👤 Epic 4: Customer Account Management
>- **[US-7]** As a visitor, I want to register an account to save my orders and cart.
>- **[US-8]** As a customer, I want to log in and access my account.

>### 🔎 Epic 5: Book Search and Filter
>- **[US-9]** As a customer, I want to search books by title or author.
>- **[US-10]** As a customer, I want to filter books by genre or price range.

>### 📦 Epic 6: Customer Order History
>- **[US-11]** As a customer, I want to view my past orders.
>- **[US-12]** As a customer, I want to check the delivery status of my orders.

>### 🛠️ Epic 7: Admin Management via Payload CMS
>- **[US-13]** As an admin, I want to add, edit, or delete books easily.
>- **[US-14]** As an admin, I want to view and manage customer orders.
>- **[US-15]** As an admin, I want to manage registered users.

---

## 🛠 Tech Stack
- **Next.js** (Frontend & API Routes)
- **Payload CMS** (Headless CMS for content management)
- **Vercel Postgres (Supabase)** (Database)
- **Tailwind CSS** (Styling)

---

## 📜 Commit Message Rules
To keep our commit history clean and consistent, follow these commit message rules:

### Format:
```
[type](section or page): [short description]
- [optional longer description]
- etc
```

### Types:
- **feat**: Adding a new feature
- **fix**: Fixing a bug
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (e.g., package updates)

### Example:
```
feat(landing page): add book detail page
- Implemented book detail page with dynamic routing.
```

---

## 🚀 How to Run the Project (with Docker & Makefile)

### 1️⃣ Jalankan Development (Hot Reload)
Pastikan Docker sudah terinstall dan berjalan.

```bash
make up-dev
```
Akses di browser: [http://localhost:3000](http://localhost:3000)

### 2️⃣ Stop Development
```bash
make down-dev
```

### 3️⃣ Lihat Logs Development
```bash
make logs-dev
```

### 4️⃣ Jalankan Production (Jika Sudah Siap Deploy)
```bash
make up-prod
```
Akses di browser: [http://localhost:3000](http://localhost:3000)

### 5️⃣ Stop Production
```bash
make down-prod
```

### 6️⃣ Build & Push Docker Image
```bash
# Build image
docker build -t lesalmon/wrpl-superstarjumbo:latest -f Dockerfile.prod .

# Login ke Docker Hub (jika belum)
docker login

# Push image
docker push lesalmon/wrpl-superstarjumbo:latest
```

---

> **Catatan:**
> - Untuk development, perubahan file di folder project akan langsung ter-refleksi di container (hot reload).
> - Jalankan `make up-dev` tanpa `--build` jika tidak ada perubahan dependensi untuk mempercepat startup.
> - Untuk rebuild image (misal setelah update dependensi), jalankan `make up-dev` lagi.
> - Pastikan sudah login ke Docker Hub sebelum push image (`docker login`).