import UIkit from "uikit";

let config = {
  status: "danger",
  timeout: 4000,
  pos: "top-right"
};

export function showError(error) {
  if (error.response.data.errors) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    UIkit.notification(error.response.data.errors.join(), config);
  } else if (error.response.data.status_message) {
    UIkit.notification(error.response.data.status_message, config);
  }

   else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    UIkit.notification(error.request, config);
  } else {
    // Something happened in setting up the request that triggered an Error
    UIkit.notification(error.message, config);
  }
}
