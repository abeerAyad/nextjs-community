import GroupForm from '@/components/groupForm'
import styles from '@/styles/group/group.module.css'
import UserGroup from '@/components/userGroup'

const Groups = () => {
  return (
    <div className={styles.groupMainPage}>
      <GroupForm />

      <div>
        <UserGroup />
      </div>
    </div>
  )
}

export default Groups
