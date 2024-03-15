const ColorDict: Record<string, string> = {
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    Reset: "\x1b[0m"
};

interface SimpleConfig {
    Color: "Red" | "Green" | "Yellow" | "Blue" | "Magenta" | "Cyan" | "White" | "Reset";
    Type: "SUCCESS" | "ERROR" | "INFO" | "WARN" | "COMMON";
}

const SpecialType: Record<string, string> = {
    "SUCCESS": "Green",
    "ERROR": "Red",
    "INFO": "Reset",
    "WARN": "Yellow",
};

const DefaultSimpleConfig: SimpleConfig = {
    Color: "Reset",
    Type: "COMMON"
}

function log(data: any, config?: SimpleConfig): void {
    const formattedConfig = {
        ...DefaultSimpleConfig,
        ...config
    }    

    const time = new Date();

    if (formattedConfig.Type && Object.keys(SpecialType).includes(formattedConfig.Type)) {
        const color = `${ColorDict[formattedConfig.Color] ?? ColorDict.Reset}`;
        const formattedType = `${formattedConfig.Type}            `.substring(0,7)
        console.log(`[ ${ color }${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${data}`);
    } else {
        console.log(`${data}`);
    }
}

const success = (data: any) => {
    const time = new Date();
    const formattedType = `SUCCESS            `.substring(0,7)
    console.log(`[ ${ColorDict.Green}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${data}`);
}

const error = (data: any) => {
    const time = new Date();
    const formattedType = `ERROR            `.substring(0,7)
    console.log(`[ ${ColorDict.Red}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${data}`);
}

const info = (data: any) => {
    const time = new Date();
    const formattedType = `INFO            `.substring(0,7)
    console.log(`[ ${ColorDict.Blue}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${data}`);
}

const warn = (data: any) => {
    const time = new Date();
    const formattedType = `WARN            `.substring(0,7)
    console.log(`[ ${ColorDict.Yellow}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${data}`);
}

const simpleLog = {
    success,
    log,
    error,
    info,
    warn
};

export default simpleLog;
