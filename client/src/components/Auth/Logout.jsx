import { useNavigate } from "react-router-dom";
import { setLogout } from '../../state'
import {store} from "../../store";
import {Button} from "flowbite-react"
const Logout = () => {
    const navigate= useNavigate();
    const handleLogout = () => {
        store.dispatch(setLogout());
        navigate('/');
    }
    const handleCancel = () => {
        navigate(-1);
    }
  return (<>
        <h1 className="text-center mt-4 text-3xl text-light-heading dark:text-dark-heading">Logout</h1>
        <div className='w-full text-center flex flex-col h-full justify-center my-auto place-items-center'>
            
            <h3 className="text-xl">Do you really want to Logout?</h3>
            <div className="flex  justify-center [&>*]:m-4">
                <Button color="danger" onClick={handleLogout} className='bg-red-500 '>Logout</Button>
                <Button color="success" onClick={handleCancel} className='bg-green-500'>Cancel</Button>
            </div>
        </div>
</>
  )
}

export default Logout