async function get_current_site_url(){
let tabs_query_result = await chrome.tabs.query({active:true,currentWindow:true})
let site_url = tabs_query_result[0].url
return site_url
}

console.log(get_current_site_url())