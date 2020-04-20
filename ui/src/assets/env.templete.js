(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["localApiUrl"] = "${LOCAL_API_URL}";
  window["env"]["userApiUrl"] = "${USER_API_URL}";
  window["env"]["debug"] = "${DEBUG}";
})(this);
