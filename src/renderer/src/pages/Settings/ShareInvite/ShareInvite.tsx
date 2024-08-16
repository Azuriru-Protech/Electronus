import './ShareInvite.scss'
import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import InvitationQr from '@renderer/components/widgets/InvitationQr/InvitationQr'
export default function ShareInvite() {
  return (
    <>
      <SettingsTopbar>Share Invite</SettingsTopbar>
      <InvitationQr />
    </>
  )
}
