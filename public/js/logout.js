const logout = async () => {
    // send a fetch request tp backend to logout user
    const reply = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    //if response is 200 then change document to /
    if (reply.ok) {
      document.location.replace('/');
    } else {
      alert(reply.statusText);
    }
  };
  
  //modifiy the event listener depending on the name of the button 
  document.querySelector('#logout').addEventListener('click', logout);