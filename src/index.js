document.addEventListener('DOMContentLoaded', function (){
const form = document.getElementById('guest-form');
const nameInput = document.getElementById('guest-name');
const categorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');
const guestCount = document.getElementById('guest-count');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const category = categorySelect.value;

  if (!name) return;

  if (guests.length >= 10) {
    alert('Guest list limit reached! (Max: 10)');
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    category,
    attending: true,
    timeAdded: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  updateList();
  form.reset();
});

function updateList() {
  guestList.innerHTML = '';
  guestCount.textContent = `Guests: ${guests.length}/10`;

  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = 'guest-item';

    const info = document.createElement('div');
    info.className = 'guest-info';
    info.innerHTML = `
      <strong class="category-${guest.category}">${guest.name}</strong>
      <small>${guest.category} • Added at ${guest.timeAdded}</small>
      <small>Status: ${guest.attending ? 'Attending' : 'Not Attending'}</small>
    `;
    const actions = document.createElement('div');
    actions.className = 'guest-actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.onclick = () => {
      guest.attending = !guest.attending;
      updateList();
    };
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = guest.name;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newName = input.value.trim();
          if (newName) {
            guest.name = newName;
            updateList();
          }
        }
      });
      info.innerHTML = '';
      info.appendChild(input);
      input.focus();
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      updateList();
    };

    

    actions.append(toggleBtn, editBtn, deleteBtn);
    li.append(info, actions);
    guestList.appendChild(li);
  });
}

});