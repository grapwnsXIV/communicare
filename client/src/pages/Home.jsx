function Home({ onStart, onOpenReadout }) {
    return (
        <section className="home">
            <h1>Welcome to Communicare</h1>
            <p> Helping patients communicate their health needs with ease.</p>

            <button
                type="button"
                className="primary-button"
                onClick={onStart}
                >
                    Report Symptoms
                </button>
        </section>
    );
}

export default Home;