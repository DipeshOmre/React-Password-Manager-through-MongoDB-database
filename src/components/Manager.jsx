import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const [form, setform] = useState({
        site: "",
        username: "",
        password: ""
    })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

    }, [])

    const ref = useRef();
    const passwordref = useRef();
    const showPassword = () => {
        passwordref.current.type = "text";
        if (ref.current.src.includes("public/icons/eye.png")) {
            passwordref.current.type = "password";
            ref.current.src = "public/icons/eyecross.png";
        }
        else {
            passwordref.current.type = "text";
            ref.current.src = "public/icons/eye.png";
        }
    }
    const savePassword = () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            toast('Password saved ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    }
    else{
        alert("Greater than 3 characters are allowed for each field");
    }
    setform({
        site: "",
        username: "",
        password: "",
    })
    }
    const deletePassword = (id) => {


        let c = confirm("Are you sure you want to delete this password?");
        if (c) {
            toast('Password Deleted', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setPasswordArray(passwordArray.filter((item) => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
        }

    }
    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
        setform({
            site: passwordToEdit.site,
            username: passwordToEdit.username,
            password: passwordToEdit.password
        })
        console.log("editing password with id:", id);
    }
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast('copied successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }).catch(err => {
            toast('failed to copy', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        });
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="relative min-h-screen w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-slate-400 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
                </div>
                <div className="md:mycontainer p-3 md:px-0 min-h-[85vh]">
                    <h1 className='text-4xl font-bold text-center'><span className='text-green-700'>
                        &lt;
                    </span>
                        Pass
                        <span className='text-green-700'>
                            OP/&gt;
                        </span></h1>
                    <p className='text-green-900 text-lg text-center'>Your name password manager</p>
                    <div className=' flex flex-col p-4 gap-8 items-center justify-center'>
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-black-500 w-full text-black p-4 py-1' type="text" name='site' id='site' />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                            <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-black-500 w-full text-black p-4 py-1' type="text" name='username' id='username' />
                            <div className="relative">

                                <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-black-500 w-full text-black p-4 py-1' type="text" name='password' id='password' />
                                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='p-1' width={26} src="public\icons\eye.png" alt="eye" />
                                </span>
                            </div>
                        </div>
                        <button onClick={savePassword} className='flex items-center justify-center bg-green-500 px-8 py-2
                        rounded-full w-fit text-center hover:bg-green-400 gap-2 border border-green-800'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                            >
                            </lord-icon>
                            Save Password</button>
                    </div>
                    <div className="passwords">
                        <h2 className='py-4 font-bold text-2xl text-center'>Your Passwords</h2>
                        {passwordArray.length == 0 &&
                            <div className='text-center text-gray-800'>No passwords to show</div>
                        }
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full rounded-md  overflow-hidden mb-8">
                                <thead className='bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200'>
                                    {passwordArray.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className="flex items-center justify-center">


                                                        <a href={item.site} target='_blank'>{item.site}</a>
                                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"

                                                            ></lord-icon>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className="flex items-center justify-center">


                                                        <span>
                                                            {item.username}

                                                        </span>
                                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"

                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center '>
                                                    <div className="flex items-center justify-center">


                                                        <span>
                                                            {item.password}

                                                        </span>
                                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"

                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center '>


                                                    <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)} >

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
