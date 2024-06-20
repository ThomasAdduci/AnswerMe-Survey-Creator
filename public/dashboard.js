document.addEventListener('DOMContentLoaded', function() {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');
  const surveyList = document.getElementById('survey-list');

  // Cargar la pestaña por defecto
  showTab('mis-encuestas');

  // Añadir eventos a los enlaces del sidebar
  tabLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const tab = this.getAttribute('data-tab');
          showTab(tab);
      });
  });

  // Mostrar la pestaña seleccionada
  function showTab(tabId) {
      tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === tabId) {
              content.classList.add('active');
          }
      });
      tabLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-tab') === tabId) {
              link.classList.add('active');
          }
      });
  }

  // Cerrar sesión
  document.getElementById('logout-btn').addEventListener('click', function() {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
  });

  // Cargar encuestas del usuario
  fetchSurveys();

  function fetchSurveys() {
      fetch('/api/surveys', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(surveys => {
          surveyList.innerHTML = '';
          surveys.forEach(survey => {
              const li = document.createElement('li');
              li.textContent = `${survey.title} - ${survey.questions.length} preguntas`;
              const actions = document.createElement('div');
              actions.className = 'actions';

              const editBtn = document.createElement('button');
              editBtn.textContent = 'Editar';
              editBtn.addEventListener('click', () => editSurvey(survey._id));

              const removeBtn = document.createElement('button');
              removeBtn.textContent = 'Eliminar';
              removeBtn.addEventListener('click', () => removeSurvey(survey._id));

              actions.appendChild(editBtn);
              actions.appendChild(removeBtn);
              li.appendChild(actions);
              surveyList.appendChild(li);
          });
      });
  }

  function editSurvey(id) {
      // Implementar la funcionalidad para editar la encuesta
  }

  function removeSurvey(id) {
      fetch(`/api/surveys/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      })
      .then(() => fetchSurveys());
  }
});
