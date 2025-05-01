interface initialConfigType { 
    enabled ?: boolean,
    enabledSelected ?: {
        ERROR ?: boolean,
        WARN ?: boolean,
        SUCCESS ?: boolean,
        INFO ?: boolean,
        LOG ?: boolean,
    }
}

const INITIAL_CONFIG : initialConfigType = {
    enabled : true,
    enabledSelected : {}
}

let configState = structuredClone(INITIAL_CONFIG)

export const getConfig = () =>{
    return configState
}

export const setConfig = (newConfig : initialConfigType) =>{
    configState = {
        ...configState,
        ...newConfig
    }

    return configState
}