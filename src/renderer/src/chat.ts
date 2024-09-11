import { CometChat } from '@cometchat/chat-sdk-javascript'
import { UIKitSettingsBuilder } from '@cometchat/uikit-shared'
import { CometChatUIKit } from '@cometchat/chat-uikit-react'
import { CometChatCalls } from '@cometchat/calls-sdk-javascript'

const cometChatInfo = window.electron.cometchatInfo()

const cometchatAppId = cometChatInfo.appId
const cometchatRegion = cometChatInfo.region
const cometchatAuthKey = cometChatInfo.authKey

// const cometchatAuthKey = process.env.COMETCHAT_AUTH_KEY
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(cometchatRegion)
  .autoEstablishSocketConnection(true)
  .build()

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(cometchatAppId)
  .setRegion(cometchatRegion)
  .setAuthKey(cometchatAuthKey)
  .subscribePresenceForAllUsers()
  .build()

const callAppSetting = new CometChatCalls.CallAppSettingsBuilder()
  .setAppId(cometchatAppId)
  .setRegion(cometchatRegion)
  .build()

export const cometchatInit = () => {
  CometChat.init(cometchatAppId, appSetting)
  CometChatUIKit.init(UIKitSettings)
  CometChatCalls.init(callAppSetting)
}
