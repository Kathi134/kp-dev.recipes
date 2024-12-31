import './index.css'
import Header from './Header';
import MenuItem from "./nav/MenuItem";
import './menu.css'

export default function MainLayout({children}) {
    return (<>
        <Header/>

        <main>
            <div id="children-container">{children}</div>
        </main>

        <footer>
            <nav className='horizontal-container evenly'>
                <MenuItem destination="" displayName="Einkauf"/>
                <MenuItem destination="recipes" displayName="Rezepte"/>
                <MenuItem destination="data" displayName="Daten"/>
            </nav>
        </footer>
    </>);
}