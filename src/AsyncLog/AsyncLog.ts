const fs = require('fs').promises;
const pathModule = require('path');

const SpecialType: Record<string, string> = {
    "SUCCESS": "Green",
    "ERROR": "Red",
    "INFO": "Reset",
    "WARN": "Yellow",
};

let userProvidedPath: string | undefined = undefined;

const GetFormattedStr = (data: any, {type="DEFAULT",delimiter=":"}:{type?: string,delimiter?:string}) => {
    type = `${type}         `.substring(0, 10);

    const time = new Date();
    const formattedTime = time.toISOString()

    return `[ ${type} ] ${delimiter} ${formattedTime} ${delimiter} ${data}`;
}

const GetUserPath = () => userProvidedPath;

function Config(path: string) {
    userProvidedPath = path;
}

async function WriteToFile(data: any, {path, type,delimiter}:{path?:string,type?:"SUCCESS"| "ERROR"| "INFO"| "WARN" ,delimiter?:string}) {
    let filename;

    if (!path) {
        path = GetUserPath();
        if (!path) {
            const time = new Date();
            path = `Output/AsyncLog/`
            filename = `${time.toISOString().split("T")[0].replace(/-/g, "_")}.log`;
        }
    }

    try {
        try{
            const data = await fs.readFile(filename ? path+filename : path);
        }catch (e){
            if(filename){
                try{
                    await fs.mkdir(path,{recursive:true});
                }catch (e){
                }
            }
        }
        const formattedStr = GetFormattedStr(data, {type,delimiter});
        await fs.appendFile(filename ? path+filename : path, formattedStr + '\n', 'utf-8');

    } catch (error) {
        console.error('Error writing to the file:', error);
        throw error;
    }
}


async function log(data: any, { path, type,delimiter }: { path?: string; type?: "SUCCESS" | "ERROR" | "INFO" | "WARN",delimiter?:string } = {}) {
    await WriteToFile(data, { path, type ,delimiter});
}



async function success(data: any,{path,delimiter}:{path ?: string,delimiter?:string}={}){
    await WriteToFile(data, {type:"SUCCESS",path,delimiter})
}
async function warn(data: any,{path,delimiter}:{path ?: string,delimiter?:string}={}){
    await WriteToFile(data, {type:"WARN",path,delimiter})
}
async function info(data: any,{path,delimiter}:{path ?: string,delimiter?:string}={}){
    await WriteToFile(data, {type:"INFO",path,delimiter})
}
async function error(data: any,{path,delimiter}:{path ?: string,delimiter?:string}={}){
    await WriteToFile(data, {type:"ERROR",path,delimiter})
}

const AsyncLog = {
    Config,
    log,
    success,
    warn,
    info,
    error
}

export default AsyncLog;
