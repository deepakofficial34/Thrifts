# THRIFTS – Sustainable Marketplace

Welcome to THRIFTS, a modern marketplace that promotes sustainable living by enabling users to buy and sell quality pre-loved products. The platform extends product lifecycles, reduces waste, and encourages mindful consumption through a seamless and secure user experience.

## Key Features

### Secure Authentication

* User registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Protected routes and role-based access

### Product Listings

* Create, edit, and delete listings
* Upload product images
* Product details including price, category, condition, and description
* Seller dashboard for managing listings

### Product Discovery

* Browse all available products
* Search products by keyword
* Filter products by category
* Sort listings by newest and oldest

### Wishlist Management

* Save products for later
* Remove products from wishlist
* Quick access to saved items

### Secure Payments

* Razorpay payment gateway integration
* Test mode payment support
* Purchase history tracking
* Order management

### User Dashboard

* Profile management
* Activity summary
* Listed products overview
* Wishlist statistics
* Purchase history

### Admin Features

* Admin dashboard access
* Product moderation
* User management capabilities

### Sustainability Focus

* Encourages product reuse
* Reduces unnecessary consumption
* Promotes environmentally conscious shopping habits

## Tech Stack

| Layer          | Technologies                        |
| -------------- | ----------------------------------- |
| Frontend       | React.js, Vite, Tailwind CSS, Axios |
| Backend        | Node.js, Express.js                 |
| Database       | MongoDB, Mongoose                   |
| Authentication | JWT, bcryptjs                       |
| Payments       | Razorpay                            |
| Image Handling | Cloudinary                           |
| Deployment     | Render                              |

## How It Works

### Create an Account

Register and securely log in to access marketplace features.

### List a Product

Add product details, upload images, and publish listings for buyers.

### Discover Products

Browse, search, and filter products based on your preferences.

### Save Favorites

Add products to your wishlist for future purchases.

### Complete Purchases

Use Razorpay's secure payment gateway to purchase products.

### Track Activity

View purchases, manage listings, and monitor account activity through your profile dashboard.

## Screenshots

### Home Page

![alt text](<Screenshot 2026-06-16 184212.png>)

### Product Marketplace
![alt text](<Screenshot 2026-06-16 184416.png>)


### Product Details

![alt text](<Screenshot 2026-06-16 184243.png>)

### Wishlist

![alt text](<Screenshot 2026-06-16 184233.png>)

### Seller Dashboard

![alt text](<Screenshot 2026-06-16 184316.png>)

### User Profile

![alt text](<Screenshot 2026-06-16 184336.png>)

### Razorpay Payment Gateway

![alt text](<Screenshot 2026-06-16 184624.png>)

## Live Demo

Frontend: https://thrifts-xdtv.onrender.com

Backend API: https://thrifts-backend.onrender.com

## Environment Variables

### Server

```env
MONGO_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Client

```env
VITE_API_URL=
VITE_RAZORPAY_KEY_ID=
```

## Run Locally

### Clone Repository

```bash
git clone https://github.com/your-username/thrifts.git
cd thrifts
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Future Enhancements

* AI-powered product recommendations
* RAG-based sustainability assistant
* Chat between buyers and sellers
* Product condition verification
* Advanced analytics dashboard
* Location-based product discovery

## Developer

**G.Deepak**

Passionate full-stack developer focused on building practical and impactful web applications.

LinkedIn: [https://www.linkedin.com/in/shivani-m-760280261/](https://www.linkedin.com/in/deepak-g-126a47252/)


