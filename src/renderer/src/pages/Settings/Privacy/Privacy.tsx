import SettingsTopbar from '@renderer/components/layouts/SettingsTopbar/SettingsTopbar'
import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { t } = useTranslation()
  return (
    <>
      <SettingsTopbar>{t('privacy')}</SettingsTopbar>
    </>
  )
}
