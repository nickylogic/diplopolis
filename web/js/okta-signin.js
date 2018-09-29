
// Example:
//   okta = {
//     baseUrl: 'https://dev-567019.oktapreview.com',
//     clientId: '0oagcxaqv6WNNI4P88h7'
//   }
function oktaSignIn(okta) {
    var signIn = new OktaSignIn({
        baseUrl: okta.baseUrl,
        clientId: okta.clientId,
        authParams: {
            issuer: `${okta.baseUrl}/oauth2/default`,
            responseType: ["token", "id_token"],
            display: "page"
        }
    });
    if (signIn.token.hasTokensInUrl()) {
        signIn.token.parseTokensFromUrl(
            function success(res) {
            // The tokens are returned in the order requested by `responseType` above
            var accessToken = res[0];
            var idToken = res[1];

            // Say hello to the person who just signed in:
            console.log("Hello, " + idToken.claims.email);

            // Save the tokens for later use, e.g. if the page gets refreshed:
            signIn.tokenManager.add("accessToken", accessToken);
            signIn.tokenManager.add("idToken", idToken);

            // Remove the tokens from the window location hash
            window.location.hash = "";
            },
            function error(err) {
            // handle errors as needed
            console.error(err);
        });
    } else {
        signIn.session.get(function(res) {
            // Session exists, show logged in state.
            if (res.status === "ACTIVE") {
            console.log("Welcome back, " + res.login);
            return;
            }
            // No session, show the login form
            signIn.renderEl(
            { el: "#okta-login-container" },
            function success(res) {
                // Nothing to do in this case, the widget will automatically redirect
                // the user to Okta for authentication, then back to this page if successful
            },
            function error(err) {
                // handle errors as needed
                console.error(err);
            }
            );
        });
    }
}
