// Sign up function 
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    //query selector information needs to be added
    const name = document.querySelector('#signupusername').value.trim();
    const email = document.querySelector('#signupemail').value.trim();
    const password = document.querySelector('#signuppassword').value.trim();
  
    // makes sure name/email/password has been filled 
    if (name && email && password) {
        // creates a fetch request
      const reply = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      //if response is succesful reroute the user to the profile page
      if (reply.ok) {
        document.location.replace('/profile');
      } else {
        alert(reply.statusText);
      }
    }
  };

//   add name of form here 
  document.querySelector('#signupsubmit').addEventListener('submit', signupFormHandler);