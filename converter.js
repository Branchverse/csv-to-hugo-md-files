import fs from 'fs'
import csv from 'csv-parser'
const titles = []
const sourcePath = './csv-file'
const resultPath = './resulting-md-files'
const files = fs.readdirSync(sourcePath)


// Create the resultPath in case it doesn't exist
if (!fs.existsSync(resultPath)) {
    fs.mkdirSync(resultPath);
}

// Use the object from csv-parser to create a hugo readable md
function createMd(data) {

    // Warn that duplicate titles have been overwritten
    if (titles.includes(data.title_en))
        console.warn(`${data.title_en} is a duplicate title and has been overwritten!`)
    titles.push(data.title_en)

    // Parsing tags since they usually come in this format: "tag1, tag2, tag3"
    if (data.tags) {
        data.tags = data.tags.split(',')
            .map(tag => tag.trim().replace(/  +/g, ' '))
    }

    // Merging 
    if (data.object_weight && data.object_unit) {
        data.object_weight = data.object_weight.concat(' ', data.object_unit)
    }
    
    const resultDto = {
        title: data.title_en,
        tags: data.tags,
        object_weight: data.object_weight,
        source: data.source,
        image: data.image
    }

    // Write file
    fs.writeFileSync(`${resultPath}/${data.title_en}.md`, JSON.stringify(resultDto, null, 2))
}

// This is to ignore the .gitkeep and allow multiple .csv
files.forEach(file => {
    if (file.indexOf('.csv') !== -1) {
        fs.createReadStream(sourcePath + '/' + file)
            .pipe(csv())
            .on('data', data => createMd(data))
            .on('end', () => { console.log('DONE') })
    }
})



