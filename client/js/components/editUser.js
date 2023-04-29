import browseQuizzes from "./browseQuizzes.js";

const renderEditUser = async (user) => {
  console.log('user', user)
    try {
      const { id, first_name, last_name, email } = user;
      const main = document.querySelector('#quiz-div');
      main.innerHTML = `
      <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <h1 class="card-title text-center mb-4">${first_name}'s Details </h1>
          <form id="edit-form" data-action="editprofile">
            <input type="hidden" value="${id}" name="id" id="id">
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
              <label for="confirm_password">Confirm Password:</label>
              <input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block custom-btn">Update Details</button>
          </form>
        </div>
      </div>
    </div>
    
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
    //console.log(id)
  
    const body = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password')
    }
    console.log('body: ', body)
  
    const options = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    try {
      console.log(id)
      const res = await fetch(`/api/users/${id}`, options);
      // console.log(res);
      browseQuizzes();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

export default renderEditUser