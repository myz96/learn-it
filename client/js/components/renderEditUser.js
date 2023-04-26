
const renderEditUser = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const user = await res.json();
      const { id, first_name, last_name, email, password } = user[0];
      const main = document.querySelector('main');
      main.innerHTML = `
        <form id="edit-form">
            <h1>Create new edit</h1>
            <input type="hidden" value="${id}" name="id" id="id"></input>
            <p><label for="first_name">First Name</label><input type="text" name="first_name" id="first_name" value="${first_name}"></p>
            <p><label for="last_name">Last Name</label><input type="text" name="last_name" id="last_name" value="${last_name}"></p>

            <p><label for="email">Email</label><input type="text" name="email" id="email" value="${email}"></p>
            <p><label for="password">Address</label><input type="password" name="password" id="address" value="Enter new password"></p>
            <p><label for="password">Address</label><input type="password" name="password" id="address" value="Re-enter new password"></p>
            <button type="submit"> Edit User Details </button>
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
      console.log(res);
      renderChallengeList();
      return res;
    } catch (err) {
      next(err);
    }
  };