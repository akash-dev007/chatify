
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'


import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(

<BrowserRouter>
<AuthProvider>
<ChatProvider>

    <App />
</ChatProvider>

</AuthProvider>
<Toaster position='top-right'/>
</BrowserRouter>
  

 ,
)
