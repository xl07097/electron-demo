import {useState} from 'react'
import { Button } from "antd"
import Edit from "./Edit"

function Index(){

  const [openType, setOperType] = useState('')

  const edit = () => {
    setOperType('edit')
  }

  const onClose = () => {
    setOperType('')
  }

  return (
    <div>
      <Button onClick={edit}>消息发送</Button>

      <Edit onClose={onClose} open={openType==='edit'} />
      

  </div>
  )
}

export default Index