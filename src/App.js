import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Game from "./components/Game";

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`http://localhost:5000`, {transports: ['websocket']});
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className="App">
            {
                socket ?
                <Game socket={socket}/> : <p>Disconnect</p>
            }
        </div>
    );
}

export default App;
