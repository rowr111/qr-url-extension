document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({ type: "GET_DOMAIN" }, function(response) {
    const domain = response.domain;
    // console.log(domain)
    if (!domain) {
      document.getElementById('domain').textContent = "Page has an invalid URL";
    };
    let currentTime = new Date();
    const timezoneMarker = (currentTime.getTimezoneOffset()/60>0 ? "-": "+")+
                           (currentTime.getTimezoneOffset()/60<10 ? "0" : "")+
                           (Math.abs(currentTime.getTimezoneOffset()/60))+":00";

    // Interval set to 1000ms to limit the maximum offset between system time and time displayed 
    setInterval(()=>{
      // .toISOString() returns UTC zero offset time, not local time
      // Solution: subtract local offset from current time, format with .toISOString(), and add timezone marker
      // .slice() removes milliseconds and trailing Z, which indicates UTC zero offset time
      currentTime = new Date();
      let currentTimeOffsetSubtracted = currentTime.getTime() - currentTime.getTimezoneOffset() * 60 * 1000;
      let localCurrentTime = new Date(currentTimeOffsetSubtracted);
      let currentTimeString = localCurrentTime.toISOString().slice(0, -5) + timezoneMarker;

      let qrContent = "pwauth://pass/" + domain + "?time=" + currentTimeString;
      // console.log(qrContent);
      new QRious({
        element: document.getElementById('qr'),
        value: qrContent,
        size: 128,
        level: 'M'
      });
    }, 1000)

    new QRious({
      element: document.getElementById('qr'),
      value: domain,
      size: 128,
      level: 'M'
    });

    document.getElementById('domain').textContent = domain;
  });
});
