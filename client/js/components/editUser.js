import browseQuizzes from "./browseQuizzes.js";

const renderEditUser = async (user) => {
    try {
      const { id, first_name, last_name, email } = user;
      const main = document.querySelector('#quiz-div');
      main.innerHTML = `
        <h1 class="card-title text-center mb-4">QUIZZY LA-LA EDIT PROFILE PAGE</h1>
        <form id="edit-form" data-action="editprofile">
         <input type="hidden" value="${id}" name="id" id="id"></input>
          <section id="errors"></section>
          <div class="form-group">
            <label for="first_name">First Name:</label>
            <input type="text" class="form-control" name="first_name" id="first_name" value="${first_name}" required>
          </div>
          <div class="form-group">
              <label for="last_name">Last Name:</label>
              <input type="text" class="form-control" name="last_name" id="last_name" value="${last_name}" required>
            </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" name="email" id="email" value="${email}" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Enter password" required>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" class="form-control" name="confirm-password" id="confirm-password" placeholder="Confirm password" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Edit User Details</button>
        </form>
      `;
      document.querySelector('#edit-form').addEventListener('submit', handleEditFormSubmit);
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
  
    const id = parseInt(formData.get('id'));
  
    const body = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
  
    const options = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    try {
      const res = await fetch(`/api/users/${id}`, options);
      // console.log(res);
      browseQuizzes();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

export default renderEditUser