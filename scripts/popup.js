/* 
async function get_localsotrage_data() {

    let site_to_block = document.getElementById("site_url").value

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab) {

        const response = await chrome.tabs.sendMessage(tab.id, { add_site: site_to_block });
        alert(response)
        if (response) {
            console.log("added the site")

        } else {
            console.log("something went wrong")

        }
        console.log(response)
    }
}
    */

let add_site_form = document.getElementById("submit").onclick = () => {
    //get_localsotrage_data()
    console.log("clicked button")
}