async function get_blocked_websites() {
  let blocked_websites = await chrome.storage.local.get("blocked_websites")
  blocked_websites = blocked_websites.blocked_websites
  return blocked_websites
}



async function validate_site(body_innerHTML_substitute) {
  let current_site_name = window.location.host
  let blocked_websites = await get_blocked_websites()
  if (blocked_websites && current_site_name && blocked_websites.includes(current_site_name)) {
    document.querySelector("body").innerHTML = body_innerHTML_substitute
  }
}
validate_site("<h1> This site has been blocked by the 'Site blocker' extension. </h1>")