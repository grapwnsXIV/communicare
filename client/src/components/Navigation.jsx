function Navigation({ onHome, onClinicianPortal }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                Communicare
            </div>

            <div className="navbar-links">
                <button
                type="button"
                onClick={onHome}
                className="nav-link"
                >
                    Home
                </button>
            </div>

        <div className="navbar-links">
                <button
                type="button"
                onClick={onClinicianPortal}
                className="nav-link"
                >
                    Clinician Login
                </button>
            </div>
        </nav>
    );
}

export default Navigation;