
import os
import sqlite3
from pathlib import Path
from functools import wraps

from flask import (
    Flask,
    jsonify,
    redirect,
    request,
    send_from_directory,
    session
)

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "canteen.db"

# Local testing settings. Change these before deployment.
app.secret_key = os.environ.get(
    "CANTEEN_SECRET_KEY",
    "change-this-secret-key-before-deployment"
)

ADMIN_PASSWORD = os.environ.get(
    "CANTEEN_ADMIN_PASSWORD",
    "Admin@123"
)


# =========================================================
# ORIGINAL CANTEEN MENU: 98 ITEMS
# =========================================================

MENU_ROWS = [
    (1, "Tea", 10, "Beverages"),
    (2, "Coffee", 15, "Beverages"),
    (3, "Cold Coffee", 40, "Beverages"),
    (4, "Lemon Tea", 15, "Beverages"),
    (5, "Hot Chocolate", 35, "Beverages"),
    (6, "Milk", 20, "Beverages"),
    (7, "Lassi", 25, "Beverages"),
    (8, "Mango Shake", 40, "Beverages"),
    (9, "Chocolate Shake", 45, "Beverages"),
    (10, "Mineral Water", 20, "Beverages"),
    (11, "Samosa", 15, "Snacks"),
    (12, "Vada Pav", 15, "Snacks"),
    (13, "Pav Bhaji", 50, "Snacks"),
    (14, "Misal Pav", 40, "Snacks"),
    (15, "Poha", 25, "Breakfast"),
    (16, "Upma", 25, "Breakfast"),
    (17, "Idli Sambar", 35, "Breakfast"),
    (18, "Medu Vada", 30, "Breakfast"),
    (19, "Dosa", 40, "Breakfast"),
    (20, "Masala Dosa", 50, "Breakfast"),
    (21, "Uttapam", 45, "Breakfast"),
    (22, "Sandwich", 30, "Snacks"),
    (23, "Veg Sandwich", 35, "Snacks"),
    (24, "Cheese Sandwich", 45, "Snacks"),
    (25, "Grilled Sandwich", 50, "Snacks"),
    (26, "Veg Burger", 40, "Fast Food"),
    (27, "Cheese Burger", 50, "Fast Food"),
    (28, "French Fries", 40, "Fast Food"),
    (29, "Peri Peri Fries", 50, "Fast Food"),
    (30, "Veg Pizza", 70, "Fast Food"),
    (31, "Cheese Pizza", 80, "Fast Food"),
    (32, "Margherita Pizza", 75, "Fast Food"),
    (33, "Veg Maggie", 30, "Fast Food"),
    (34, "Cheese Maggie", 40, "Fast Food"),
    (35, "Masala Maggie", 35, "Fast Food"),
    (36, "Veg Momos", 40, "Fast Food"),
    (37, "Fried Momos", 50, "Fast Food"),
    (38, "Paneer Momos", 55, "Fast Food"),
    (39, "Spring Roll", 40, "Snacks"),
    (40, "Veg Manchurian", 60, "Chinese"),
    (41, "Hakka Noodles", 60, "Chinese"),
    (42, "Schezwan Noodles", 65, "Chinese"),
    (43, "Fried Rice", 55, "Chinese"),
    (44, "Schezwan Rice", 65, "Chinese"),
    (45, "Paneer Fried Rice", 75, "Chinese"),
    (46, "Veg Biryani", 70, "Meals"),
    (47, "Paneer Biryani", 90, "Meals"),
    (48, "Dal Rice", 50, "Meals"),
    (49, "Rajma Rice", 60, "Meals"),
    (50, "Chole Rice", 60, "Meals"),
    (51, "Veg Thali", 80, "Meals"),
    (52, "Mini Thali", 60, "Meals"),
    (53, "Chapati Bhaji", 45, "Meals"),
    (54, "Paneer Bhurji", 70, "Meals"),
    (55, "Dal Tadka", 60, "Meals"),
    (56, "Jeera Rice", 45, "Meals"),
    (57, "Curd Rice", 45, "Meals"),
    (58, "Aloo Paratha", 35, "Meals"),
    (59, "Paneer Paratha", 50, "Meals"),
    (60, "Cheese Paratha", 50, "Meals"),
    (61, "Puri Bhaji", 45, "Breakfast"),
    (62, "Chole Bhature", 60, "Meals"),
    (63, "Veg Pulao", 55, "Meals"),
    (64, "Masala Pav", 35, "Snacks"),
    (65, "Cheese Pav Bhaji", 65, "Snacks"),
    (66, "Kachori", 15, "Snacks"),
    (67, "Bread Pakora", 20, "Snacks"),
    (68, "Onion Pakora", 25, "Snacks"),
    (69, "Paneer Pakora", 40, "Snacks"),
    (70, "Dhokla", 25, "Snacks"),
    (71, "Khandvi", 30, "Snacks"),
    (72, "Bhel Puri", 25, "Snacks"),
    (73, "Sev Puri", 30, "Snacks"),
    (74, "Pani Puri", 30, "Snacks"),
    (75, "Dahi Puri", 35, "Snacks"),
    (76, "Fruit Salad", 40, "Healthy"),
    (77, "Veg Salad", 35, "Healthy"),
    (78, "Sprouts Salad", 35, "Healthy"),
    (79, "Corn Chaat", 35, "Healthy"),
    (80, "Boiled Eggs", 30, "Healthy"),
    (81, "Chocolate Brownie", 40, "Desserts"),
    (82, "Gulab Jamun", 25, "Desserts"),
    (83, "Rasgulla", 25, "Desserts"),
    (84, "Ice Cream", 30, "Desserts"),
    (85, "Vanilla Ice Cream", 30, "Desserts"),
    (86, "Chocolate Ice Cream", 35, "Desserts"),
    (87, "Cup Cake", 25, "Desserts"),
    (88, "Donut", 30, "Desserts"),
    (89, "Cookies", 20, "Desserts"),
    (90, "Muffin", 30, "Desserts"),
    (91, "Apple Juice", 30, "Beverages"),
    (92, "Orange Juice", 30, "Beverages"),
    (93, "Watermelon Juice", 30, "Beverages"),
    (94, "Buttermilk", 20, "Beverages"),
    (95, "Cold Drink", 25, "Beverages"),
    (96, "Energy Drink", 40, "Beverages"),
    (97, "Fruit Milkshake", 40, "Beverages"),
    (98, "Mango Mastani", 60, "Beverages")
]


# =========================================================
# DATABASE
# =========================================================

def get_db_path():
    # Support serverless platforms like Vercel where application directory is read-only
    if os.environ.get("VERCEL") or not os.access(BASE_DIR, os.W_OK):
        tmp_dir = Path("/tmp")
        if tmp_dir.exists():
            tmp_db = tmp_dir / "canteen.db"
            if not tmp_db.exists() and DATABASE.exists():
                import shutil
                try:
                    shutil.copy2(DATABASE, tmp_db)
                except Exception:
                    pass
            return tmp_db
    return DATABASE


def get_connection():
    connection = sqlite3.connect(get_db_path())
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:

        connection.execute("""
            CREATE TABLE IF NOT EXISTS feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name TEXT NOT NULL,
                mobile_number TEXT NOT NULL,
                user_role TEXT NOT NULL,
                food_id INTEGER NOT NULL,
                food_name TEXT NOT NULL,
                food_price REAL NOT NULL,
                feedback_type TEXT NOT NULL,
                price_opinion TEXT,
                quality TEXT,
                quantity TEXT,
                taste TEXT,
                hygiene TEXT,
                complaint_type TEXT,
                comment TEXT,
                rating INTEGER,
                suggestion_type TEXT,
                suggestion TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Auto-migrate table if any column is missing from previous schemas
        existing_cols = [
            row["name"] for row in connection.execute("PRAGMA table_info(feedback)").fetchall()
        ]
        expected_columns = {
            "mobile_number": "TEXT DEFAULT ''",
            "price_opinion": "TEXT DEFAULT ''",
            "quality": "TEXT DEFAULT ''",
            "quantity": "TEXT DEFAULT ''",
            "taste": "TEXT DEFAULT ''",
            "hygiene": "TEXT DEFAULT ''",
            "complaint_type": "TEXT DEFAULT ''",
            "comment": "TEXT DEFAULT ''",
            "rating": "INTEGER",
            "suggestion_type": "TEXT DEFAULT ''",
            "suggestion": "TEXT DEFAULT ''",
            "created_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
        }
        for col_name, col_def in expected_columns.items():
            if col_name not in existing_cols:
                connection.execute(f"ALTER TABLE feedback ADD COLUMN {col_name} {col_def}")

        connection.execute("""
            CREATE TABLE IF NOT EXISTS menu (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                category TEXT NOT NULL
            )
        """)

        count = connection.execute(
            "SELECT COUNT(*) FROM menu"
        ).fetchone()[0]

        # Populate the menu only if it is empty.
        # Existing menu items and prices are preserved.
        if count == 0:
            connection.executemany("""
                INSERT INTO menu (id, name, price, category)
                VALUES (?, ?, ?, ?)
            """, MENU_ROWS)


# =========================================================
# FIND WEBSITE FILES
# Supports files in the project folder OR .vscode folder
# =========================================================

def find_website_file(filename):
    possible_names = [
        filename,
        filename.lower(),
        filename.capitalize()
    ]

    for name in possible_names:
        for folder in [BASE_DIR, BASE_DIR / ".vscode"]:
            candidate = folder / name
            if candidate.is_file():
                return candidate

    return None


def serve_website_file(filename):
    file_path = find_website_file(filename)

    if file_path is None:
        return jsonify({
            "error": "File not found",
            "missing_file": filename,
            "searched_locations": [
                str(BASE_DIR / filename),
                str(BASE_DIR / ".vscode" / filename)
            ],
            "hint": "Check the filename and its location in VS Code."
        }), 404

    return send_from_directory(
        str(file_path.parent),
        file_path.name
    )


# =========================================================
# MAIN WEBSITE
# =========================================================

@app.route("/")
def home():
    return serve_website_file("index.html")


@app.route("/index.html")
def index_file():
    return serve_website_file("index.html")


@app.route("/style.css")
def stylesheet():
    return serve_website_file("style.css")


@app.route("/script.js")
def javascript():
    return serve_website_file("script.js")


# =========================================================
# ADMIN WEBSITE (COMBINED INTO SINGLE PORTAL)
# =========================================================

@app.route("/admin")
def admin_page():
    return redirect("/#admin")


@app.route("/admin.html")
def admin_html_redirect():
    return redirect("/#admin")


@app.route("/admin.css")
def admin_stylesheet():
    return serve_website_file("style.css")


@app.route("/admin.js")
def admin_javascript():
    return serve_website_file("script.js")


# =========================================================
# ADMIN LOGIN AND AUTHENTICATION
# =========================================================

def admin_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if not session.get("admin_logged_in"):
            return jsonify({
                "success": False,
                "error": "Please log in as admin."
            }), 401

        return function(*args, **kwargs)

    return wrapper


@app.route("/api/admin/status", methods=["GET"])
def admin_status():
    logged_in = bool(session.get("admin_logged_in"))

    return jsonify({
        "loggedIn": logged_in,
        "authenticated": logged_in
    })


@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json(silent=True) or {}
    password = str(data.get("password", ""))

    if password != ADMIN_PASSWORD:
        return jsonify({
            "success": False,
            "error": "Incorrect admin password."
        }), 401

    session["admin_logged_in"] = True

    return jsonify({
        "success": True,
        "message": "Admin login successful."
    })


@app.route("/api/admin/logout", methods=["POST"])
def admin_logout():
    session.pop("admin_logged_in", None)

    return jsonify({
        "success": True,
        "message": "Logged out successfully."
    })


# =========================================================
# MENU API
# =========================================================

@app.route("/api/menu", methods=["GET"])
def get_menu():
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT id, name, price, category
            FROM menu
            ORDER BY id
        """).fetchall()

    return jsonify([dict(row) for row in rows])


# =========================================================
# SAVE FEEDBACK
# =========================================================

@app.route("/api/feedback", methods=["POST"])
def save_feedback():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "Invalid request data."
        }), 400

    user = data.get("user") or {}
    food = data.get("food") or {}

    user_name = str(user.get("name", "")).strip()
    mobile = str(user.get("mobile", "")).strip()
    role = str(user.get("role", "")).strip()

    feedback_type = str(
        data.get("feedbackType", "")
    ).strip()

    if not user_name or role not in ("Student", "Faculty"):
        return jsonify({
            "error": "Please provide valid user details."
        }), 400

    if not mobile.isdigit() or len(mobile) != 10:
        return jsonify({
            "error": "Please provide a valid 10-digit mobile number."
        }), 400

    if feedback_type not in (
        "Review / Complaint",
        "Rating / Suggestion"
    ):
        return jsonify({
            "error": "Invalid feedback type."
        }), 400

    rating = data.get("rating")

    if feedback_type == "Rating / Suggestion":
        try:
            rating = int(rating)
        except (TypeError, ValueError):
            return jsonify({
                "error": "Please select a rating from 1 to 5."
            }), 400

        if not 1 <= rating <= 5:
            return jsonify({
                "error": "Rating must be between 1 and 5."
            }), 400
    else:
        rating = None

    try:
        food_id = int(food.get("id"))
    except (TypeError, ValueError):
        return jsonify({
            "error": "Invalid food details."
        }), 400

    with get_connection() as connection:
        saved_food = connection.execute("""
            SELECT id, name, price
            FROM menu
            WHERE id = ?
        """, (food_id,)).fetchone()

        if saved_food is None:
            return jsonify({
                "error": "Food item not found in the menu."
            }), 404

        connection.execute("""
            INSERT INTO feedback (
                user_name,
                mobile_number,
                user_role,
                food_id,
                food_name,
                food_price,
                feedback_type,
                price_opinion,
                quality,
                quantity,
                taste,
                hygiene,
                complaint_type,
                comment,
                rating,
                suggestion_type,
                suggestion
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            user_name,
            mobile,
            role,
            saved_food["id"],
            saved_food["name"],
            saved_food["price"],
            feedback_type,
            data.get("priceOpinion", ""),
            data.get("quality", ""),
            data.get("quantity", ""),
            data.get("taste", ""),
            data.get("hygiene", ""),
            data.get("complaintType", ""),
            data.get("comment", ""),
            rating,
            data.get("suggestionType", ""),
            data.get("suggestion", "")
        ))

    return jsonify({
        "success": True,
        "message": "Feedback saved successfully."
    }), 201


# =========================================================
# PUBLIC STATISTICS API
# =========================================================

@app.route("/api/statistics", methods=["GET"])
def get_statistics():
    with get_connection() as connection:
        total = connection.execute(
            "SELECT COUNT(*) FROM feedback"
        ).fetchone()[0]

        average = connection.execute("""
            SELECT AVG(rating)
            FROM feedback
            WHERE rating IS NOT NULL
        """).fetchone()[0]

        complaints = connection.execute("""
            SELECT COUNT(*)
            FROM feedback
            WHERE feedback_type = 'Review / Complaint'
        """).fetchone()[0]

        menu_items = connection.execute(
            "SELECT COUNT(*) FROM menu"
        ).fetchone()[0]

    return jsonify({
        "totalFeedback": total,
        "averageRating": round(average, 2) if average is not None else 0,
        "complaints": complaints,
        "totalMenuItems": menu_items
    })


# =========================================================
# ADMIN FEEDBACK API: SEARCH, FILTER AND STATISTICS
# =========================================================

@app.route("/api/admin/feedback", methods=["GET"])
@admin_required
def admin_get_feedback():
    search_text = request.args.get("search", "").strip()
    feedback_type = request.args.get("type", "").strip()

    query = "SELECT * FROM feedback WHERE 1=1"
    parameters = []

    if search_text:
        pattern = f"%{search_text}%"

        query += """
            AND (
                user_name LIKE ?
                OR mobile_number LIKE ?
                OR food_name LIKE ?
                OR comment LIKE ?
                OR suggestion LIKE ?
                OR complaint_type LIKE ?
            )
        """

        parameters.extend([pattern] * 6)

    if feedback_type in (
        "Review / Complaint",
        "Rating / Suggestion"
    ):
        query += " AND feedback_type = ?"
        parameters.append(feedback_type)

    query += " ORDER BY id DESC"

    with get_connection() as connection:
        rows = connection.execute(
            query,
            parameters
        ).fetchall()

        total = connection.execute(
            "SELECT COUNT(*) FROM feedback"
        ).fetchone()[0]

        average = connection.execute("""
            SELECT AVG(rating)
            FROM feedback
            WHERE rating IS NOT NULL
        """).fetchone()[0]

        complaints = connection.execute("""
            SELECT COUNT(*)
            FROM feedback
            WHERE feedback_type = 'Review / Complaint'
        """).fetchone()[0]

        suggestions = connection.execute("""
            SELECT COUNT(*)
            FROM feedback
            WHERE feedback_type = 'Rating / Suggestion'
        """).fetchone()[0]

    feedback_list = [dict(row) for row in rows]

    statistics = {
        "totalFeedback": total,
        "averageRating": round(average, 2) if average is not None else 0,
        "complaints": complaints,
        "suggestions": suggestions
    }

    return jsonify({
        "success": True,
        "feedback": feedback_list,
        "items": feedback_list,
        "statistics": statistics,
        "stats": statistics
    })


# =========================================================
# ADMIN: DELETE A FEEDBACK RECORD
# =========================================================

@app.route(
    "/api/admin/feedback/<int:feedback_id>",
    methods=["DELETE"]
)
@admin_required
def admin_delete_feedback(feedback_id):
    with get_connection() as connection:
        existing = connection.execute(
            "SELECT id FROM feedback WHERE id = ?",
            (feedback_id,)
        ).fetchone()

        if existing is None:
            return jsonify({
                "success": False,
                "error": "Feedback record not found."
            }), 404

        connection.execute(
            "DELETE FROM feedback WHERE id = ?",
            (feedback_id,)
        )

    return jsonify({
        "success": True,
        "message": "Feedback deleted successfully."
    })


# Initialize database on import for WSGI/Serverless deployment
try:
    initialize_database()
except Exception:
    pass

if __name__ == "__main__":

    print("=" * 50)
    print("CANTEEN VOICE")
    print("=" * 50)
    print("Main website: http://127.0.0.1:5000")
    print("Admin dashboard: http://127.0.0.1:5000/admin")
    print("Default admin password: Admin@123")
    print("=" * 50)

    app.run(debug=True)
