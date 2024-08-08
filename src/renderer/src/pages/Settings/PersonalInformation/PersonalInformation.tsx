import styles from './PersonalInformation.module.scss'
import '@renderer/styles/settings.scss'

export default function PersonalInformation() {
  return (
    <div className={styles.personalInfomationWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardWrapper}>
          <p>Mr Meow Meow</p>
        </div>
      </div>

      <div className={styles.personalWrapper}>
        <div className={styles.rowWrapper}>
          <div>FFSAY ID</div>
          <div className="flex flex-row">
            <div> JX041914</div>
          </div>
        </div>

        <hr className="bg-black w-full" />

        <hr className="bg-black w-full" />

        <div className={styles.rowWrapper}>
          <div>Gender</div>
          <div className="flex flex-row"></div>
        </div>

        <hr className="bg-black w-full" />

        <div className={styles.rowWrapper}>
          <div>Personal Signature</div>
          <div className="flex flex-row"></div>
        </div>
      </div>
    </div>
  )
}
