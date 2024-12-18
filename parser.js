const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const path = require('path');

// Array of quiz files
const arrayOfQuizzes =
    [   
        "1through113.csv",
        
        // 'Quiz 115.csv',
        // 'Quiz 116.csv',
        // 'Quiz 117.csv',
        // 'Quiz 118.csv',
        // 'Quiz 119.csv',
        // 'Quiz 120.csv',
        // 'Quiz 121.csv',
        // 'Quiz 122.csv',
        // 'Quiz 123.csv',
        // 'Quiz 124.csv',
        // 'Quiz 125.csv',
        // 'Quiz 126.csv',
        // 'Quiz 127.csv',
        // 'Quiz 128.csv',
        // 'Quiz 129.csv',
        // 'Quiz 130.csv',
        // 'Quiz 131.csv',
        // 'Quiz 132.csv',
        // 'Quiz 133.csv',
        // 'Quiz 134.csv',
        // 'Quiz 135.csv',
        // 'Quiz 136.csv',
        // 'Quiz 137.csv',
        // 'Quiz 138.csv',
        // 'Quiz 139.csv',
        // 'Quiz 140.csv',
        // 'Quiz 141.csv',
        // 'Quiz 142.csv',
        // 'Quiz 143.csv',
        // 'Quiz 144.csv',
        // 'Quiz 145.csv',
        // 'Quiz 146.csv',
        // 'Quiz 147.csv',
        // 'Quiz 148.csv',
        // 'Quiz 149.csv',
        // 'Quiz 150.csv',
        // 'Quiz 151.csv',
        // 'Quiz 152.csv',
        // 'Quiz 153.csv',
        // 'Quiz 154.csv',
        // 'Quiz 155.csv',
        // 'Quiz 156.csv',
        // 'Quiz 157.csv',
        // 'Quiz 158.csv',
        // 'Quiz 159.csv',
        // 'Quiz 160.csv',
        // 'Quiz 161.csv',
        // 'Quiz 162 ND Terri.csv',
        // 'Quiz 163.csv',
        // 'Quiz 164.csv',
        // 'Quiz 165.csv',
        // 'Quiz 166.csv',
        // 'Quiz 167.csv',
        // 'Quiz 168.csv',
        // 'Quiz 169.csv',
        // 'Quiz 170.csv',
        // 'Quiz 171.csv',
        // 'Quiz 172.csv',
        // 'Quiz 173.csv',
        // 'Quiz 174.csv',
        // 'Quiz 175.csv',
        // 'Quiz 176.csv',
        // 'Quiz 177.csv',
        // 'Quiz 178.csv',
        // 'Quiz 179.csv',
        // 'Quiz 180.csv',
        // 'Quiz 181.csv',
        // 'Quiz 182.csv',
        // 'Quiz 183.csv',
        // 'Quiz 184.csv',
        // 'Quiz 185.csv',
       
        // 'Quiz 187.csv',
        // 'Quiz 188.csv',
        // 'Quiz 189.csv',
        // 'Quiz 190.csv',
        // 'Quiz 191.csv',
        // 'Quiz 192.csv',
        // 'Quiz 193.csv',
        // 'Quiz 194.csv',
        // 'Quiz 195.csv',
        // 'Quiz 196.csv',
        // 'Quiz 197.csv',
        // 'Quiz 198.csv',
        // 'Quiz 199.csv',
        // 'Quiz 200.csv',
        // 'Quiz 201.csv',
        // 'Quiz 202.csv',
        // 'Quiz 203.csv',
        // 'Quiz 204.csv',
        // 'Quiz 205.csv',
        // 'Quiz 206.csv',
    ] 

function parseCSV(fileName) {
    return new Promise((resolve, reject) => {
        const fileResults = [];
        const filePath = path.resolve(__dirname, `../braintrust-institute/quizzes/${fileName}`);  // Resolve the absolute path

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => fileResults.push(data))
            .on('end', () => resolve(fileResults))
            .on('error', (err) => reject(err));
    });
}

async function processQuizzes() {
    try {
        for (let i = 0; i < arrayOfQuizzes.length; i++) {
            console.log(`Processing: ${arrayOfQuizzes[i]}`);
            const fileResults = await parseCSV(arrayOfQuizzes[i]);
            results.push(...fileResults);  // Merge results from this file into the main array
        }

        console.log("All files processed. Saving results...");

        // Save the combined results to a new file
        const outputPath = path.resolve(__dirname, 'combinedResults.json');
        fs.writeFile(outputPath, JSON.stringify(results, null, 2), (err) => {
            if (err) {
                console.error("Error saving results:", err);
            } else {
                console.log(`Results saved to ${outputPath}`);
            }
        });
    } catch (error) {
        console.error("Error processing quizzes:", error);
    }
}

processQuizzes();
