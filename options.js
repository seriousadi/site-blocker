async function add_site_to_blocklist(updated_site_list) {
    await chrome.storage.local.set({ "blocked_websites": updated_site_list })
}

async function get_blocked_websites() {
    let blocked_websites = await chrome.storage.local.get("blocked_websites")
    blocked_websites = blocked_websites.blocked_websites
    return blocked_websites
}

window.onload = async () => {
    let blocked_sites = await get_blocked_websites()
    if (blocked_sites){
        blocked_sites = blocked_sites.join("\n")
        document.getElementById("textarea").value = blocked_sites
    
    }

}
document.getElementById("add_sites").onclick = async () => {
    let textarea_value = document.getElementById("textarea").value
    textarea_value = textarea_value.split("\n")
    await add_site_to_blocklist(textarea_value)
}
