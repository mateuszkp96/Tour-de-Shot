(function (window) {
  window["env"] = window["env"] || {};
//window.response.headers("Acces-Control-Allow-Origin", "*")
  //env.header("Access-Control-Allow-Origin", "*");
  
  //window["env"]["localApiUrl"].header("Acces-Control-Allow-Origin", "*");
  // Environment variables
  window["env"]["localApiUrl"] = "localhost:80/api/local";
  window["env"]["userApiUrl"] = "localhost:80/api/user";
  window["env"]["debug"] = true
})(this);
