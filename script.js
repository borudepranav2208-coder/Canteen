// =========================================================
// CANTEEN VOICE - COMPLETE UNIFIED JAVASCRIPT
// Student Portal & Admin Dashboard Combined
// Supports both live Flask backend and offline/standalone/Vercel fallback
// =========================================================

const API_URL = "/api";

// ---------------------------------------------------------
// BUILT-IN FALLBACK MENU: 98 ITEMS
// Used automatically if Flask API is offline or deployed statically
// ---------------------------------------------------------
const DEFAULT_MENU = [
    { id: 1, name: "Tea", price: 10, category: "Beverages" },
    { id: 2, name: "Coffee", price: 15, category: "Beverages" },
    { id: 3, name: "Cold Coffee", price: 40, category: "Beverages" },
    { id: 4, name: "Lemon Tea", price: 15, category: "Beverages" },
    { id: 5, name: "Hot Chocolate", price: 35, category: "Beverages" },
    { id: 6, name: "Milk", price: 20, category: "Beverages" },
    { id: 7, name: "Lassi", price: 25, category: "Beverages" },
    { id: 8, name: "Mango Shake", price: 40, category: "Beverages" },
    { id: 9, name: "Chocolate Shake", price: 45, category: "Beverages" },
    { id: 10, name: "Mineral Water", price: 20, category: "Beverages" },
    { id: 11, name: "Samosa", price: 15, category: "Snacks" },
    { id: 12, name: "Vada Pav", price: 15, category: "Snacks" },
    { id: 13, name: "Pav Bhaji", price: 50, category: "Snacks" },
    { id: 14, name: "Misal Pav", price: 40, category: "Snacks" },
    { id: 15, name: "Poha", price: 25, category: "Breakfast" },
    { id: 16, name: "Upma", price: 25, category: "Breakfast" },
    { id: 17, name: "Idli Sambar", price: 35, category: "Breakfast" },
    { id: 18, name: "Medu Vada", price: 30, category: "Breakfast" },
    { id: 19, name: "Dosa", price: 40, category: "Breakfast" },
    { id: 20, name: "Masala Dosa", price: 50, category: "Breakfast" },
    { id: 21, name: "Uttapam", price: 45, category: "Breakfast" },
    { id: 22, name: "Sandwich", price: 30, category: "Snacks" },
    { id: 23, name: "Veg Sandwich", price: 35, category: "Snacks" },
    { id: 24, name: "Cheese Sandwich", price: 45, category: "Snacks" },
    { id: 25, name: "Grilled Sandwich", price: 50, category: "Snacks" },
    { id: 26, name: "Veg Burger", price: 40, category: "Fast Food" },
    { id: 27, name: "Cheese Burger", price: 50, category: "Fast Food" },
    { id: 28, name: "French Fries", price: 40, category: "Fast Food" },
    { id: 29, name: "Peri Peri Fries", price: 50, category: "Fast Food" },
    { id: 30, name: "Veg Pizza", price: 70, category: "Fast Food" },
    { id: 31, name: "Cheese Pizza", price: 80, category: "Fast Food" },
    { id: 32, name: "Margherita Pizza", price: 75, category: "Fast Food" },
    { id: 33, name: "Veg Maggie", price: 30, category: "Fast Food" },
    { id: 34, name: "Cheese Maggie", price: 40, category: "Fast Food" },
    { id: 35, name: "Masala Maggie", price: 35, category: "Fast Food" },
    { id: 36, name: "Veg Momos", price: 40, category: "Fast Food" },
    { id: 37, name: "Fried Momos", price: 50, category: "Fast Food" },
    { id: 38, name: "Paneer Momos", price: 55, category: "Fast Food" },
    { id: 39, name: "Spring Roll", price: 40, category: "Snacks" },
    { id: 40, name: "Veg Manchurian", price: 60, category: "Chinese" },
    { id: 41, name: "Hakka Noodles", price: 60, category: "Chinese" },
    { id: 42, name: "Schezwan Noodles", price: 65, category: "Chinese" },
    { id: 43, name: "Fried Rice", price: 55, category: "Chinese" },
    { id: 44, name: "Schezwan Rice", price: 65, category: "Chinese" },
    { id: 45, name: "Paneer Fried Rice", price: 75, category: "Chinese" },
    { id: 46, name: "Veg Biryani", price: 70, category: "Meals" },
    { id: 47, name: "Paneer Biryani", price: 90, category: "Meals" },
    { id: 48, name: "Dal Rice", price: 50, category: "Meals" },
    { id: 49, name: "Rajma Rice", price: 60, category: "Meals" },
    { id: 50, name: "Chole Rice", price: 60, category: "Meals" },
    { id: 51, name: "Veg Thali", price: 80, category: "Meals" },
    { id: 52, name: "Mini Thali", price: 60, category: "Meals" },
    { id: 53, name: "Chapati Bhaji", price: 45, category: "Meals" },
    { id: 54, name: "Paneer Bhurji", price: 70, category: "Meals" },
    { id: 55, name: "Dal Tadka", price: 60, category: "Meals" },
    { id: 56, name: "Jeera Rice", price: 45, category: "Meals" },
    { id: 57, name: "Curd Rice", price: 45, category: "Meals" },
    { id: 58, name: "Aloo Paratha", price: 35, category: "Meals" },
    { id: 59, name: "Paneer Paratha", price: 50, category: "Meals" },
    { id: 60, name: "Cheese Paratha", price: 50, category: "Meals" },
    { id: 61, name: "Puri Bhaji", price: 45, category: "Breakfast" },
    { id: 62, name: "Chole Bhature", price: 60, category: "Meals" },
    { id: 63, name: "Veg Pulao", price: 55, category: "Meals" },
    { id: 64, name: "Masala Pav", price: 35, category: "Snacks" },
    { id: 65, name: "Cheese Pav Bhaji", price: 65, category: "Snacks" },
    { id: 66, name: "Kachori", price: 15, category: "Snacks" },
    { id: 67, name: "Bread Pakora", price: 20, category: "Snacks" },
    { id: 68, name: "Onion Pakora", price: 25, category: "Snacks" },
    { id: 69, name: "Paneer Pakora", price: 40, category: "Snacks" },
    { id: 70, name: "Dhokla", price: 25, category: "Snacks" },
    { id: 71, name: "Khandvi", price: 30, category: "Snacks" },
    { id: 72, name: "Bhel Puri", price: 25, category: "Snacks" },
    { id: 73, name: "Sev Puri", price: 30, category: "Snacks" },
    { id: 74, name: "Pani Puri", price: 30, category: "Snacks" },
    { id: 75, name: "Dahi Puri", price: 35, category: "Snacks" },
    { id: 76, name: "Fruit Salad", price: 40, category: "Healthy" },
    { id: 77, name: "Veg Salad", price: 35, category: "Healthy" },
    { id: 78, name: "Sprouts Salad", price: 35, category: "Healthy" },
    { id: 79, name: "Corn Chaat", price: 35, category: "Healthy" },
    { id: 80, name: "Boiled Eggs", price: 30, category: "Healthy" },
    { id: 81, name: "Chocolate Brownie", price: 40, category: "Desserts" },
    { id: 82, name: "Gulab Jamun", price: 25, category: "Desserts" },
    { id: 83, name: "Rasgulla", price: 25, category: "Desserts" },
    { id: 84, name: "Ice Cream", price: 30, category: "Desserts" },
    { id: 85, name: "Vanilla Ice Cream", price: 30, category: "Desserts" },
    { id: 86, name: "Chocolate Ice Cream", price: 35, category: "Desserts" },
    { id: 87, name: "Cup Cake", price: 25, category: "Desserts" },
    { id: 88, name: "Donut", price: 30, category: "Desserts" },
    { id: 89, name: "Cookies", price: 20, category: "Desserts" },
    { id: 90, name: "Muffin", price: 30, category: "Desserts" },
    { id: 91, name: "Apple Juice", price: 30, category: "Beverages" },
    { id: 92, name: "Orange Juice", price: 30, category: "Beverages" },
    { id: 93, name: "Watermelon Juice", price: 30, category: "Beverages" },
    { id: 94, name: "Buttermilk", price: 20, category: "Beverages" },
    { id: 95, name: "Cold Drink", price: 25, category: "Beverages" },
    { id: 96, name: "Energy Drink", price: 40, category: "Beverages" },
    { id: 97, name: "Fruit Milkshake", price: 40, category: "Beverages" },
    { id: 98, name: "Mango Mastani", price: 60, category: "Beverages" }
];

// ---------------------------------------------------------
// INITIAL SAMPLE FEEDBACK RECORDS
// Synced with canteen.db for offline & static host usage
// ---------------------------------------------------------
const DEFAULT_FEEDBACK = [
    {
        id: 6,
        user_name: "Arnav",
        mobile_number: "9823456789",
        user_role: "Student",
        food_id: 2,
        food_name: "Tadka Sandwich",
        food_price: 55.0,
        feedback_type: "Rating / Suggestion",
        rating: 5,
        suggestion_type: "Menu Variety",
        suggestion: "Please keep more sandwich options available during evening hours.",
        created_at: "2026-10-13T13:34:54.151Z"
    },
    {
        id: 5,
        user_name: "Arnav",
        mobile_number: "9823456789",
        user_role: "Student",
        food_id: 2,
        food_name: "Tadka Sandwich",
        food_price: 55.0,
        feedback_type: "Review / Complaint",
        price_opinion: "Reasonable",
        quality: "Average",
        quantity: "Too Little",
        taste: "Excellent",
        hygiene: "Excellent",
        complaint_type: "Food Quality",
        comment: "Great taste but the portion size was slightly small for lunch.",
        created_at: "2026-10-13T13:34:42.520Z"
    },
    {
        id: 4,
        user_name: "Pranav Borude",
        mobile_number: "9876543210",
        user_role: "Student",
        food_id: 67,
        food_name: "Tea",
        food_price: 12.0,
        feedback_type: "Rating / Suggestion",
        rating: 5,
        suggestion_type: "Food Quality",
        suggestion: "Tea is really good and refreshing every morning!",
        created_at: "2026-10-13T13:23:52.046Z"
    },
    {
        id: 3,
        user_name: "Pranav Borude",
        mobile_number: "9876543210",
        user_role: "Student",
        food_id: 67,
        food_name: "Tea",
        food_price: 12.0,
        feedback_type: "Review / Complaint",
        price_opinion: "Affordable",
        quality: "Good",
        quantity: "Too Little",
        taste: "Good",
        hygiene: "Good",
        complaint_type: "Low Quantity",
        comment: "Cup size could be slightly bigger.",
        created_at: "2026-10-13T13:23:21.889Z"
    },
    {
        id: 2,
        user_name: "Pranav Borude",
        mobile_number: "9876543210",
        user_role: "Student",
        food_id: 1,
        food_name: "Veg Sandwich",
        food_price: 55.0,
        feedback_type: "Rating / Suggestion",
        rating: 5,
        suggestion_type: "New Food Item",
        suggestion: "ADD OTHER DELICIOUS DISHES",
        created_at: "2026-10-13T13:15:00.644Z"
    },
    {
        id: 1,
        user_name: "Pranav Borude",
        mobile_number: "9876543210",
        user_role: "Student",
        food_id: 1,
        food_name: "Veg Sandwich",
        food_price: 55.0,
        feedback_type: "Review / Complaint",
        price_opinion: "Affordable",
        quality: "Excellent",
        quantity: "Sufficient",
        taste: "Good",
        hygiene: "Good",
        comment: "Fresh bread and nice packaging.",
        created_at: "2026-10-13T13:14:31.398Z"
    }
];

// ---------------------------------------------------------
// LOCAL STORAGE DATA PERSISTENCE HELPERS
// ---------------------------------------------------------
function getLocalFeedback() {
    try {
        const raw = localStorage.getItem("canteenFeedbackList");
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.warn("Local storage read error:", e);
    }
    try {
        localStorage.setItem("canteenFeedbackList", JSON.stringify(DEFAULT_FEEDBACK));
    } catch {}
    return [...DEFAULT_FEEDBACK];
}

function saveLocalFeedback(newEntry) {
    const list = getLocalFeedback();
    const entry = {
        id: list.length ? Math.max(...list.map(f => Number(f.id) || 0)) + 1 : 1,
        created_at: new Date().toISOString(),
        ...newEntry
    };
    list.unshift(entry);
    try {
        localStorage.setItem("canteenFeedbackList", JSON.stringify(list));
    } catch (e) {
        console.warn("Local storage write error:", e);
    }
    return entry;
}

function deleteLocalFeedback(id) {
    let list = getLocalFeedback();
    list = list.filter(item => Number(item.id) !== Number(id));
    try {
        localStorage.setItem("canteenFeedbackList", JSON.stringify(list));
    } catch (e) {}
    return list;
}

function computeLocalStatistics(feedbackList, menuList) {
    const total = feedbackList.length;
    const complaints = feedbackList.filter(f => f.feedback_type === "Review / Complaint").length;
    const suggestions = feedbackList.filter(f => f.feedback_type === "Rating / Suggestion").length;
    const rated = feedbackList.filter(f => f.rating != null && !isNaN(Number(f.rating)));
    const avg = rated.length
        ? (rated.reduce((sum, f) => sum + Number(f.rating), 0) / rated.length).toFixed(1)
        : "5.0";

    return {
        totalFeedback: total,
        averageRating: Number(avg),
        complaints: complaints,
        suggestions: suggestions,
        totalMenuItems: menuList.length || 98
    };
}

// ---------------------------------------------------------
// STATE VARIABLES
// ---------------------------------------------------------
let foods = [...DEFAULT_MENU];
let currentUser = null;
let selectedFood = null;
let selectedRating = 0;
let searchTimer = null;
let isAdminLoggedIn = false;

// DOM SELECTOR SHORTCUT
function $(id) {
    return document.getElementById(id);
}

// FORMAT DATE TO USER-FRIENDLY STRING
function formatDate(dateString) {
    if (!dateString) return "—";
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return d.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch {
        return dateString;
    }
}

// TOAST NOTIFICATION
function showMessage(message, isError = false) {
    const toast = $("toast");

    if (!toast) {
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.className = "toast show" + (isError ? " error" : " success");

    clearTimeout(showMessage.timer);
    showMessage.timer = setTimeout(function () {
        toast.className = "toast";
    }, 3500);
}

// GENERIC API REQUEST HELPER
async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        credentials: "same-origin",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("The server returned an invalid response.");
    }

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
    }

    return data;
}

// =========================================================
// TAB NAVIGATION / VIEW SWITCHER
// =========================================================

function switchView(viewName) {
    const studentView = $("studentPortalView");
    const adminView = $("adminPortalView");
    const tabStudent = $("tabStudent");
    const tabAdmin = $("tabAdmin");

    if (viewName === "admin") {
        if (studentView) studentView.hidden = true;
        if (adminView) adminView.hidden = false;
        if (tabStudent) tabStudent.classList.remove("active");
        if (tabAdmin) tabAdmin.classList.add("active");

        if (window.location.hash.toLowerCase() !== "#admin") {
            history.pushState(null, "", "#admin");
        }

        checkAdminLogin();
    } else {
        if (studentView) studentView.hidden = false;
        if (adminView) adminView.hidden = true;
        if (tabStudent) tabStudent.classList.add("active");
        if (tabAdmin) tabAdmin.classList.remove("active");

        if (window.location.hash.toLowerCase() === "#admin") {
            history.pushState(null, "", window.location.pathname);
        }

        loadPublicStatistics();
    }
}

function initializeNavigation() {
    $("tabStudent")?.addEventListener("click", () => switchView("student"));
    $("tabAdmin")?.addEventListener("click", () => switchView("admin"));

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.toLowerCase();
        if (hash === "#admin") {
            switchView("admin");
        } else {
            switchView("student");
        }
    });

    // Check initial hash on page load
    if (window.location.hash.toLowerCase() === "#admin") {
        switchView("admin");
    }
}

// =========================================================
// STUDENT PORTAL: LOGIN & LOGOUT
// =========================================================

function initializeLogin() {
    const loginForm = $("loginForm");
    const roleInput = $("userRole");

    document.querySelectorAll("[data-role]").forEach(function (button) {
        button.addEventListener("click", function () {
            if (roleInput) {
                roleInput.value = button.dataset.role;
            }

            document.querySelectorAll("[data-role]").forEach(function (item) {
                item.classList.toggle("active", item === button);
            });
        });
    });

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = $("userName")?.value.trim() || "";
        const mobile = $("mobileNumber")?.value.trim() || "";
        const role = roleInput?.value || "";

        if (name.length < 2) {
            showMessage("Please enter your full name.", true);
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            showMessage("Enter a valid 10-digit mobile number.", true);
            return;
        }

        if (!["Student", "Faculty"].includes(role)) {
            showMessage("Please select Student or Faculty.", true);
            return;
        }

        currentUser = {
            name: name,
            mobile: mobile,
            role: role
        };

        sessionStorage.setItem("canteenUser", JSON.stringify(currentUser));
        openHomePage();
        showMessage("Welcome, " + currentUser.name + "!");
    });
}

function initializeStudentLogout() {
    const logoutBtn = $("logoutButton");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", function () {
        currentUser = null;
        selectedFood = null;
        sessionStorage.removeItem("canteenUser");

        const loginSection = $("loginSection");
        const homeSection = $("homeSection");
        const selectedFoodSection = $("selectedFood");
        const reviewSection = $("reviewSection");
        const suggestionSection = $("suggestionSection");

        if (homeSection) homeSection.hidden = true;
        if (loginSection) loginSection.hidden = false;
        if (selectedFoodSection) selectedFoodSection.hidden = true;
        if (reviewSection) reviewSection.hidden = true;
        if (suggestionSection) suggestionSection.hidden = true;

        const loginForm = $("loginForm");
        if (loginForm) loginForm.reset();

        const roleInput = $("userRole");
        if (roleInput) roleInput.value = "Student";
        document.querySelectorAll("[data-role]").forEach(function (item) {
            item.classList.toggle("active", item.dataset.role === "Student");
        });

        showMessage("You have logged out successfully.");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function openHomePage() {
    const loginSection = $("loginSection");
    const homeSection = $("homeSection");

    if (!loginSection || !homeSection) return;

    loginSection.hidden = true;
    homeSection.hidden = false;

    const welcomeMessage = $("welcomeMessage");
    if (welcomeMessage && currentUser) {
        welcomeMessage.textContent = "Welcome, " + currentUser.name + "!";
    }

    loadPublicStatistics();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function restoreLogin() {
    try {
        const savedUser = sessionStorage.getItem("canteenUser");
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            if (currentUser && currentUser.name && ["Student", "Faculty"].includes(currentUser.role)) {
                openHomePage();
            }
        }
    } catch {
        sessionStorage.removeItem("canteenUser");
    }
}

// =========================================================
// STUDENT PORTAL: MENU & PUBLIC STATS
// =========================================================

async function loadPublicStatistics() {
    let stats;
    try {
        stats = await apiRequest(API_URL + "/statistics");
    } catch {
        // Compute from local database fallback
        const localList = getLocalFeedback();
        stats = computeLocalStatistics(localList, foods.length ? foods : DEFAULT_MENU);
    }

    if ($("statsFoodItems")) {
        $("statsFoodItems").textContent = stats.totalMenuItems ?? (foods.length || 98);
    }
    if ($("statsAvgRating")) {
        $("statsAvgRating").textContent = stats.averageRating ? `${stats.averageRating} ★` : "5.0 ★";
    }
    if ($("statsFeedbackCount")) {
        $("statsFeedbackCount").textContent = stats.totalFeedback ?? 0;
    }
}

async function loadFoods() {
    const container = $("foodResults");
    if (!container) return;

    try {
        const data = await apiRequest(API_URL + "/menu");
        foods = Array.isArray(data) && data.length ? data : DEFAULT_MENU;
    } catch (error) {
        // Built-in fallback: ensure all 98 items always load regardless of server status
        foods = DEFAULT_MENU;
    }

    renderFoods(foods);
    loadPublicStatistics();
    renderAdminMenu(foods);
}

function getFoodIcon(category = "", name = "") {
    const text = (category + " " + name).toLowerCase();

    if (text.includes("pizza")) return "🍕";
    if (text.includes("burger")) return "🍔";
    if (text.includes("sandwich")) return "🥪";
    if (text.includes("momo")) return "🥟";
    if (text.includes("fries")) return "🍟";
    if (text.includes("coffee")) return "☕";
    if (text.includes("milkshake") || text.includes("mastani") || text.includes("drink") || text.includes("juice") || text.includes("lassi") || text.includes("milk")) return "🥤";
    if (text.includes("maggi") || text.includes("noodle")) return "🍜";
    if (text.includes("brownie") || text.includes("chocolate") || text.includes("ice cream") || text.includes("dessert") || text.includes("cake") || text.includes("donut") || text.includes("cookie") || text.includes("muffin") || text.includes("jamun") || text.includes("rasgulla")) return "🍫";
    if (text.includes("idli") || text.includes("poha") || text.includes("vada") || text.includes("dosa") || text.includes("upma") || text.includes("uttapam") || text.includes("puri")) return "🍛";
    if (text.includes("tea")) return "🍵";
    if (text.includes("salad") || text.includes("sprouts") || text.includes("chaat") || text.includes("egg")) return "🥗";
    if (text.includes("thali") || text.includes("rice") || text.includes("biryani") || text.includes("paratha") || text.includes("bhaji") || text.includes("dal") || text.includes("pulao")) return "🍱";

    return "🍽️";
}

function renderFoods(items) {
    const container = $("foodResults");
    if (!container) return;

    container.innerHTML = "";

    if (!items.length) {
        container.innerHTML =
            '<div class="empty-results">No food items found matching your search.</div>';
        return;
    }

    items.forEach(function (food) {
        const card = document.createElement("article");
        card.className = "food-card";

        const isSelected = selectedFood && Number(selectedFood.id) === Number(food.id);
        if (isSelected) {
            card.classList.add("selected");
        }

        const top = document.createElement("div");
        top.className = "food-card-top";

        const icon = document.createElement("span");
        icon.className = "food-card-icon";
        icon.textContent = getFoodIcon(food.category, food.name);

        const category = document.createElement("span");
        category.className = "food-category";
        category.textContent = food.category || "Menu Item";

        top.append(icon, category);

        const name = document.createElement("h3");
        name.textContent = food.name;

        const bottom = document.createElement("div");
        bottom.className = "food-card-bottom";

        const price = document.createElement("span");
        price.className = "food-price";
        price.textContent = "₹" + Number(food.price).toFixed(0);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "food-select-button";
        button.dataset.foodId = food.id;
        button.textContent = isSelected ? "Selected ✓" : "Select +";

        bottom.append(price, button);
        card.append(top, name, bottom);
        container.appendChild(card);
    });
}

function initializeSearch() {
    const searchInput = $("foodSearch");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();

        const filtered = foods.filter(function (food) {
            return (
                String(food.name || "").toLowerCase().includes(query) ||
                String(food.category || "").toLowerCase().includes(query)
            );
        });

        renderFoods(filtered);
    });
}

// =========================================================
// STUDENT PORTAL: FOOD SELECTION & FORMS
// =========================================================

function initializeFoodSelection() {
    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-food-id]");
        if (!button) return;

        const foodId = Number(button.dataset.foodId);
        const food = foods.find(function (item) {
            return Number(item.id) === foodId;
        });

        if (!food) return;

        if (!currentUser) {
            showMessage("Please log in first to give feedback.", true);
            return;
        }

        selectedFood = food;

        if ($("selectedFoodName")) $("selectedFoodName").textContent = food.name;
        if ($("selectedFoodLabel")) $("selectedFoodLabel").textContent = food.name + " (" + (food.category || "Menu") + ")";
        if ($("selectedFoodPrice")) $("selectedFoodPrice").textContent = "₹" + Number(food.price).toFixed(0);
        if ($("foodId")) $("foodId").value = food.id;
        if ($("foodName")) $("foodName").value = food.name;
        if ($("foodPrice")) $("foodPrice").value = food.price;

        if ($("selectedFood")) $("selectedFood").hidden = false;
        if ($("reviewSection")) $("reviewSection").hidden = false;
        if ($("suggestionSection")) $("suggestionSection").hidden = false;

        // Re-render food list to highlight selected item
        const query = ($("foodSearch")?.value || "").trim().toLowerCase();
        renderFoods(foods.filter(function (item) {
            return (
                String(item.name || "").toLowerCase().includes(query) ||
                String(item.category || "").toLowerCase().includes(query)
            );
        }));

        showMessage(food.name + " selected! Scroll down to submit feedback.");

        $("selectedFood")?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

// STAR RATING LOGIC
function updateStars(rating) {
    selectedRating = Number(rating);

    document.querySelectorAll("[data-rating]").forEach(function (star) {
        const starRating = Number(star.dataset.rating);
        const active = starRating <= selectedRating;
        star.classList.toggle("active", active);
        star.setAttribute("aria-pressed", String(starRating === selectedRating));
    });

    const ratingText = $("ratingText");
    if (ratingText) {
        const labels = {
            0: "Choose a rating from 1 to 5 stars.",
            1: "1 star — Poor 😞",
            2: "2 stars — Needs improvement 😐",
            3: "3 stars — Average 🙂",
            4: "4 stars — Good 😊",
            5: "5 stars — Excellent! 🌟"
        };
        ratingText.textContent = labels[selectedRating] || labels[0];
    }
}

function initializeStars() {
    document.querySelectorAll("[data-rating]").forEach(function (star) {
        star.addEventListener("click", function () {
            updateStars(star.dataset.rating);
        });
    });

    updateStars(0);
}

// SUBMIT FEEDBACK HANDLER
async function saveFeedback(payload, form) {
    if (!currentUser) {
        showMessage("Please log in first.", true);
        return;
    }

    if (!selectedFood) {
        showMessage("Please select a food item first.", true);
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : "Submit";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting feedback...";
    }

    const localEntry = {
        user_name: currentUser.name,
        mobile_number: currentUser.mobile,
        user_role: currentUser.role,
        food_id: selectedFood.id,
        food_name: selectedFood.name,
        food_price: selectedFood.price,
        ...payload
    };

    // Attempt saving to server API
    try {
        await apiRequest(API_URL + "/feedback", {
            method: "POST",
            body: JSON.stringify({
                user: currentUser,
                food: {
                    id: selectedFood.id,
                    name: selectedFood.name,
                    price: selectedFood.price
                },
                ...payload
            })
        });
    } catch (error) {
        console.warn("Flask API unavailable, stored in client database fallback:", error.message);
    }

    // Always persist to local storage so feedback is never lost
    saveLocalFeedback(localEntry);

    showMessage("Thank you! Your feedback has been recorded successfully.");
    form.reset();

    if (payload.feedbackType === "Rating / Suggestion") {
        updateStars(0);
    }

    loadPublicStatistics();
    renderAdminMenu(foods);

    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

function initializeReviewForm() {
    const form = $("reviewForm");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        await saveFeedback({
            feedbackType: "Review / Complaint",
            priceOpinion: $("priceOpinion")?.value || "",
            quality: $("quality")?.value || "",
            quantity: $("quantity")?.value || "",
            taste: $("taste")?.value || "",
            hygiene: $("hygiene")?.value || "",
            complaintType: $("complaintType")?.value || "",
            comment: $("comment")?.value.trim() || "",
            rating: null
        }, form);
    });
}

function initializeSuggestionForm() {
    const form = $("suggestionForm");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (selectedRating < 1 || selectedRating > 5) {
            showMessage("Please select a star rating from 1 to 5.", true);
            return;
        }

        await saveFeedback({
            feedbackType: "Rating / Suggestion",
            suggestionType: $("suggestionType")?.value || "",
            suggestion: $("suggestion")?.value.trim() || "",
            rating: selectedRating
        }, form);
    });
}

// =========================================================
// ADMIN PORTAL: AUTHENTICATION & MANAGEMENT
// =========================================================

function showAdminLoginPanel() {
    const loginPanel = $("adminLoginPanel");
    const dashboardPanel = $("adminDashboardPanel");
    if (loginPanel) loginPanel.hidden = false;
    if (dashboardPanel) dashboardPanel.hidden = true;
}

function showAdminDashboardPanel() {
    const loginPanel = $("adminLoginPanel");
    const dashboardPanel = $("adminDashboardPanel");
    if (loginPanel) loginPanel.hidden = true;
    if (dashboardPanel) dashboardPanel.hidden = false;
}

async function checkAdminLogin() {
    try {
        const result = await apiRequest("/api/admin/status");
        if (result.loggedIn) {
            isAdminLoggedIn = true;
            showAdminDashboardPanel();
            await loadAdminFeedback();
            return;
        }
    } catch {
        // Fallback to session check for static/offline deployment
        if (sessionStorage.getItem("canteenAdminLoggedIn") === "true") {
            isAdminLoggedIn = true;
            showAdminDashboardPanel();
            await loadAdminFeedback();
            return;
        }
    }

    isAdminLoggedIn = false;
    showAdminLoginPanel();
}

function initializeAdminAuth() {
    const loginForm = $("adminLoginForm");
    const passwordInput = $("adminPassword");
    const loginMessage = $("adminLoginMessage");
    const logoutBtn = $("adminLogoutButton");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const password = passwordInput?.value || "";

            if (loginMessage) loginMessage.textContent = "Verifying credentials...";

            let authenticated = false;
            try {
                const res = await apiRequest("/api/admin/login", {
                    method: "POST",
                    body: JSON.stringify({ password: password })
                });
                if (res.success) authenticated = true;
            } catch (error) {
                // If backend is unreachable or returns error, check default password
                if (password === "Admin@123") {
                    authenticated = true;
                } else {
                    if (loginMessage) loginMessage.textContent = error.message || "Incorrect admin password.";
                    showMessage("Incorrect admin password. Default is Admin@123", true);
                    return;
                }
            }

            if (authenticated) {
                if (passwordInput) passwordInput.value = "";
                if (loginMessage) loginMessage.textContent = "";

                isAdminLoggedIn = true;
                sessionStorage.setItem("canteenAdminLoggedIn", "true");
                showAdminDashboardPanel();
                showMessage("Admin login successful!");
                await loadAdminFeedback();
            } else {
                if (loginMessage) loginMessage.textContent = "Incorrect admin password.";
                showMessage("Incorrect admin password.", true);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function () {
            try {
                await apiRequest("/api/admin/logout", { method: "POST" });
            } catch {}

            isAdminLoggedIn = false;
            sessionStorage.removeItem("canteenAdminLoggedIn");
            showAdminLoginPanel();
            showMessage("Admin signed out successfully.");
        });
    }
}

// ---------------------------------------------------------
// ADMIN SUBTABS: FEEDBACK DATA VS MENU ITEMS
// ---------------------------------------------------------
function initializeAdminSubtabs() {
    const tabFeedback = $("adminSubtabFeedback");
    const tabMenu = $("adminSubtabMenu");
    const sectionFeedback = $("adminFeedbackSection");
    const sectionMenu = $("adminMenuSection");

    tabFeedback?.addEventListener("click", function () {
        tabFeedback.classList.add("active");
        tabMenu?.classList.remove("active");
        if (sectionFeedback) sectionFeedback.hidden = false;
        if (sectionMenu) sectionMenu.hidden = true;
    });

    tabMenu?.addEventListener("click", function () {
        tabMenu.classList.add("active");
        tabFeedback?.classList.remove("active");
        if (sectionMenu) sectionMenu.hidden = false;
        if (sectionFeedback) sectionFeedback.hidden = true;
        renderAdminMenu(foods);
    });

    // Admin Menu Search & Filter
    const menuSearch = $("adminMenuSearchInput");
    const menuCategory = $("adminMenuCategoryFilter");

    function filterAdminMenu() {
        const query = (menuSearch?.value || "").trim().toLowerCase();
        const category = menuCategory?.value || "";

        const filtered = foods.filter(function (item) {
            const matchesQuery =
                !query ||
                String(item.name || "").toLowerCase().includes(query) ||
                String(item.category || "").toLowerCase().includes(query);

            const matchesCategory = !category || item.category === category;

            return matchesQuery && matchesCategory;
        });

        renderAdminMenu(filtered, true);
    }

    menuSearch?.addEventListener("input", filterAdminMenu);
    menuCategory?.addEventListener("change", filterAdminMenu);
}

function renderAdminMenu(items, isFiltered = false) {
    const container = $("adminMenuList");
    const countBadge = $("adminMenuCountBadge");
    const statusMsg = $("adminMenuStatusMessage");

    if (!isFiltered && countBadge) {
        countBadge.textContent = foods.length || 98;
    }

    if (!container) return;

    if (statusMsg) {
        statusMsg.textContent = `Displaying ${items.length} of ${foods.length || 98} canteen menu items.`;
    }

    container.innerHTML = "";

    if (!items.length) {
        container.innerHTML = '<div class="empty-results">No menu items match the filter.</div>';
        return;
    }

    const allFeedback = getLocalFeedback();

    items.forEach(function (food) {
        const reviews = allFeedback.filter(f => Number(f.food_id) === Number(food.id) || f.food_name === food.name);
        const ratedReviews = reviews.filter(f => f.rating != null && !isNaN(Number(f.rating)));
        const avgRating = ratedReviews.length
            ? (ratedReviews.reduce((sum, f) => sum + Number(f.rating), 0) / ratedReviews.length).toFixed(1) + " ★"
            : "No ratings yet";

        const card = document.createElement("article");
        card.className = "admin-menu-card";

        const top = document.createElement("div");
        top.className = "admin-menu-card-top";

        const iconTitle = document.createElement("div");
        iconTitle.className = "admin-menu-icon-title";

        const icon = document.createElement("span");
        icon.className = "admin-menu-icon";
        icon.textContent = getFoodIcon(food.category, food.name);

        const name = document.createElement("h4");
        name.className = "admin-menu-name";
        name.textContent = food.name;

        iconTitle.append(icon, name);

        const category = document.createElement("span");
        category.className = "admin-menu-category";
        category.textContent = food.category || "Item";

        top.append(iconTitle, category);

        const bottom = document.createElement("div");
        bottom.className = "admin-menu-card-bottom";

        const price = document.createElement("span");
        price.className = "admin-menu-price";
        price.textContent = "₹" + Number(food.price).toFixed(0);

        const stats = document.createElement("span");
        stats.className = "admin-menu-stats";
        stats.textContent = `${reviews.length} feedback · ${avgRating}`;

        bottom.append(price, stats);

        card.append(top, bottom);
        container.appendChild(card);
    });
}

// ---------------------------------------------------------
// ADMIN FEEDBACK DATA LOADING & RENDERING
// ---------------------------------------------------------
function initializeAdminFilters() {
    const searchInput = $("adminSearchInput");
    const typeFilter = $("adminTypeFilter");
    const refreshBtn = $("adminRefreshButton");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(loadAdminFeedback, 300);
        });
    }

    if (typeFilter) {
        typeFilter.addEventListener("change", loadAdminFeedback);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener("click", function () {
            loadAdminFeedback();
            showMessage("Feedback records refreshed.");
        });
    }
}

async function loadAdminFeedback() {
    const statusMsg = $("adminStatusMessage");
    const searchInput = $("adminSearchInput");
    const typeFilter = $("adminTypeFilter");

    if (statusMsg) statusMsg.textContent = "Loading feedback entries...";

    const searchQuery = (searchInput?.value || "").trim().toLowerCase();
    const typeQuery = typeFilter?.value || "";

    let items = [];
    let stats = {};

    // 1. Try Flask API
    try {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (typeQuery) params.set("type", typeQuery);

        const data = await apiRequest(`/api/admin/feedback?${params.toString()}`);
        items = data.feedback || [];
        stats = data.statistics || {};
    } catch {
        // 2. Fallback to Local Storage Database
        const allLocal = getLocalFeedback();

        items = allLocal.filter(function (item) {
            const matchesSearch =
                !searchQuery ||
                String(item.user_name || "").toLowerCase().includes(searchQuery) ||
                String(item.mobile_number || "").toLowerCase().includes(searchQuery) ||
                String(item.food_name || "").toLowerCase().includes(searchQuery) ||
                String(item.comment || "").toLowerCase().includes(searchQuery) ||
                String(item.suggestion || "").toLowerCase().includes(searchQuery) ||
                String(item.complaint_type || "").toLowerCase().includes(searchQuery);

            const matchesType = !typeQuery || item.feedback_type === typeQuery;

            return matchesSearch && matchesType;
        });

        stats = computeLocalStatistics(allLocal, foods);
    }

    // Update Stats Display
    if ($("adminTotalFeedback")) $("adminTotalFeedback").textContent = stats.totalFeedback ?? items.length;
    if ($("adminTotalComplaints")) $("adminTotalComplaints").textContent = stats.complaints ?? 0;
    if ($("adminTotalSuggestions")) $("adminTotalSuggestions").textContent = stats.suggestions ?? 0;
    if ($("adminAverageRating")) $("adminAverageRating").textContent = stats.averageRating ? `${stats.averageRating} ★` : "0";

    // Update Badge
    if ($("adminFeedbackCountBadge")) {
        $("adminFeedbackCountBadge").textContent = stats.totalFeedback ?? items.length;
    }

    renderAdminFeedback(items);

    if (statusMsg) {
        statusMsg.textContent = `Showing ${items.length} matching feedback record(s).`;
    }
}

function renderAdminFeedback(items) {
    const feedbackList = $("adminFeedbackList");
    if (!feedbackList) return;

    feedbackList.replaceChildren();

    if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "empty-results";
        empty.textContent = "No feedback records found matching the criteria.";
        feedbackList.appendChild(empty);
        return;
    }

    items.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "feedback-card";

        // Top Section: User & Food Info
        const top = document.createElement("div");
        top.className = "feedback-top";

        const userInfo = document.createElement("div");
        userInfo.className = "feedback-user-info";

        const title = document.createElement("h3");
        title.textContent = item.user_name || "Anonymous";

        const meta1 = document.createElement("div");
        meta1.className = "feedback-meta";
        meta1.textContent = `${item.user_role || "User"} · Mobile: ${item.mobile_number || "—"}`;

        const meta2 = document.createElement("div");
        meta2.className = "feedback-meta";
        meta2.textContent = `Food: ${item.food_name || "—"} (₹${item.food_price ?? "0"})`;

        const meta3 = document.createElement("div");
        meta3.className = "feedback-meta";
        meta3.textContent = `Submitted: ${formatDate(item.created_at)}`;

        userInfo.append(title, meta1, meta2, meta3);

        const badge = document.createElement("span");
        badge.className = "feedback-type-badge " + (
            item.feedback_type === "Review / Complaint" ? "badge-review" : "badge-rating"
        );
        badge.textContent = item.feedback_type;

        top.append(userInfo, badge);
        card.appendChild(top);

        // Fields Grid (Review details)
        const fields = [
            ["Price Opinion", item.price_opinion],
            ["Quality", item.quality],
            ["Quantity", item.quantity],
            ["Taste", item.taste],
            ["Hygiene", item.hygiene],
            ["Complaint Type", item.complaint_type],
            ["Rating", item.rating ? `${item.rating} / 5 Stars ★` : ""],
            ["Suggestion Category", item.suggestion_type]
        ].filter(([_, val]) => val !== null && val !== undefined && String(val).trim());

        if (fields.length) {
            const grid = document.createElement("div");
            grid.className = "feedback-fields-grid";

            fields.forEach(function ([label, value]) {
                const itemDiv = document.createElement("div");
                itemDiv.className = "feedback-field-item";

                const lbl = document.createElement("span");
                lbl.className = "feedback-field-label";
                lbl.textContent = label;

                const val = document.createElement("span");
                val.className = "feedback-field-val";
                val.textContent = value;

                itemDiv.append(lbl, val);
                grid.appendChild(itemDiv);
            });

            card.appendChild(grid);
        }

        // Additional Comment Box
        if (item.comment && item.comment.trim() && item.comment.trim() !== "NA") {
            const commentBox = document.createElement("div");
            commentBox.className = "feedback-comment-box";

            const commentHeader = document.createElement("strong");
            commentHeader.textContent = "Student Comment / Complaint:";

            const commentText = document.createElement("p");
            commentText.textContent = item.comment;

            commentBox.append(commentHeader, commentText);
            card.appendChild(commentBox);
        }

        // Suggestion Box
        if (item.suggestion && item.suggestion.trim() && item.suggestion.trim() !== "NA") {
            const suggBox = document.createElement("div");
            suggBox.className = "feedback-comment-box";

            const suggHeader = document.createElement("strong");
            suggHeader.textContent = "Student Suggestion:";

            const suggText = document.createElement("p");
            suggText.textContent = item.suggestion;

            suggBox.append(suggHeader, suggText);
            card.appendChild(suggBox);
        }

        // Bottom Actions (Delete)
        const actions = document.createElement("div");
        actions.className = "feedback-actions";

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-button";
        deleteBtn.textContent = "🗑️ Delete Record";

        deleteBtn.addEventListener("click", async function () {
            if (!confirm(`Delete feedback record #${item.id} from ${item.user_name || "this user"} permanently?`)) {
                return;
            }

            try {
                await apiRequest(`/api/admin/feedback/${item.id}`, { method: "DELETE" });
            } catch {}

            // Always delete from local store too
            deleteLocalFeedback(item.id);
            showMessage("Feedback record deleted.");
            await loadAdminFeedback();
            loadPublicStatistics();
            renderAdminMenu(foods);
        });

        actions.appendChild(deleteBtn);
        card.appendChild(actions);

        feedbackList.appendChild(card);
    });
}

// =========================================================
// APPLICATION INITIALIZATION
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    initializeNavigation();
    initializeLogin();
    initializeStudentLogout();
    initializeSearch();
    initializeFoodSelection();
    initializeStars();
    initializeReviewForm();
    initializeSuggestionForm();
    initializeAdminAuth();
    initializeAdminFilters();
    initializeAdminSubtabs();

    loadFoods();
    restoreLogin();
});