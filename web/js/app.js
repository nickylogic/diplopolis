// app.js

window.addEventListener('load', function() {

    var webAuth = new auth0.WebAuth({
      domain: 'diplopolis.auth0.com',
      clientID: 'Yd4eeGk7wo5mgn1loI1Xxqq7iqjQ6mUy',
      responseType: 'token id_token',
      scope: 'openid',
      redirectUri: window.location.href
    });
  
    var loginBtn = document.getElementById('btn-login');
  
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });
  
  });