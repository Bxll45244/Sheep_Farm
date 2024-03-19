document.addEventListener("DOMContentLoaded", function() {
  const addForm = document.getElementById('addForm');
  const notification = document.getElementById('notification');
  const animalList = document.getElementById('animalList');

  addForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const birthdate = document.getElementById('birthdate').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const image = document.getElementById('image').files[0];

    const newAnimal = {
      name: name,
      gender: gender,
      birthdate: birthdate,
      breed: breed,
      age: age,
      image: URL.createObjectURL(image)
    };

    addForm.reset();
    notification.innerText = 'Data added successfully!';
    notification.style.display = 'block';
    setTimeout(function() {
      notification.style.display = 'none';
    }, 3000);

    displayAnimal(newAnimal);
  });

  function displayAnimal(animal) {
    const animalDiv = document.createElement('div');
    animalDiv.classList.add('animal');
    animalDiv.innerHTML = `
      <img src="${animal.image}" alt="${animal.name}">
      <h2>${animal.name}</h2>
      <p><strong>Gender:</strong> ${animal.gender}</p>
      <p><strong>Birthdate:</strong> ${animal.birthdate}</p>
      <p><strong>Breed:</strong> ${animal.breed}</p>
      <p><strong>Age:</strong> ${animal.age}</p>
      <button onclick="sellAnimal(this)">Sell</button>
    `;
    animalList.appendChild(animalDiv);
  }

  function sellAnimal(button) {
    const animal = button.parentNode;
    animal.parentNode.removeChild(animal);

    // สร้างใบเสร็จ PDF
    createReceipt(animal);

    // ปริ้นใบเสร็จเลย
    setTimeout(function() {
      window.open('receipt.pdf', '_blank');
    }, 500); // ให้รอเวลาสักครู่ก่อนที่จะปริ้น
  }

  function createReceipt(animal) {
    const doc = new jsPDF();

    const receiptContent = `
      Animal Name: ${animal.querySelector('h2').innerText}
      Gender: ${animal.querySelector('p:nth-child(3)').innerText.replace('Gender: ', '')}
      Birthdate: ${animal.querySelector('p:nth-child(4)').innerText.replace('Birthdate: ', '')}
      Breed: ${animal.querySelector('p:nth-child(5)').innerText.replace('Breed: ', '')}
      Age: ${animal.querySelector('p:nth-child(6)').innerText.replace('Age: ', '')}
    `;

    doc.text(receiptContent, 10, 10);
    doc.save('receipt.pdf');
  }

  window.onload = function() {
    alert('Welcome to the farm');
  };
});
