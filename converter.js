import fs from 'fs'
import csv from 'csv-parser'
const sourcePath = './csv-file'
const resultPath = './resulting-md-files'
const files = fs.readdirSync(sourcePath)

function createMd(data){
    data.tags = data.tags.match(/\b(\w+)\b/g)
    fs.writeFileSync(`${resultPath}/${data.title}.md`, JSON.stringify(data, null, 2))
}

if( !files[0] || files[0].indexOf('.csv') === -1){
    console.warn('No .csv file detected')
}
else{
    fs.createReadStream(sourcePath + '/' + files[0])
    .pipe(csv())
    .on('data', data => createMd(data))
    .on('end', () => { console.log('DONE') })
}
    

