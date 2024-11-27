import { useAppStore } from "@/store"

const Profile = () => {
const {userInfo} = useAppStore(); 
console.log(userInfo)
  return (
    <div>
Profile 
<div>
email: {userInfo?.email}

</div>

    </div>
  )
}

export default Profile