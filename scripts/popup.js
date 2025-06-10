
document.getElementById("options").onclick = () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage()
    } else {
        window.open(chrome.runtime.getURL('options.html'))
    }
}
async function add_site_to_blocklist(updated_site_list) {
    await chrome.storage.local.set({ "blocked_websites": updated_site_list })
}

async function get_blocked_websites() {
    let blocked_websites = await chrome.storage.local.get("blocked_websites")
    blocked_websites = blocked_websites.blocked_websites
    return blocked_websites
}

async function get_curr_tabs_url() {
    let query_options = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(query_options);
    let site_url = tab.url
    no_slashes = 0
    curr_url_index = 0
    while (no_slashes < 3) {
        if (site_url[curr_url_index] == "/") {
            no_slashes++
        }
        curr_url_index++
    }
    site_url = site_url.slice(site_url.indexOf("//") + 2, curr_url_index - 1)
    
    return [site_url , tab.id]
}

window.onload = async () => {
    let blocked_sites = await get_blocked_websites()
    let [curr_site_url,tabId] = await get_curr_tabs_url()
    if (blocked_sites && blocked_sites.includes(curr_site_url)) {
        let add_rem_button = document.getElementById('add_sites')
        add_rem_button.innerText = "Unblock This Page"
        add_rem_button.classList.remove("button")
        add_rem_button.classList.add("blocked-button")

    }



}
document.getElementById("add_sites").onclick = async () => {

    let [curr_site_url,tabId] = await get_curr_tabs_url()
    let blocked_sites = await get_blocked_websites()
    let button_class = document.getElementById('add_sites')

    if (button_class.classList.contains("blocked-button") && blocked_sites.includes(curr_site_url)) {

        blocked_sites.splice(blocked_sites.indexOf(curr_site_url), 1);
        button_class.innerHTML = "Block This Page"
        button_class.classList.remove("blocked-button")
        button_class.classList.add("button")
    }

    else if (button_class.classList.contains("button")) {
        blocked_sites.push(curr_site_url)
    }

    await add_site_to_blocklist(blocked_sites)
    window.location.reload()
    chrome.tabs.reload(tabId)
}
