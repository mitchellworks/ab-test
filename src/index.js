(() => {
  const isJustServe = window.location.href.includes(
    "https://www.justserve.org"
  );
  const hasALaunch = window.location.href.includes("alaunch=true");
  const isComeUntoChrist = window.location.href.includes(
    "https://www.comeuntochrist.org"
  );
  const isCOJC = window.location.href.includes(
    "https://www.churchofjesuschrist.org"
  );

  if (isJustServe) {
    // load something
    // https://assets.adobedtm.com/launch-ENbd1012719c384610add56b0c2cfcb7d5.min.js
  } else if (hasALaunch) {
    // load something
    // do we care about this? Does anyone use it?
  } else if (isComeUntoChrist) {
    // load old stuffff...
  } else if (isCOJC) {
    // pull in our new optimize
  } else {
    console.log("Nothing to load here. ;)");
  }
})();
