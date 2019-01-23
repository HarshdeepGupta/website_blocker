const fs = require('fs');

let host_path = "C:/Windows/System32/drivers/etc/hosts"
// let host_path = "hosts"
let redirectPath = '127.0.0.1'
let websites_to_block = ['www.quora.com', 'www.amazon.com']

let delay = 1000;

function read_host_file(host_path) {
    let data = fs.readFileSync(host_path);
    return data.toString();
}

function add_website_to_blocked_list(host_path, website_to_block) {
    fs.appendFileSync(host_path, website_to_block);
}

function block_websites(host_path) {
    fileContents = read_host_file(host_path);
    for (index in websites_to_block) {
        let website_to_block = '\n' + redirectPath + " " + websites_to_block[index];
        if (fileContents.indexOf(website_to_block) < 0) {
            add_website_to_blocked_list(host_path, website_to_block)
        }
    }
}

function unblock_websites(host_path) {
    fs.writeFileSync(host_path, '')
}


function main() {
    console.log("This is step 1");
    block_websites(host_path);
    console.log("This is step 2");
    unblock_websites(host_path);
}

let date = new Date();
let hours = date.getHours();
if ((hours >= 12 && hours <= 18) | true) {
    main()
}