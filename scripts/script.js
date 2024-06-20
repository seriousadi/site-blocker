

async function get_blocked_websites() {
  let blocked_websites = await chrome.storage.local.get("blocked_websites")
  blocked_websites = blocked_websites.blocked_websites
  return blocked_websites
}



async function validate_site(body_innerHTML_substitute) {
  let current_site_name = window.location.host
  let blocked_websites = await get_blocked_websites()


  for (let index = 0; index < blocked_websites.length; index++) {
    if (blocked_websites[index].search(current_site_name) > -1) {
      document.querySelector("body").innerHTML = body_innerHTML_substitute
    }
  }
}
validate_site("This site has been blocked by Site blocker extension")