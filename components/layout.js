import Header from "./header";
import Footer from "./footer";

function Layout(props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-6xl p-4 mx-auto mt-16">
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
