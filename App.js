const express = require('express'); 
const app = express(); 
const port = 3000;
const fs = require('fs');

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extends : true}))

app.get('/', (req, res)=> {
    res.render('index', {
        title : 'Home Page'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'About Page'
    })
})

app.get('/contact', (req, res)=> { 
    const contacts = loadData(); 
    res.render('contact', { 
        nama : 'agus', 
        title : 'Contact Page',
        contacts 

    })
})

app.get('/contact/delete/:nama', (req, res)=> { 
    deleteData(req.params.nama);
    res.redirect('/contact')
})


app.post('/contact', (req, res)=> { 
    addData(req.body);
    res.redirect('/contact')
})

app.get('/contact/:nama', (req, res)=> { 
    const contact = findData(req.params.nama);
    res.render('contactDetail', { 
        nama : 'agus', 
        title : 'Contact Page',
        contact 

    })
})

app.use('/', (req, res)=> {
    res.send('404 Not Found')
})

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
})


const yargs = require('yargs');
// const fs = require('fs'); 

const loadData = ()=> {
    const data = JSON.parse(fs.readFileSync('./data/product.json', 'utf-8')); 
    return data;
}

const findData = (nama)=> {
    const contacts = loadData(); 
    const contact = contacts.find((contact)=> contact.nama === nama ) 
    return contact
}

const addData = (data) => {
    const contacts = loadData(); 
    const newContact = contacts.find(newContact => newContact.nama.toLowerCase() === data.nama.toLowerCase())
    console.log(data.nama, newContact)
    if(newContact) {
        console.log('data sudah ada')   
    } else {
        console.log('data berhasil di tambahkan')
        contacts.push(data); 
        fs.writeFileSync('./data/product.json', JSON.stringify(contacts));
    }
}

const deleteData = (data)=> {
    const contacts = loadData(); 
    const newData = contacts.filter(newData => newData.nama != data)
    fs.writeFileSync('./data/product.json', JSON.stringify(newData)); 

}

// loadData();

// yargs.command({
//     command : 'add', 
//     describe : 'Menambahkan kontak', 
//     builder : {
//         nama : {
//             describe : 'Nama Lengkap', 
//             demandOption : true, 
//             type : 'string'
//         }, 
//         email : {
//             describe : 'Email ', 
//             demandOption : true, 
//             type : 'string'
//         }, 
//     }, 
//     handler(argv) {
//         const data = {
//             nama : argv.nama, 
//             email : argv.email
//         } 

//         // 1. Buat folder data jika belum ada 
//         const pathFolder = './data'
//         if( !fs.existsSync(pathFolder) ) {
//             fs.mkdirSync(pathFolder)
//         }

//         // 2. Buat file product.json jika belum ada 
//         const pathFile = './data/product.json'
//         if( !fs.existsSync(pathFile) ) {
//             fs.writeFileSync(pathFile, "[]", "utf-8");
//         }

//         const contacts = loadData(); 
//         // cek apakah nama yang di input sudah ada atau belum
//         const newData = contacts.find((contact)=> contact.nama === argv.nama )
//         if(newData) {
//             console.log('data sudah ada');
//         } else { 
//             contacts.push(data); 
//             fs.writeFileSync('./data/product.json', JSON.stringify(contacts)); 
//             console.log(contacts);
//         }

//     }
// }); 



// yargs.command({
//     command : 'detail', 
//     describe : 'Melihat detail kontak', 
//     builder : {
//         nama : {
//             describe : 'Nama Lengkap', 
//             demandOption : true, 
//             type : 'string'
//         }
//     }, 
//     handler(argv) {
//         const contacts = loadData(); 
//         // cek apakah nama ada atau tidak.
//         const newData = contacts.find((contact)=> contact.nama === argv.nama )
//         if(newData) {
//             console.log('data tidak ditemukan');
//         } else { 
//             contacts.push(data); 
//             fs.writeFileSync('./data/product.json', JSON.stringify(contacts)); 
//             console.log(contacts);
//         }

//     }
// })



// yargs.parse();
