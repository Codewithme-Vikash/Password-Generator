import { useState } from 'react'
import './App.css'
import passwordGenerator from '../PassGen Logic'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'

function App() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(10)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)

    const [isCopy, setIsCopy] = useState(false)

    function submitHandler(event) {
        event.preventDefault()
        if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
            toast.error("please check at least a checkbox!")
        } else {
            setPassword(passwordGenerator(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols))
            toast.success("Password is generated!")
            setIsCopy(false)
        }
    }

    async function handleCopyPassword() {

        try {
            const clipboardValue = await navigator.clipboard.readText()

            if (password === "") {
                toast.error("There is no Password to be copied!")
            } else if (clipboardValue === password) {
                toast.warn("Already copied");
            } else {
                navigator.clipboard.writeText(password).then(() => {
                    toast.success("Password is successfully copied.")
                    setIsCopy(prev => !prev)
                }).catch((e) => {
                    toast.error("Couldn't copy the password!")
                })
            }
        } catch (error) {
            toast.error("Allow to see text and images on your clipboard!")
        }
    }

    return (
        <div className='password-generator'>
            <div className='container'>
                <h2>Password Generator</h2>
                {/* <div> */}
                <div className='password-container'>
                    <input className='password-container'
                        value={password}
                        readOnly={true}
                    />
                    <button className="copy__btn" onClick={handleCopyPassword}>
                        {isCopy ? <BsClipboardCheck /> : <BsClipboard />}
                    </button>
                </div>
                {/* </div> */}

                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor='length'>Password length</label>
                        <input type='number' id='length' defaultValue={10} onChange={(e) => setLength(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='uppercase'>add lowercase letters</label>
                        <input type='checkbox' id='uppercase' name='uppercase' defaultChecked={true} onChange={(e) => setIncludeLowercase(e.target.checked)} />
                    </div>
                    <div>
                        <label htmlFor='lowercase'>Add uppercase letters</label>
                        <input type='checkbox' id='lowercase' name='lowercase' defaultChecked={true} onChange={(e) => setIncludeUppercase(e.target.checked)} />
                    </div>
                    <div>
                        <label htmlFor='numbers'>include numbers</label>
                        <input type='checkbox' id='numbers' name='numbers' onChange={(e) => setIncludeNumbers(e.target.checked)} />
                    </div>
                    <div>
                        <label htmlFor='symbol'>include symbols</label>
                        <input type='checkbox' id='symbol' name='symbol' onChange={(e) => setIncludeSymbols(e.target.checked)} />
                    </div>

                    <div>
                        <button type='submit' className='btn'>Generate</button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default App
