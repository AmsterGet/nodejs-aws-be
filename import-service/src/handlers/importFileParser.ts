import { S3Handler, S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { BUCKET, REGION, UPLOADED_FILES_DIR, PARSED_FILES_DIR } from '../constants';
import { parseCSVRecord } from '../utils';

export const importFileParser: S3Handler = async (
    event: S3Event,
): Promise<void> => {
    console.log('Lambda invocation with event: ', JSON.stringify(event, null, 4));

    try {
        const { Records } = event;
        const s3 = new S3({ region: REGION });

        for (const record of Records) {
            const { key: recordKey } = record.s3.object;
            console.log('Using bucket: ', BUCKET);
            const params = {
                Bucket: BUCKET,
                Key: recordKey,
            };

            console.log('Get record object from storage: ', recordKey);
            const s3Object = s3.getObject(params);

            console.log('Parse record data..');
            await parseCSVRecord(s3Object);
            console.log('Record data successfully parsed!');

            console.log('Start copying from: ', recordKey);
            const newRecordKey = recordKey.replace(UPLOADED_FILES_DIR, PARSED_FILES_DIR);
            await s3
                .copyObject({
                    Bucket: BUCKET,
                    Key: newRecordKey,
                    CopySource: `${BUCKET}/${recordKey}`,
                })
                .promise();
            console.log('Record successfully copied into: ', newRecordKey);

            console.log('Deleting old record version from: ', recordKey);
            await s3.deleteObject({ Bucket: BUCKET, Key: recordKey }).promise();
            console.log('Old record version successfully deleted!');
        }

        console.log('File processed successfully!');
    } catch (error) {
        console.error('Error: ', error);
    }

    return;
};
