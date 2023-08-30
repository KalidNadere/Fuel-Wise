// Sign up function
const signupFormHandler = async (event) => {
  event.preventDefault();

  //query selector information needs to be added
  const username = document.querySelector("#signupusername").value.trim();
  const email = document.querySelector("#signupemail").value.trim();
  const password = document.querySelector("#signuppassword").value.trim();

  // makes sure name/email/password has been filled
  if (username && email && password) {
    // creates a fetch request
    const reply = await fetch("api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    //if response is succesful reroute the user to the profile page
    if (reply.ok) {
      document.location.replace("/");
    } else {
      alert(reply.statusText);
    }
  }
};

//   add name of form here
document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
