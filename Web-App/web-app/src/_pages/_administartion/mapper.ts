import { LogMessageType } from "../../_enums/LogmessageType";
import { ILogmessage } from "./_logging/interfaces/ILogmessage";
import { ILogmessageRow } from "./_logging/interfaces/ILogMessageRow";

export const getLogMessageRow = (message: ILogmessage): ILogmessageRow =>{
    return{
        id: message.id,
        timeStamp: message.timeStamp,
        messageType: LogMessageType[message.messageType],
        message: message.message,
        exception: message.exception
    }
}