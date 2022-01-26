import { LogMessageType } from "../../../../_enums/LogmessageType";

export interface ILogmessage{
    id: number
    timeStamp: Date
    messageType: LogMessageType
    message: string
    exception: string
}

