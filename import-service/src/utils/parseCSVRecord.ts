import csv from 'csv-parser';

export const parseCSVRecord = (s3Object: any) => new Promise((resolve, reject) => {
    const s3Stream = s3Object.createReadStream();

    s3Stream
        .pipe(csv())
        .on('data', (data) => {
            console.log(JSON.stringify(data, null, 4));
        })
        .on('end', resolve)
        .on('error', reject);
});

