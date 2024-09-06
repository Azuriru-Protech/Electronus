import { CometChat } from '@cometchat/chat-sdk-javascript'

const cometChatInfo = window.electron.cometchatInfo()

const cometchatAppId = cometChatInfo.appId
const cometchatRegion = cometChatInfo.region
// const cometchatAuthKey = process.env.COMETCHAT_AUTH_KEY
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(cometchatRegion)
  .autoEstablishSocketConnection(true)
  .build()

export const cometchatInit = () => {
  CometChat.init(cometchatAppId, appSetting)
}
