import ToDoList from "./components/ToDoList/ToDoList.jsx";
import BackgroundGlow from './components/BackgroundGlow/BackgroundGlow';
import Starfield from './components/Starfield/Starfield';
import CornerBadge from './components/CornerBadge/CornerBadge.jsx';

function App() {
    
    return(<>
        <CornerBadge />
        <Starfield />
        <BackgroundGlow />
        <ToDoList />
    </>);
}

export default App
