
import { Readable } from "stream";
import * as readline from 'node:readline/promises';
import fs from "fs";
import HttpException from "./exceptions/HttpExceptions";


export async function csvParser(data: Express.Multer.File): Promise<Record<string, string | number>[]> {


    let buffer: Buffer = data.buffer

    try {





      
        const readableFile = new Readable();
        readableFile.push(buffer);
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

        return result
    } catch (error) {
        if (error instanceof Error) {
            throw new HttpException(error.message, "Error reading csv");
        }
        throw new HttpException(JSON.stringify(error), "Error reading csv");

    }
}