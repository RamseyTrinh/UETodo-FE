import Routers from './routers/Routers'
import ThemeToggleButton from '@/components/ThemeToggleButton';

function App() {
    return (
        <div style={{textAlign: 'center', width: '100vw'}}>
            <ThemeToggleButton />
            <Routers/>
        </div>
    )
}

export default App
