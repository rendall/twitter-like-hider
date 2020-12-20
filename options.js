// Saves options to chrome.storage
function applyOptions() {
  // console.log("TwitterLikesHider:applyOptions()");

  const optionsCheckboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  const options = optionsCheckboxes.reduce(
    (opt, checkbox) => ({ ...opt, [checkbox.id]: checkbox.checked }),
    {}
  );

  var saveButton = document.getElementById("apply-button");

  if (options.store) {
    // The user wants to store options
    // check if permitted:
    chrome.permissions.contains(
      {
        permissions: ["storage"],
      },
      function (isPermitted) {
        // console.log("TwitterLikesHider:storage.isPermitted", isPermitted);
        if (isPermitted) {
          // Local storage is permitted
          try {
            chrome.storage.local.set(
              { "twitter-like-hider-options": options },
              function () {
                setStatus("Options saved", "success");
                saveButton.setAttribute("disabled", true);
              }
            );
          } catch (error) {
            console.error("twitterLikesHider:", { error });
            setStatus(`Options not saved ${error.message}`, "error");
          }
        } else {
          // user wants to store options
          // but has not yet given permission
          setStatus("Grant 'storage' permission");
          chrome.permissions.request(
            {
              permissions: ["storage"],
            },
            function (isGranted) {
              // The callback argument will be true if the user granted the permissions.
              if (isGranted) {
                applyOptions();
                return;
              } else {
                setStatus("Storage permissions declined", "warning");
              }
            }
          );
        }
      }
    );
  } else {
    // The user does not want to store these options locally
    // This option is working, but hidden on the options page
    // The interaction of states may be confusing from a UXD perspective
    chrome.permissions.contains(
      {
        permissions: ["storage"],
      },
      function (isPermitted) {
        if (isPermitted) {
          chrome.storage.local.get(
            "twitter-like-hider-options",
            function (items) {
              const hasStoredOptions = items
                ? !!items["twitter-like-hider-options"]
                : false;
              chrome.storage.local.set({ "twitter-like-hider-options": null });
              if (hasStoredOptions)
                setStatus(
                  "Options applied. On reload, options will revert to default"
                );
              else setStatus("Options applied, not saved");
              // console.log("TwitterLikesHider:applyOptions:setStatus", { items, hasStoredOptions, options, });
            }
          );
        } else setStatus("Options applied, not saved");
      }
    );
  }

  chrome.runtime.sendMessage({ type: "optionChange", value: options });
}

function setStatus(message, type) {
  var status = document.getElementById("status");
  status.textContent = message;

  status.classList.forEach((style) => status.classList.remove(style));

  if (type) status.classList.add(type);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  const defaultOptions = {
    follows: true,
    likes: true,
    retweeted: false,
    received: false,
    store: true, // 'store:false' is an experimental option only
  };
  // console.log("TwitterLikesHider:restoreOptions()");
  const setChecked = (keyVals) =>
    Object.keys(keyVals).forEach((key) => {
      document.getElementById(key).checked = keyVals[key];
    });
  chrome.permissions.contains(
    {
      permissions: ["storage"],
    },
    function (isPermitted) {
      // console.log( "TwitterLikesHider:options.js:storage.isPermitted", isPermitted);
      if (isPermitted && chrome.storage) {
        chrome.storage.local.get(
          "twitter-like-hider-options",
          function (items) {
            const options = items ? items["twitter-like-hider-options"] : null;
            // console.log( "TwitterLikesHider:options.js:restoreOptions():chrome.storage.local.get", items, options);
            if (options) setChecked(options);
            else setChecked(defaultOptions);
          }
        );
      } else setChecked(defaultOptions);
    }
  );
}

const optionsSetup = () => {
  // console.log("TwitterLikesHider:optionsSetup");
  document
    .getElementById("apply-button")
    .addEventListener("click", applyOptions);
  const optionsCheckboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  optionsCheckboxes.forEach((input) =>
    input.addEventListener("change", () => {
      setStatus("Click the Save button to set these options");
      var saveButton = document.getElementById("apply-button");
      saveButton.removeAttribute("disabled");
    })
  );
  document.getElementById("apply-button").setAttribute("disabled", true);
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", restoreOptions);
  else restoreOptions();
  setStatus("Change options then click 'Save'");
};

optionsSetup();
