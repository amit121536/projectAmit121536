// Function to toggle between Login and Sign-Up forms
function toggleForms() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
}

// Sign-Up Form Validation
function validateSignupForm(event) {
    event.preventDefault(); // כדי למנוע שליחה אוטומטית של הטופס
    let valid = true;

    // נקה שגיאות קודמות
    document.getElementById("emailError").textContent = '';
    document.getElementById("passwordError").textContent = '';
    document.getElementById("confirmPasswordError").textContent = '';

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const username = document.getElementById("signup-fullname").value;

    // ולידציית אימייל
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = 'Invalid email format.';
        valid = false;
    }

    // ולידציית סיסמה
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").textContent = 
            'Password must be 8-16 characters long, include one uppercase letter, one number, and one special character.';
        valid = false;
    }

    if (confirmPassword !== password) {
        document.getElementById("confirmPasswordError").textContent = 'Passwords do not match.';
        valid = false;
    }

    if (!valid) return false;

    // שליחת הבקשה לשרת
    fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Register response:", data);
        if (data.message) {
            alert(data.message);
            toggleForms(); // מעבר לטופס התחברות
        } else if (data.error) {
            alert("Error: " + data.error);
        } else {
            alert("Unknown response from server");
        }
    })
    .catch(error => {
        console.error('Register error:', error);
        alert('בעיה בשליחת הבקשה');
    });

    return false;
}

// Login Form Validation
function validateLoginForm(event) {
    event.preventDefault(); // עצור שליחה רגילה של הטופס

    let valid = true;

    // נקה שגיאות קודמות
    document.getElementById("loginEmailError").textContent = '';
    document.getElementById("loginPasswordError").textContent = '';

    // קלטים
    const email = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // ולידציה לאימייל
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("loginEmailError").textContent = 'Invalid email format.';
        valid = false;
    }

    // ולידציה לסיסמה
    if (password.trim().length < 8) {
        document.getElementById("loginPasswordError").textContent = 'Password must be at least 8 characters long.';
        valid = false;
    }

    if (!valid) return false;

    // שליחת הבקשה לשרת
    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Login response:", data);
        if (data.message) {
            alert(data.message);
            window.location.href = '/list';
            localStorage.setItem('userId', data.userId); // שמירת userId ב-localStorage
        } else if (data.error) {
            alert("Error: " + data.error);
        } else {
            alert("Unknown response from server");
        }
    })
    .catch(err => {
        console.error('Login error:', err);
        alert('הייתה בעיה בהתחברות');
    });

    return false;
}
