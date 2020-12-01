import Header from "./header";
import Footer from "./footer";

function Layout(props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-4xl p-4 mx-auto md:px-8 md:py-16 mt-4">
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
