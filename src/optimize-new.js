// AMBER SEZ:
// HERE'S THE ORDER WE NEED, I THINK
// 1. add visitor api code FIRST
loadVisitorAPI();
// 2. call getInstance
//var visitor = Visitor.getInstance("66C5485451E56AAE0A490D45@AdobeOrg");
// 3. call abp -- call this something else?
abp();
// 4. add targetPageParams()
addTargetPageParams();
// 5. Now add at.js code
loadAT();
// 6. log tests to ttMETA
makeTTMETA();
console.log("done");
/////////////////////////////////////
// functions
/////////////////////////////////////
// targetPageParams ///////////////
function addTargetPageParams() {
  window.targetPageParams = function() {
    if (typeof localStorage !== "undefined") {
      var profile = JSON.parse(localStorage.getItem("t_userObject") || "{}");
      profile.first_time_visitor = !localStorage.getItem("tealium_va");

      var just_serve = JSON.parse(localStorage.getItem("user") || "{}");
      profile.just_serve_admin = !!just_serve.isAdmin;

      var keep = ["c", "m", "g"];
      var abp = JSON.parse(localStorage.getItem("abp") || "{}");
      var abp2 = {};
      keep.forEach(k => (abp2[k] = JSON.stringify(abp[k])));
      profile.abp = abp2;
      profile.audience = getCookie("p_audience");

      //Set asset ids for Personalization targeting
      var id = "";
      if (
        window.location.href.indexOf(
          "https://www.churchofjesuschrist.org/blog/"
        ) !== -1
      )
        id = "abv01-" + hash(window.location.pathname);

      return {
        profile: profile,
        entity: {
          id
        }
      };
    } else {
      return "";
    }
  };
}
// ttMETA function ///////////////
function makeTTMETA() {
  if (typeof adobe !== "undefined") {
    document.addEventListener(adobe.target.event.REQUEST_SUCCEEDED, function(
      e
    ) {
      window.ttMETA = typeof window.ttMETA !== "undefined" ? window.ttMETA : [];
      var tokens = e.detail.responseTokens;
      if (!tokens) {
        return;
      }
      tokens.forEach(function(token) {
        window.ttMETA.push({
          CampaignName: token["activity.name"],
          CampaignId: token["activity.id"],
          RecipeName: token["experience.name"],
          RecipeId: token["experience.id"]
        });
      });
    });
  }
}
// add to profile //////////
function abp() {
  var tuo = JSON.parse(localStorage.getItem("t_userObject") || "{}");
  var abp = JSON.parse(localStorage.getItem("abp") || "{}");
  if (tuo && tuo.lds_acct && !abp.account) abp.account = !!tuo.lds_acct;

  if (document.referrer.indexOf("login.churchofjesuschrist.org") !== -1)
    fetch("https://www.churchofjesuschrist.org/header")
      .then(function(r) {
        r.text().then(function(html) {
          var parts = html.split("\n").filter(function(r) {
            return r.trim().length;
          });
          var tagMap = [
            {
              name: "c",
              selector: "policy-ldspositions",
              convert: function(v) {
                v = v || "";
                return v.split(":").map(function(c) {
                  return c.split("/")[0];
                });
              }
            },
            {
              name: "m",
              selector: "policy-ldsaccountid",
              convert: function(v) {
                return !!v;
              }
            },
            {
              name: "g",
              selector: "policy-gender",
              convert: function(v) {
                var map = {
                  M: 1,
                  F: 2
                };
                return map[v];
              }
            }
          ];
          tagMap.forEach(function(t) {
            t.value = parts.find(function(p) {
              return p.indexOf(t.selector) !== -1;
            });
            t.value = t.value.split("</b> ")[1].replace("<br>", "");
            if (t.convert) abp[t.name] = t.convert(t.value);
            else abp[t.name] = t.value;
          });
          localStorage.setItem("abp", JSON.stringify(abp));
        });
      })
      .catch(function(e) {});
  var tld = window.location.host;
  abp[tld] = abp[tld] || 0;
  abp[tld]++;
  localStorage.setItem("abp", JSON.stringify(abp));
  window.ABP = function(k, v) {
    var abp = JSON.parse(localStorage.getItem("abp") || "{}");
    if (v === undefined) {
      return abp[k];
    } else {
      abp[k] = v;
      localStorage.setItem("abp", JSON.stringify(abp));
    }
  };
}

////////////
// HELPERS
////////////
function getCookie(a) {
  var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
function hash(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

//////////////
// VISITORAPI and AT
//////////////
function loadVisitorAPI() {}

function loadAT() {}
