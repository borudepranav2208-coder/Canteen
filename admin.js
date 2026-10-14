
const loginPanel = document.getElementById("loginPanel");
const dashboardPanel = document.getElementById("dashboardPanel");
const loginForm = document.getElementById("loginForm");
const adminPassword = document.getElementById("adminPassword");
const loginMessage = document.getElementById("loginMessage");
const statusMessage = document.getElementById("statusMessage");
const feedbackList = document.getElementById("feedbackList");

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

let searchTimer;

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        credentials: "same-origin",
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...(options.headers || {})
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
    }

    return data;
}

function showLogin() {
    loginPanel.hidden = false;
    dashboardPanel.hidden = true;
}

function showDashboard() {
    loginPanel.hidden = true;
    dashboardPanel.hidden = false;
}

async function checkLogin() {
    try {
        const result = await apiRequest("/api/admin/status");

        if (result.loggedIn) {
            showDashboard();
            await loadFeedback();
        } else {
            showLogin();
        }
    } catch (error) {
        showLogin();
        loginMessage.textContent =
            "Unable to connect to the server. Please check that Flask is running.";
    }
}

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    loginMessage.textContent = "Checking password...";

    try {
        await apiRequest("/api/admin/login", {
            method: "POST",
            body: JSON.stringify({
                password: adminPassword.value
            })
        });

        adminPassword.value = "";
        loginMessage.textContent = "";
        showDashboard();
        await loadFeedback();
    } catch (error) {
        loginMessage.textContent = error.message;
    }
});

document.getElementById("logoutButton").addEventListener("click", async function () {
    try {
        await apiRequest("/api/admin/logout", { method: "POST" });
        showLogin();
        loginMessage.textContent = "You have logged out.";
    } catch (error) {
        statusMessage.textContent = error.message;
    }
});

document.getElementById("refreshButton").addEventListener("click", loadFeedback);

searchInput.addEventListener("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(loadFeedback, 300);
});

typeFilter.addEventListener("change", loadFeedback);

function addText(parent, tag, text, className = "") {
    const element = document.createElement(tag);
    element.textContent = text || "";
    if (className) element.className = className;
    parent.appendChild(element);
    return element;
}

function renderFeedback(items) {
    feedbackList.replaceChildren();

    if (!items.length) {
        addText(feedbackList, "p", "No feedback found.", "empty-message");
        return;
    }

    items.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "feedback-card";

        const top = document.createElement("div");
        top.className = "feedback-top";

        const details = document.createElement("div");
        addText(details, "h3", item.user_name || "Anonymous");
        addText(
            details,
            "div",
            `${item.user_role || ""} · ${item.mobile_number || ""}`,
            "feedback-meta"
        );
        addText(
            details,
            "div",
            `Food: ${item.food_name || "—"} · Price: ₹${item.food_price ?? "—"}`,
            "feedback-meta"
        );
        addText(
            details,
            "div",
            `Submitted: ${item.created_at || "—"}`,
            "feedback-meta"
        );

        top.appendChild(details);
        addText(top, "span", item.feedback_type, "feedback-type");
        card.appendChild(top);

        const content = document.createElement("div");
        content.className = "feedback-content";

        const fields = [
            ["Price opinion", item.price_opinion],
            ["Quality", item.quality],
            ["Quantity", item.quantity],
            ["Taste", item.taste],
            ["Hygiene", item.hygiene],
            ["Complaint type", item.complaint_type],
            ["Rating", item.rating ? `${item.rating}/5 stars` : ""],
            ["Comment", item.comment],
            ["Suggestion category", item.suggestion_type],
            ["Suggestion", item.suggestion]
        ];

        fields.forEach(function ([label, value]) {
            if (value !== null && value !== undefined && String(value).trim()) {
                addText(content, "p", `${label}: ${value}`);
            }
        });

        card.appendChild(content);

        const deleteButton = addText(
            card,
            "button",
            "Delete Feedback",
            "delete-button"
        );

        deleteButton.type = "button";
        deleteButton.addEventListener("click", async function () {
            if (!confirm("Delete this feedback permanently?")) return;

            try {
                await apiRequest(`/api/admin/feedback/${item.id}`, {
                    method: "DELETE"
                });
                await loadFeedback();
            } catch (error) {
                statusMessage.textContent = error.message;
            }
        });

        feedbackList.appendChild(card);
    });
}

async function loadFeedback() {
    statusMessage.textContent = "Loading feedback...";

    const params = new URLSearchParams();
    params.set("search", searchInput.value.trim());

    if (typeFilter.value) {
        params.set("type", typeFilter.value);
    }

    try {
        const data = await apiRequest(
            `/api/admin/feedback?${params.toString()}`
        );

        const stats = data.statistics || {};

        document.getElementById("totalFeedback").textContent =
            stats.totalFeedback ?? 0;
        document.getElementById("totalComplaints").textContent =
            stats.complaints ?? 0;
        document.getElementById("totalSuggestions").textContent =
            stats.suggestions ?? 0;
        document.getElementById("averageRating").textContent =
            stats.averageRating ?? 0;

        renderFeedback(data.feedback || []);
        statusMessage.textContent =
            `Showing ${(data.feedback || []).length} matching record(s).`;
    } catch (error) {
        statusMessage.textContent = error.message;

        if (error.message.toLowerCase().includes("log in")) {
            showLogin();
        }
    }
}

checkLogin();
