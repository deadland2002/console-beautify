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
    Color?: "Red" | "Green" | "Yellow" | "Blue" | "Magenta" | "Cyan" | "White" | "Reset";
    Type?: "SUCCESS" | "ERROR" | "INFO" | "WARN" | "COMMON";
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

function log<T>(cb:CallableFunction , args ?: any[] , config?: SimpleConfig):T{
    const functionName = cb.name || "ANONYMOUS";

    const formattedConfig = {
        ...DefaultSimpleConfig,
        ...config
    }

    const time = new Date();

    if (formattedConfig.Type && Object.keys(SpecialType).includes(formattedConfig.Type)) {
        const color = SpecialType[formattedConfig.Type] || ColorDict.Reset;
        const formattedType = `${formattedConfig.Type}            `.substring(0,7)
        console.log(`[ ${ColorDict[color]}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${functionName}`);
    } else {
        console.log(`${functionName}`);
    }

    return cb(...args??[]);
}

const success = (cb:CallableFunction , args ?: any[]) => {
    const functionName = cb.name || "ANONYMOUS";

    const time = new Date();
    const formattedType = `SUCCESS            `.substring(0,7)
    console.log(`[ ${ColorDict.Green}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${functionName}`);

    return cb(...args??[])
}

const error = (cb:CallableFunction , args ?: any[]) => {
    const functionName = cb.name || "ANONYMOUS";

    const time = new Date();
    const formattedType = `ERROR            `.substring(0,7)
    console.log(`[ ${ColorDict.Red}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${functionName}`);

    return cb(...args??[])
}

const info = (cb:CallableFunction , args ?: any[]) => {
    const functionName = cb.name || "ANONYMOUS";

    const time = new Date();
    const formattedType = `INFO            `.substring(0,7)
    console.log(`[ ${ColorDict.Blue}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${functionName}`);

    return cb(...args??[])
}

const warn = (cb:CallableFunction , args ?: any[]) => {
    const functionName = cb.name || "ANONYMOUS";

    const time = new Date();
    const formattedType = `WARN            `.substring(0,7)
    console.log(`[ ${ColorDict.Yellow}${formattedType}${ColorDict.Reset} ] : ${time.toISOString()} : ${functionName}`);

    return cb(...args??[])
}

const functionLog = {
    success,
    log,
    error,
    info,
    warn
};

export default functionLog;
