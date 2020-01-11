let userLocation;

getUserLocation = () => {
  fetch('http://ip-api.com/json/')
    .then(res => res.json())
    .then(response => {
      userLocation = response;
    })
    .catch((err) => {
      console.error('Request Failed - This may be caused by an AdBlocker. Please disable or enter a valid country.');
    })
}

getUserLocation();