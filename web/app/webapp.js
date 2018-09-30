// app.js

var lock = new Auth0Lock(
  'Yd4eeGk7wo5mgn1loI1Xxqq7iqjQ6mUy',
  'diplopolis.auth0.com'
);
  
// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    document.getElementById('nick').textContent = profile.nickname;

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    document.getElementById("btn-login").style.visibility = "hidden";
    document.getElementById("btn-logout").style.visibility = "visible";
  });
});

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});

document.getElementById('btn-logout').addEventListener('click', function() {
  lock.logout();
  document.getElementById("btn-login").style.visibility = "visible";
  document.getElementById("btn-logout").style.visibility = "login";
});