
import { Readable } from "stream";
import * as readline from 'node:readline/promises';


export async function csvParser(file: Express.Multer.File): Promise<Record<string, string | number>[]> {
    if (!file.buffer) {
        throw new Error("Invalid file. Please make sure to provide a valid file.").name = "InvalidFileError";
    }
    const readableFile = new Readable();
    readableFile.push(file.buffer);
    readableFile.push(null);

    const lines = readline.createInterface({
        input: readableFile,

    })

    let result: Array<Record<string, string | number>> = []
    let keys: Array<string> = []

    for await (let line of lines) {
        let object: Record<string, string | number> = {}
        const array = line.split(",")

        if (keys.length === 0) {
            keys = array
        } else {
            for (let i = 0; i < array.length; i++) {
                object[keys[i]] = array[i]

            }
        }
        result.push(object)


    }
    result.shift()
    console.log(result)
    return result
}