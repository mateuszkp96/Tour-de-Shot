(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["localApiUrl"] = "${LOCAL_API_URL}";
  window["env"]["userApiUrl"] = "${USER_API_URL}";
  window["env"]["historyApiUrl"] = "${HISTORY_API_URL}";
  window["env"]["googleAuthProvider"] = "${GOOGLE_AUTH_PROVIDER}";
  window["env"]["debug"] = "${DEBUG}";
  window["env"]["keycloakLoginUrl"] = "${KEYCLOAK_LOGIN_URL}";
})(this);
