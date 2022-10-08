let appUrl = "http://localhost:3000/";

export default function apiRequest(props) {
  fetch(appUrl + props.route, {
    method: props.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...props.body,
      user_id: localStorage.getItem("user_id"),
    }),
  }).then(function (result) {
    result.json().then(function (data) {
      props.onReturn(data);
    });
  });
}
