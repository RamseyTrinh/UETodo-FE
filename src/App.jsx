import Routers from './routers/Routers';
import ThemeToggleButton from '@/components/ThemeToggleButton';
function App() {
    return (
        <ThemeToggleButton>
            <div style={{ textAlign: 'center', width: '99vw' }}>
                <Routers />
            </div>
        </ThemeToggleButton>
    );
}

export default App;