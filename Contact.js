const fs = require('fs'); 
const readline = require('readline'); 
const rl = readline.createInterface({
    input : process.stdin, 
    output : process.stdout
})

// 1. Buat folder data jika belum ada 
const pathFolder = './data'
if( !fs.existsSync(pathFolder) ) {
    fs.mkdirSync(pathFolder)
}

// 2. Buat file product.json jika belum ada 
const pathFile = './data/product.json'
if( !fs.existsSync(pathFile) ) {
    fs.writeFileSync(pathFile, "[]", "utf-8");
}

// 3. Buat pertanyaan 
const masukanNama = (pertanyaan)=> {
    return new Promise((resolve, reject)=> {
        rl.question(pertanyaan, nama => {
            resolve(nama);
        })
    })
}

const masukanEmail = (pertanyaan)=> {
    return new Promise((resolve, reject)=> {
        rl.question(pertanyaan, email => {
            resolve(email);
        })
    })
}

const simpanContact = (nama, email)=> {
    const data = {nama, email} 
    let contacts = JSON.parse(fs.readFileSync('./data/product.json')); 
    let findData = contacts.find((contact)=> contact.nama.toLowerCase() === nama.toLowerCase()); 
    if(findData) {
        console.log('data sudah ada ')
    } else {
        contacts.push(data)
        fs.writeFileSync('./data/product.json', JSON.stringify(contacts)); 
        console.log('Terimakasih telah Memasukan data dengan benar')
    }
    rl.close()
}

module.exports = {simpanContact, masukanNama, masukanEmail}


