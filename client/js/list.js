async function fetchItems(userId) {
  const itemsList = document.getElementById('itemsList');
  itemsList.innerHTML = ''; // ניקוי רשימה קיימת

  try {
    const response = await fetch(`http://localhost:3000/api/list/${userId}`);
    if (!response.ok) throw new Error('שגיאה בשרת');

    const items = await response.json();
    if (items.length === 0) {
      itemsList.innerHTML = '<li>לא נמצאו פריטים</li>';
    } else {
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = JSON.stringify(item.text);
        itemsList.appendChild(li);
      });
    }
  } catch (error) {
    itemsList.innerHTML = `<li>שגיאה בשליפת נתונים: ${error.message}</li>`;
  }
}
function clearMachineList() {
  if (confirm("Are you sure you want to clear the entire list?")) {
    machines = [];
    saveAndRender();
  }
}

// ביצוע הקריאה אוטומטית בטעינת הדף
window.addEventListener('DOMContentLoaded', () => {
  const defaultUserId = 2; // כאן אתה מגדיר את userId ברירת המחדל
  fetchItems(defaultUserId);
});
