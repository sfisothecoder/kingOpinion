"use strict";

// PRIMARY SETTING: Replace this value with the real survey destination URL.
// Include the full URL, starting with https:// (or http:// for local testing).
const SURVEY_URL = "https://tr.ee/yXb5qZ";

// TRACKING CONFIGURATION
// Only these query parameters are copied from this page to the survey URL.
// Rename, add, or remove entries here if the survey provider uses other keys.
const TRACKING_PARAMETER_MAP = {
  subid: "subid",
  sub1: "sub1",
  sub2: "sub2",
  source: "source",
  campaign: "campaign",
  click_id: "click_id"
};

/**
 * Creates the final destination without inventing or altering visitor data.
 * Parameters already configured in SURVEY_URL take precedence over landing-page
 * parameters so intentional destination settings are never overwritten.
 */
function buildSurveyUrl(destination, landingSearch) {
  let surveyUrl;

  try {
    surveyUrl = new URL(destination);
  } catch {
    return null;
  }

  if (surveyUrl.protocol !== "https:" && surveyUrl.protocol !== "http:") {
    return null;
  }

  const incomingParameters = new URLSearchParams(landingSearch);

  Object.entries(TRACKING_PARAMETER_MAP).forEach(([incomingName, destinationName]) => {
    if (incomingParameters.has(incomingName) && !surveyUrl.searchParams.has(destinationName)) {
      surveyUrl.searchParams.set(destinationName, incomingParameters.get(incomingName));
    }
  });

  return surveyUrl.toString();
}

function initializeSurveyButton() {
  const button = document.getElementById("survey-button");
  const redirectNote = document.getElementById("redirect-note");
  const errorMessage = document.getElementById("config-error");
  const destination = buildSurveyUrl(SURVEY_URL, window.location.search);

  if (!button || !redirectNote || !errorMessage) {
    return;
  }

  if (!destination) {
    button.disabled = true;
    button.setAttribute("aria-describedby", "config-error");
    redirectNote.hidden = true;
    errorMessage.hidden = false;
    return;
  }

  button.addEventListener("click", () => {
    window.location.assign(destination);
  });
}

initializeSurveyButton();
