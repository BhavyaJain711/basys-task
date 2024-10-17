const Unauthorized = () => {
  return (
    <div className='text-center text-xl bg-light-container dark:bg-dark-container w-11/12 rounded mx-auto p-4'>
        <h1 className='text-light-heading dark:text-dark-heading text-3xl '>Unauthorized</h1>
        <p className='text-light-text dark:text-dark-text'>You are not authorized to view this page</p>
        <p className='text-light-text dark:text-dark-text'>
          If you are trying to Register, please Sign Out and then Register
        </p>
    </div>
  )
}

export default Unauthorized