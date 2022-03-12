import fs from 'fs'
import csv from 'csv-parser'
const path = './csv-file'
const files = fs.readdirSync(path)

function createMd(data){
    data.tags = data.tags.match(/\b(\w+)\b/g)
    fs.writeFileSync(`./weights/${data.title}.md`, JSON.stringify(data, null, 2))
}

fs.createReadStream(path + '/' + files[0])
    .pipe(csv())
    .on('data', data => createMd(data))
    .on('end', () => { console.log('DONE') })
    

