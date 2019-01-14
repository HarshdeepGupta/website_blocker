const fs = require('fs');

// let host_path = "C:/Windows/System32/drivers/etc/hosts"
let host_path = "hosts"
let redirectPath = '127.0.0.1'
let websites_to_block = ['www.quora.com', 'www.amazon.com']

let delay = 1000;

function read_host_file(host_path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(host_path, (err, data) => {
            if (err) {
                throw err
            }
            let fileContents = data.toString();
            resolve(fileContents);
        })
    });
}

function add_website_to_blocked_list(host_path, website_to_block) {
    return new Promise((resolve, reject) => {
        fs.appendFile(host_path, website_to_block, (err) => {
            if (err) return console.log(err);
            resolve();
        });
    });
}

async function block_websites(host_path) {
    let date = new Date();
    let hours = date.getHours();
    if ((hours >= 12 && hours <= 18) | true) {

        read_host_file(host_path).then((fileContents) => {
            for (index in websites_to_block) {
                let website_to_block = '\n' + redirectPath + " " + websites_to_block[index];
                if (fileContents.indexOf(website_to_block) < 0) {
                    add_website_to_blocked_list(host_path, website_to_block).then(() => {
                        console.log(`${websites_to_block[index]} blocked`);
                    })
                }
            }
        })

    }
}

function unblock_websites(host_path) {
    return new Promise((resolve, reject) => {
        fs.writeFile(host_path, '', (err) => {
            if (err) {
                throw err;
            }
            resolve();
        })
    })
}


async function main() {
    await block_websites(host_path);

    unblock_websites(host_path).then(() => {
        console.log("All websited unblocked!")
    });


}

main()