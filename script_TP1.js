// Array para almacenar los alumnos (si ya existe en localStorage, lo cargamos)
let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

// Referencias a los elementos del DOM
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const altaAlumnosPage = document.getElementById('altaAlumnosPage');
const alumnosPage = document.getElementById('alumnosPage');

// Función para actualizar la tabla con los datos del array de alumnos
function updateTable() {
  studentTableBody.innerHTML = ''; // Limpiamos el contenido anterior
  alumnos.forEach((alumno, index) => {
    const row = `<tr>
                  <td>${index + 1}</td>
                  <td>${alumno.nombre}</td>
                  <td>${alumno.apellido}</td>
                </tr>`;
    studentTableBody.innerHTML += row;
  });
}

// Guardar alumnos en localStorage
function saveToLocalStorage() {
  localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Cargar alumnos desde localStorage al iniciar la página
function loadFromLocalStorage() {
  updateTable(); // Actualizamos la tabla con los datos cargados
}

// Evento cuando se envía el formulario de alta de alumnos
studentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores de los campos de entrada
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;

  // Validar que los campos no estén vacíos
  if (nombre && apellido) {
    // Crear un nuevo objeto alumno y agregarlo al array
    const nuevoAlumno = {
      nombre: nombre,
      apellido: apellido
    };
    alumnos.push(nuevoAlumno); // Agregamos el nuevo alumno al array

    // Guardar en localStorage
    saveToLocalStorage();

    // Limpiar el formulario
    studentForm.reset();

    alert('Alumno agregado correctamente');
  } else {
    alert('Por favor complete los campos obligatorios.');
  }
});

// Cambiar entre la página de alta de alumnos y la página de lista de alumnos
function switchPage() {
  if (altaAlumnosPage.style.display === 'none') {
    altaAlumnosPage.style.display = 'block';
    alumnosPage.style.display = 'none';
  } else {
    altaAlumnosPage.style.display = 'none';
    alumnosPage.style.display = 'block';
    
    loadFromLocalStorage(); // Cargar los alumnos en la tabla cuando se cambia a la página de lista
  }
}