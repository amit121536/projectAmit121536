// const machineInput = document.getElementById("machineInput");
// const machineList = document.getElementById("machineList");
// const resetBtn = document.getElementById("resetBtn");
// const saveBtn = document.getElementById("saveBtn");
// const editBtn = document.getElementById("editBtn");

// const userId = 1; // Replace with dynamic user ID
// let machines = [];

// // Fetch machines from the API
// async function fetchMachines() {
//   try {
//     const response = await fetch(`/api/list/${userId}`);
//     const data = await response.json();
//     machines = data.map(item => item.text);
//     renderMachines();
//   } catch (error) {
//     console.error("Error fetching machines:", error);
//   }
// }

// // Render machines list
// function renderMachines() {
//   machineList.innerHTML = "";
//   machines.forEach((machine, index) => {
//     const li = document.createElement("li");
//     li.textContent = machine;

//     const removeBtn = document.createElement("button");
//     removeBtn.className = "remove";
//     removeBtn.textContent = "Remove";
//     removeBtn.onclick = () => deleteMachine(index);

//     li.appendChild(removeBtn);
//     machineList.appendChild(li);
//   });
// }

// // Add machine
// async function addMachine(e) {
//   e.preventDefault();
//   const name = machineInput.value.trim();
//   if (name) {
//     try {
//       const response = await fetch(`/api/list`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: name, user_id: userId }),
//       });
//       if (response.ok) {
//         fetchMachines();
//         machineInput.value = "";
//       }
//     } catch (error) {
//       console.error("Error adding machine:", error);
//     }
//   }
// }

// // Delete machine
// async function deleteMachine(index) {
//   try {
//     const response = await fetch(`/api/list/${index}`, { method: "DELETE" });
//     if (response.ok) {
//       fetchMachines();
//     }
//   } catch (error) {
//     console.error("Error deleting machine:", error);
//   }
// }

// // Reset list
// async function resetList() {
//   if (confirm("Are you sure you want to clear the entire list?")) {
//     machines.forEach(async (_, index) => await deleteMachine(index));
//     machines = [];
//     renderMachines();
//   }
// }

// // Enable editing
// function enableEditing() {
//   machineList.innerHTML = "";
//   machines.forEach((machine, index) => {
//     const li = document.createElement("li");

//     const input = document.createElement("input");
//     input.type = "text";
//     input.value = machine;
//     input.className = "edit-input";

//     const saveBtn = document.createElement("button");
//     saveBtn.textContent = "Save";
//     saveBtn.className = "remove";
//     saveBtn.onclick = () => updateMachine(index, input.value.trim());

//     const cancelBtn = document.createElement("button");
//     cancelBtn.textContent = "Cancel";
//     cancelBtn.className = "remove";
//     cancelBtn.onclick = fetchMachines;

//     li.appendChild(input);
//     li.appendChild(saveBtn);
//     li.appendChild(cancelBtn);
//     machineList.appendChild(li);
//   });
// }

// // Update machine
// async function updateMachine(id, newName) {
//   try {
//     const response = await fetch(`/api/list/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: newName }),
//     });
//     if (response.ok) {
//       fetchMachines();
//     }
//   } catch (error) {
//     console.error("Error updating machine:", error);
//   }
// }

// // Attach event listeners
// resetBtn.addEventListener("click", resetList);
// saveBtn.addEventListener("click", fetchMachines);
// editBtn.addEventListener("click", enableEditing);
// machineInput.form.addEventListener("submit", addMachine);

// fetchMachines();


const machineInput = document.getElementById("machineInput");
const machineList = document.getElementById("machineList");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById("editBtn");

const userId = localStorage.getItem("userId"); // Replace with dynamic user ID
let machines = [];

// Fetch machines from the API
async function fetchMachines() {
  try {
    const response = await fetch(`/api/list/${userId}`);
    const data = await response.json();
    machines = data.map(item => ({ id: item.id, text: item.text })); // Store ID correctly
    renderMachines();
  } catch (error) {
    console.error("Error fetching machines:", error);
  }
}

// Render machines list
function renderMachines() {
  machineList.innerHTML = "";
  machines.forEach(machine => {
    const li = document.createElement("li");
    li.textContent = machine.text;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => deleteMachine(machine.id); // Use correct ID

    li.appendChild(removeBtn);
    machineList.appendChild(li);
  });
}

// Add machine
async function addMachine(e) {
  e.preventDefault();
  const name = machineInput.value.trim();
  if (name) {
    try {
      const response = await fetch(`/api/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: name, user_id: userId }),
      });

      if (response.ok) {
        fetchMachines();
        machineInput.value = "";
      }
    } catch (error) {
      console.error("Error adding machine:", error);
    }
  }
}

// Delete machine using correct ID
async function deleteMachine(id) {
  try {
    const response = await fetch(`/api/list/${id}`, { method: "DELETE" });
    if (response.ok) {
      machines = machines.filter(machine => machine.id !== id);
      renderMachines();
    }
  } catch (error) {
    console.error("Error deleting machine:", error);
  }
}

// Reset list properly
async function resetList() {
  if (confirm("Are you sure you want to clear the entire list?")) {
    for (const machine of machines) {
      await deleteMachine(machine.id); // Delete using ID
    }
    machines = [];
    renderMachines();
  }
}

function enableEditing() {
  machineList.innerHTML = "";
  machines.forEach(machine => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = machine.text;
    input.className = "edit-input";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "remove";
    saveBtn.onclick = () => updateMachine(machine.id, input.value.trim());

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "remove";
    cancelBtn.onclick = fetchMachines;

    li.appendChild(input);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
    machineList.appendChild(li);
  });
}

async function updateMachine(id, newName) {
  try {
    const response = await fetch(`/api/list/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newName }),
    });

    if (response.ok) {
      const machineIndex = machines.findIndex(machine => machine.id === id);
      if (machineIndex !== -1) {
        machines[machineIndex].text = newName; // Update locally
      }
      renderMachines(); // Re-render list
    }
  } catch (error) {
    console.error("Error updating machine:", error);
  }
  saveList(); // Save changes to the server
}

async function saveList() {
  try {
    // Loop through local machines and update them in the API
    for (const machine of machines) {
      await fetch(`/api/list/${machine.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: machine.text }),
      });
    }

    alert("List saved successfully!");
    fetchMachines(); // Refresh the updated list
  } catch (error) {
    console.error("Error saving list:", error);
  }
}


fetchMachines();

// Attach event listeners correctly
resetBtn.addEventListener("click", resetList);
// saveBtn.addEventListener("click", fetchMachines);
editBtn.addEventListener("click", enableEditing);
