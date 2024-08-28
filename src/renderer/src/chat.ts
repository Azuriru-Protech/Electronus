import { CometChat } from '@cometchat/chat-sdk-javascript'

const cometchatAppId = process.env.COMETCHAT_APP_ID
const cometchatRegion = process.env.COMETCHAT_REGION
// const cometchatAuthKey = process.env.COMETCHAT_AUTH_KEY
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(cometchatRegion)
  .autoEstablishSocketConnection(true)
  .build()

export const cometchatInit = () => {
  CometChat.init(cometchatAppId, appSetting)
}
