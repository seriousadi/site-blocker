// localStorage.setItem("checking","the test was sucessfull")
// console.log(alert(window.location.host))
// document.querySelector("body").innerHTML = "chorde ye sab lordu"

async function add_site_to_blocklist(updated_site_list) {
  await chrome.storage.local.set({ "blocked_websites": updated_site_list })
}

async function get_blocked_websites() {
  let blocked_websites = await chrome.storage.local.get("blocked_websites")
  blocked_websites = blocked_websites.blocked_websites
  return blocked_websites
}

async function remove_specific_sites(withrdaw_from_blocklist){
  let all_blocked_websites = await get_blocked_websites()
  let sites_to_withrdaw = withrdaw_from_blocklist.length -1 

  while ( sites_to_withrdaw >= 0  ){
    let index_of_site_to_remove = all_blocked_websites.indexOf(withrdaw_from_blocklist[sites_to_withrdaw])
    if (index_of_site_to_remove > -1){
      withrdaw_from_blocklist.splice(index_of_site_to_remove,1)
    }
    sites_to_withrdaw = sites_to_withrdaw - 1
  }
}

async function remove_all_sites(){
 await chrome.storage.local.remove("blocked_websites")
}



/*
add_site_to_blocklist(["https://www.upwork.com/freelancers/~01d1c20809c431ef9f",
      "https://www.w3schools.com/jsref/jsref_search.asp",
      "https://keep.google.com/u/0/"
  ]) */
chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    let all_blocked_websites = await get_blocked_websites()
    let site_to_block = request.add_site

    if (site_to_block && all_blocked_websites) {
      all_blocked_websites.push(site_to_block)
      add_site_to_blocklist(all_blocked_websites)

    } else if (site_to_block && !all_blocked_websites) {
      add_site_to_blocklist(site_to_block.add_site)

    } else {
      // handle when the input ("site_to_bloc") is empty 

    }

  }
);

async function validate_site(body_innerHTML_substitute){
  let current_site_name = window.location.host
  let blocked_websites = await get_blocked_websites()
  
  for(let index = 0; index < blocked_websites.length; index++){
    if (blocked_websites[index].search(current_site_name) > -1){
      document.querySelector("body").innerHTML = body_innerHTML_substitute
    }
  }
}